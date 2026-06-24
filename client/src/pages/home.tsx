import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  differenceInCalendarDays,
  isBefore,
  parseISO,
  startOfDay,
} from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import type { LastConversion } from "@/components/dashboard/converter-types";
import type { TripWithDetails } from "@shared/schema";
import {
  CalendarDays,
  Plane,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";
import FloatLogo from "@/components/FloatLogo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DashboardNotifications,
  type DashboardNotificationMemberProfile,
  type DashboardNotificationMemberLookup,
  type DashboardNotificationTripLookup,
} from "@/components/dashboard/dashboard-notifications";
import {
  selectNextTrip,
  selectUpcomingTrips,
  isTripInactive,
  calculateTripPlanningProgress,
  countOpenDecisions,
  type TripWithPlanningData,
} from "@/lib/dashboardSelectors";
import {
  buildCoverPhotoAltText,
  buildCoverPhotoSrcSet,
  getCoverPhotoObjectPosition,
  resolveCoverPhotoUrl,
  useCoverPhotoImage,
} from "@/lib/tripCover";
import { parseTripDateToLocal } from "@/lib/date";

import CurrencyConverterTool from "@/components/dashboard/currency-converter-tool";

const HowItWorksPanel = lazy(() =>
  import("@/components/dashboard/how-it-works-panel"),
);

const LAST_CONVERSION_KEY = "dashboard.converter.last";
const HOW_IT_WORKS_DISMISSED_KEY = "dismissedHowItWorks";


function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);
    setMatches(mediaQuery.matches);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function toDateString(value: TripWithDetails["startDate"]): string {
  return typeof value === "string" ? value : value.toISOString();
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = parseTripDateToLocal(startDate);
  const end = parseTripDateToLocal(endDate);

  const singleDateFormatter = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (start && end) {
    const sameYear = start.getFullYear() === end.getFullYear();
    const sameMonth = sameYear && start.getMonth() === end.getMonth();

    const startFormatter = new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
    });

    const endFormatter = new Intl.DateTimeFormat(undefined, {
      month: sameMonth ? undefined : "short",
      day: "numeric",
      year: sameYear ? undefined : "numeric",
    });

    const yearFormatter = new Intl.DateTimeFormat(undefined, { year: "numeric" });

    const startPart = startFormatter.format(start);
    const endPart = endFormatter.format(end);

    if (sameYear) {
      return `${startPart}–${endPart}, ${yearFormatter.format(start)}`;
    }

    const startYear = yearFormatter.format(start);
    const endYear = yearFormatter.format(end);
    return `${startPart}, ${startYear} – ${endPart}${endPart.includes(endYear) ? "" : `, ${endYear}`}`;
  }

  if (start) {
    return singleDateFormatter.format(start);
  }

  if (end) {
    return singleDateFormatter.format(end);
  }

  return "Dates TBD";
}


function buildTripAriaLabel(
  name: string | null | undefined,
  destination: string | null | undefined,
  startDate: string,
  endDate: string,
): string {
  const tripTitle = name?.trim() ? name : destination?.trim() ? destination : "Trip";
  return `Open trip: ${tripTitle} — ${formatDateRange(startDate, endDate)}`;
}

function getTravelersLabel(count: number): string {
  return count === 1 ? "1 traveler" : `${count} travelers`;
}

function buildTravelerData(
  members: TripWithDetails["members"],
): { avatar?: string | null; initial: string }[] {
  if (!members || members.length === 0) {
    return [];
  }
  return members.map((member) => {
    const firstName = member.user.firstName?.trim();
    const email = member.user.email;
    const initial =
      firstName && firstName.length > 0
        ? firstName[0]!.toUpperCase()
        : email && email.length > 0
          ? email[0]!.toUpperCase()
          : "T";

    return {
      avatar: member.user.profileImageUrl,
      initial,
    };
  });
}

function getMemberDisplayName(
  user: TripWithDetails["members"][number]["user"],
): string {
  const first = user.firstName?.trim();
  const last = user.lastName?.trim();

  if (first && last) {
    return `${first} ${last}`;
  }

  if (first) {
    return first;
  }

  if (user.username?.trim()) {
    return user.username.trim();
  }

  return user.email ?? "Traveler";
}

function getMemberInitial(
  user: TripWithDetails["members"][number]["user"],
): string {
  const displayName = getMemberDisplayName(user);
  if (displayName && displayName.length > 0) {
    return displayName[0]!.toUpperCase();
  }
  const email = user.email ?? "";
  if (email.length > 0) {
    return email[0]!.toUpperCase();
  }
  return "T";
}

function loadLastConversion(): LastConversion | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(LAST_CONVERSION_KEY);
    if (!stored) {
      return null;
    }
    const parsed = JSON.parse(stored);
    if (!parsed) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn("Failed to parse last conversion", error);
    return null;
  }
}

function storeLastConversion(conversion: LastConversion) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(LAST_CONVERSION_KEY, JSON.stringify(conversion));
  } catch (error) {
    console.warn("Failed to store conversion", error);
  }
}

type TripSummary = {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  travelers: { avatar?: string | null; initial: string }[];
  progressPercent: number;
  coverImageUrl?: string | null;
  coverPhotoUrl?: string | null;
  coverPhotoCardUrl?: string | null;
  coverPhotoThumbUrl?: string | null;
  coverPhotoOriginalUrl?: string | null;
  coverPhotoFocalX?: number | null;
  coverPhotoFocalY?: number | null;
  coverPhotoAlt?: string | null;
};


export default function Home() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [lastConversion, setLastConversion] = useState<LastConversion | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const converterDialogId = useId();
  const howItWorksTitleId = useId();
  const howItWorksDescriptionId = useId();
  const converterButtonRef = useRef<HTMLElement | null>(null);
  const howItWorksButtonRef = useRef<HTMLElement | null>(null);
  const howItWorksCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const converterCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const shouldRestoreHowItWorksFocus = useRef(true);
  const quickActionsButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [howItWorksLoaded, setHowItWorksLoaded] = useState(false);
  const handleConverterVisibilityChange = useCallback(
    (open: boolean) => {
      setIsConverterOpen(open);
      if (!open) {
        converterButtonRef.current?.focus();
      }
    },
    [converterButtonRef, setIsConverterOpen],
  );
  const handleOpenProfile = useCallback(() => {
    setLocation("/profile");
  }, [setLocation]);

  const handleHowItWorksButtonClick = useCallback(
    (trigger?: HTMLElement | null) => {
      if (trigger) {
        howItWorksButtonRef.current = trigger;
      }
      setHowItWorksLoaded(true);
      setIsHowItWorksOpen(true);
    },
    [],
  );

  const focusElement = useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }
    if (typeof window === "undefined") {
      element.focus();
      return;
    }
    window.requestAnimationFrame(() => {
      element.focus();
    });
  }, []);

  const handleHowItWorksOpenAutoFocus = useCallback(
    (event: Event) => {
      event.preventDefault();
      focusElement(howItWorksCloseButtonRef.current);
    },
    [focusElement],
  );

  const handleDialogCloseAutoFocus = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  const handleConverterOpenAutoFocus = useCallback(
    (event: Event) => {
      event.preventDefault();
      focusElement(converterCloseButtonRef.current);
    },
    [focusElement],
  );

  const handleConverterOpen = useCallback(
    (trigger?: HTMLElement | null) => {
      if (trigger) {
        converterButtonRef.current = trigger;
      }
      handleConverterVisibilityChange(true);
    },
    [handleConverterVisibilityChange],
  );

  const handleHowItWorksOpenChange = useCallback(
    (open: boolean) => {
      setIsHowItWorksOpen(open);
      if (open) {
        setHowItWorksLoaded(true);
      } else {
        if (shouldRestoreHowItWorksFocus.current) {
          howItWorksButtonRef.current?.focus();
        }
        shouldRestoreHowItWorksFocus.current = true;
      }
    },
    [],
  );

  const closeHowItWorksWithoutFocus = useCallback(() => {
    shouldRestoreHowItWorksFocus.current = false;
    setIsHowItWorksOpen(false);
  }, []);

  const handleDismissHowItWorks = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(HOW_IT_WORKS_DISMISSED_KEY, "true");
      } catch (error) {
        console.error("Failed to persist how it works dismissal", error);
      }
    }
    shouldRestoreHowItWorksFocus.current = true;
    setIsHowItWorksOpen(false);
  }, []);

  useEffect(() => {
    setLastConversion(loadLastConversion());
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsQuickActionsOpen(false);
      return;
    }

    if (quickActionsButtonRef.current) {
      howItWorksButtonRef.current = quickActionsButtonRef.current;
      converterButtonRef.current = quickActionsButtonRef.current;
    }
  }, [isDesktop]);

  const {
    data: trips,
    isLoading,
    error,
    refetch,
  } = useQuery<TripWithPlanningData[]>({
    queryKey: ["/api/trips"],
    enabled: Boolean(user),
    retry: false,
  });

  const today = startOfDay(new Date());

  const sortedTrips = useMemo(() => {
    const allTrips = trips ?? [];
    return [...allTrips].sort(
      (a, b) =>
        parseISO(toDateString(a.startDate)).getTime() -
        parseISO(toDateString(b.startDate)).getTime(),
    );
  }, [trips]);

  const upcomingTripsForDisplay = useMemo(
    () =>
      sortedTrips.filter(
        (trip) => !isBefore(parseISO(toDateString(trip.endDate)), today),
      ),
    [sortedTrips, today],
  );

  const primaryTrip = upcomingTripsForDisplay[0] ?? null;

  const upcomingTripsForStats = useMemo(
    () => selectUpcomingTrips(sortedTrips, today),
    [sortedTrips, today],
  );

  const nextTrip = useMemo(
    () => selectNextTrip(sortedTrips, today),
    [sortedTrips, today],
  );

  const { data: nextTripFlights } = useQuery<Array<{ status?: string | null }>>({
    queryKey: ["/api/trips", nextTrip?.id, "flights"],
    queryFn: async () => {
      if (!nextTrip?.id) return [];
      const res = await fetch(`/api/trips/${nextTrip.id}/flights`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: Boolean(nextTrip?.id),
  });

  const { data: nextTripHotels } = useQuery<Array<{ status?: string | null }>>({
    queryKey: ["/api/trips", nextTrip?.id, "hotels"],
    queryFn: async () => {
      if (!nextTrip?.id) return [];
      const res = await fetch(`/api/trips/${nextTrip.id}/hotels`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: Boolean(nextTrip?.id),
  });

  const { data: nextTripActivities } = useQuery<Array<{ status?: string | null }>>({
    queryKey: ["/api/trips", nextTrip?.id, "activities"],
    queryFn: async () => {
      if (!nextTrip?.id) return [];
      const res = await fetch(`/api/trips/${nextTrip.id}/activities`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: Boolean(nextTrip?.id),
  });

  const { data: nextTripPackingItems } = useQuery<Array<unknown>>({
    queryKey: ["/api/trips", nextTrip?.id, "packing"],
    queryFn: async () => {
      if (!nextTrip?.id) return [];
      const res = await fetch(`/api/trips/${nextTrip.id}/packing`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: Boolean(nextTrip?.id),
  });

  const nextTripWithPlanningData = useMemo(() => {
    if (!nextTrip) return null;
    return {
      ...nextTrip,
      flights: nextTripFlights ?? [],
      hotels: nextTripHotels ?? [],
      activities: nextTripActivities ?? [],
      packingItems: nextTripPackingItems ?? [],
    };
  }, [nextTrip, nextTripFlights, nextTripHotels, nextTripActivities, nextTripPackingItems]);

  const actionableTrip = useMemo(
    () =>
      primaryTrip ??
      nextTrip ??
      upcomingTripsForStats[0] ??
      sortedTrips.find((trip) => !isTripInactive(trip)) ??
      null,
    [primaryTrip, nextTrip, upcomingTripsForStats, sortedTrips],
  );

  const daysToNextTrip = useMemo(() => {
    if (!nextTrip) {
      return null;
    }
    const startDate = startOfDay(parseISO(toDateString(nextTrip.startDate)));
    return Math.max(0, differenceInCalendarDays(startDate, today));
  }, [nextTrip, today]);

  const upcomingSummaries: TripSummary[] = useMemo(() => {
    return upcomingTripsForDisplay.map((trip) => ({
      id: trip.id,
      name: trip.name || trip.destination,
      destination: trip.destination,
      startDate: toDateString(trip.startDate),
      endDate: toDateString(trip.endDate),
      travelersCount: trip.memberCount,
      travelers: buildTravelerData(trip.members),
      progressPercent: calculateTripPlanningProgress(trip).percentage,
      coverImageUrl:
        trip.coverPhotoUrl ??
        trip.coverPhotoOriginalUrl ??
        trip.coverImageUrl ??
        null,
      coverPhotoUrl: trip.coverPhotoUrl ?? null,
      coverPhotoCardUrl:
        trip.coverPhotoCardUrl ??
        trip.coverPhotoUrl ??
        trip.coverPhotoOriginalUrl ??
        trip.coverImageUrl ??
        null,
      coverPhotoThumbUrl:
        trip.coverPhotoThumbUrl ??
        trip.coverPhotoCardUrl ??
        trip.coverPhotoUrl ??
        trip.coverPhotoOriginalUrl ??
        trip.coverImageUrl ??
        null,
      coverPhotoOriginalUrl:
        trip.coverPhotoOriginalUrl ??
        trip.coverPhotoUrl ??
        trip.coverImageUrl ??
        null,
      coverPhotoFocalX: trip.coverPhotoFocalX ?? null,
      coverPhotoFocalY: trip.coverPhotoFocalY ?? null,
      coverPhotoAlt: trip.coverPhotoAlt ?? undefined,
    }));
  }, [upcomingTripsForDisplay]);

  const memberLookup = useMemo<DashboardNotificationMemberLookup>(() => {
    const byId: DashboardNotificationMemberLookup["byId"] = {};
    const byName: DashboardNotificationMemberLookup["byName"] = {};

    for (const trip of sortedTrips) {
      for (const member of trip.members) {
        if (!member.user) {
          continue;
        }

        const profile = {
          name: getMemberDisplayName(member.user),
          avatar: member.user.profileImageUrl ?? null,
          initial: getMemberInitial(member.user),
        } satisfies DashboardNotificationMemberProfile;

        const existingById = byId[member.userId];
        if (!existingById || (!existingById.avatar && profile.avatar)) {
          byId[member.userId] = profile;
        }

        const addNameVariant = (value: string | null | undefined) => {
          if (!value) {
            return;
          }
          const normalized = value.trim().toLowerCase();
          if (!normalized) {
            return;
          }
          const existing = byName[normalized];
          if (!existing || (!existing.avatar && profile.avatar)) {
            byName[normalized] = profile;
          }
        };

        addNameVariant(profile.name);
        addNameVariant(profile.name.replace(/[^a-z0-9 ]/gi, ""));

        const firstSegment = profile.name.split(/\s+/)[0] ?? null;
        addNameVariant(firstSegment);

        addNameVariant(member.user.email?.toLowerCase() ?? null);
        addNameVariant(member.user.username ?? null);
      }
    }

    return { byId, byName } satisfies DashboardNotificationMemberLookup;
  }, [sortedTrips]);

  const tripLookup = useMemo<DashboardNotificationTripLookup>(() => {
    const lookup: DashboardNotificationTripLookup = {};

    for (const trip of sortedTrips) {
      const displayName = trip.name?.trim() || trip.destination || "Trip";
      lookup[trip.id] = {
        name: displayName,
        destination: trip.destination ?? null,
      };
    }

    return lookup;
  }, [sortedTrips]);

  const statsLoading = isLoading && !trips;
  const isError = Boolean(error);

  const handlePlanTrip = useCallback(() => {
    setLocation("/trips/new");
  }, [setLocation]);

  const handleInviteMore = useCallback(() => {
    if (nextTrip) {
      setLocation(`/trip/${nextTrip.id}/members`);
      return;
    }

    const fallbackTrip = upcomingTripsForStats[0];
    if (fallbackTrip) {
      setLocation(`/trip/${fallbackTrip.id}/members`);
      return;
    }

    setLocation("/trips/new");
  }, [nextTrip, upcomingTripsForStats, setLocation]);

  const navigateToTripView = useCallback(
    (view: string) => {
      if (actionableTrip) {
        setLocation(`/trip/${actionableTrip.id}?view=${view}`);
      } else {
        setLocation("/trips/new");
      }
    },
    [actionableTrip, setLocation],
  );

  const handleHowItWorksCreateTrip = useCallback(() => {
    closeHowItWorksWithoutFocus();
    handlePlanTrip();
  }, [closeHowItWorksWithoutFocus, handlePlanTrip]);

  const handleHowItWorksInviteMembers = useCallback(() => {
    closeHowItWorksWithoutFocus();
    handleInviteMore();
  }, [closeHowItWorksWithoutFocus, handleInviteMore]);

  const handleHowItWorksAddActivity = useCallback(() => {
    closeHowItWorksWithoutFocus();
    if (actionableTrip) {
      setLocation(`/trip/${actionableTrip.id}?view=activities`);
    } else {
      setLocation("/trips/new");
    }
  }, [actionableTrip, closeHowItWorksWithoutFocus, setLocation]);

  const handleHowItWorksBrowseDiscovery = useCallback(() => {
    closeHowItWorksWithoutFocus();
    if (actionableTrip) {
      setLocation(`/trip/${actionableTrip.id}?view=activities`);
    } else {
      setLocation("/activities");
    }
  }, [actionableTrip, closeHowItWorksWithoutFocus, setLocation]);

  const handleHowItWorksOpenExpenses = useCallback(() => {
    closeHowItWorksWithoutFocus();
    navigateToTripView("expenses");
  }, [closeHowItWorksWithoutFocus, navigateToTripView]);

  const handleHowItWorksOpenPacking = useCallback(() => {
    closeHowItWorksWithoutFocus();
    navigateToTripView("packing");
  }, [closeHowItWorksWithoutFocus, navigateToTripView]);

  const handleHowItWorksPreferences = useCallback(() => {
    closeHowItWorksWithoutFocus();
    handleOpenProfile();
  }, [closeHowItWorksWithoutFocus, handleOpenProfile]);

  const handleConversionUpdate = (conversion: LastConversion) => {
    setLastConversion(conversion);
    storeLastConversion(conversion);
  };

  const howItWorksFallback = (
    <div className="flex min-h-[420px] items-center justify-center bg-white px-8 py-12">
      <Skeleton className="h-72 w-full max-w-xl rounded-[28px]" />
    </div>
  );

  const howItWorksContent = howItWorksLoaded ? (
    <Suspense fallback={howItWorksFallback}>
      <HowItWorksPanel
        titleId={howItWorksTitleId}
        descriptionId={howItWorksDescriptionId}
        onDismiss={handleDismissHowItWorks}
        onCreateTrip={handleHowItWorksCreateTrip}
        onInviteMembers={handleHowItWorksInviteMembers}
        onAddActivity={handleHowItWorksAddActivity}
        onBrowseDiscovery={handleHowItWorksBrowseDiscovery}
        onOpenExpenses={handleHowItWorksOpenExpenses}
        onOpenPacking={handleHowItWorksOpenPacking}
        onOpenPreferences={handleHowItWorksPreferences}
        onClose={() => handleHowItWorksOpenChange(false)}
        closeButtonRef={howItWorksCloseButtonRef}
        mobile={!isDesktop}
      />
    </Suspense>
  ) : (
    howItWorksFallback
  );

  return (
    <div className="dashboard-themed-background min-h-screen">
      <header role="banner" className="dashboard-header sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-[1240px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="dashboard-header__link inline-flex items-center rounded-full px-2 py-1"
          >
            <FloatLogo height={40} variant="dark" />
          </Link>
          <div className="flex-1" />
          {isDesktop ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                ref={(node) => {
                  if (node) {
                    howItWorksButtonRef.current = node;
                  }
                }}
                type="button"
                variant="outline"
                className="dashboard-header__button h-10 rounded-full border bg-transparent px-4 text-sm font-medium text-[color:var(--on-header)] hover:text-[color:var(--on-header)] focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => handleHowItWorksButtonClick()}
                aria-controls={howItWorksTitleId}
                aria-expanded={isHowItWorksOpen}
                aria-haspopup="dialog"
              >
                How It Works
              </Button>
              <Button
                ref={(node) => {
                  if (node) {
                    converterButtonRef.current = node;
                  }
                }}
                type="button"
                variant="outline"
                className="dashboard-header__button h-10 rounded-full border bg-transparent px-4 text-sm font-medium text-[color:var(--on-header)] hover:text-[color:var(--on-header)] focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => handleConverterOpen()}
                aria-controls={converterDialogId}
                aria-expanded={isConverterOpen}
                aria-haspopup="dialog"
              >
                Currency Converter
              </Button>
              <Button
                type="button"
                variant="outline"
                className="dashboard-header__button h-10 rounded-full border bg-transparent px-4 text-sm font-medium text-[color:var(--on-header)] hover:text-[color:var(--on-header)] focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleOpenProfile}
              >
                Profile & Preferences
              </Button>
              <ThemeToggle />
            </div>
          ) : (
            <DropdownMenu open={isQuickActionsOpen} onOpenChange={setIsQuickActionsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  ref={quickActionsButtonRef}
                  type="button"
                  variant="outline"
                  className="dashboard-header__button h-10 rounded-full border bg-transparent px-4 text-sm font-semibold text-[color:var(--on-header)] hover:text-[color:var(--on-header)] focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-haspopup="menu"
                  aria-expanded={isQuickActionsOpen}
                >
                  Quick actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="dashboard-quick-actions-menu w-56 rounded-2xl border px-2 py-2 text-sm"
                aria-label="Quick actions"
              >
                <DropdownMenuItem
                  className="dashboard-quick-actions-item cursor-pointer rounded-xl px-3 py-2 text-sm focus:bg-transparent focus:text-inherit"
                  onSelect={() => {
                    setIsQuickActionsOpen(false);
                    handleHowItWorksButtonClick(quickActionsButtonRef.current);
                  }}
                  aria-haspopup="dialog"
                  aria-controls={howItWorksTitleId}
                  aria-expanded={isHowItWorksOpen}
                >
                  How It Works
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dashboard-quick-actions-item cursor-pointer rounded-xl px-3 py-2 text-sm focus:bg-transparent focus:text-inherit"
                  onSelect={() => {
                    setIsQuickActionsOpen(false);
                    handleConverterOpen(quickActionsButtonRef.current);
                  }}
                  aria-haspopup="dialog"
                  aria-controls={converterDialogId}
                  aria-expanded={isConverterOpen}
                >
                  Currency Converter
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dashboard-quick-actions-item cursor-pointer rounded-xl px-3 py-2 text-sm focus:bg-transparent focus:text-inherit"
                  onSelect={() => {
                    setIsQuickActionsOpen(false);
                    handleOpenProfile();
                  }}
                >
                  Profile & Preferences
                </DropdownMenuItem>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm">Theme</span>
                  <ThemeToggle />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1240px] px-6 pb-20 pt-6 lg:pt-8">
        <div className="flex flex-col gap-6">

          {isDesktop ? (
            <Dialog open={isHowItWorksOpen} onOpenChange={handleHowItWorksOpenChange}>
              <DialogContent
                className="flex w-full max-w-3xl flex-col gap-0 overflow-hidden rounded-[32px] border border-[rgba(13,148,136,0.15)] bg-white dark:border-white/10 dark:bg-slate-900/95 backdrop-blur-xl p-0 shadow-2xl max-h-[min(90vh,calc(100vh-4rem))] sm:max-h-[min(90vh,calc(100vh-6rem))]"
                aria-labelledby={howItWorksTitleId}
                aria-describedby={howItWorksDescriptionId}
                onOpenAutoFocus={handleHowItWorksOpenAutoFocus}
                onCloseAutoFocus={handleDialogCloseAutoFocus}
              >
                {howItWorksContent}
              </DialogContent>
            </Dialog>
          ) : (
            <Sheet open={isHowItWorksOpen} onOpenChange={handleHowItWorksOpenChange}>
              <SheetContent
                side="bottom"
                className="flex h-[min(90vh,100dvh)] max-h-[min(90vh,100dvh)] w-full max-w-full flex-col gap-0 overflow-hidden rounded-t-[32px] border border-[rgba(13,148,136,0.15)] bg-white dark:border-white/10 dark:bg-slate-900/95 backdrop-blur-xl p-0 shadow-2xl"
                aria-labelledby={howItWorksTitleId}
                aria-describedby={howItWorksDescriptionId}
                onOpenAutoFocus={handleHowItWorksOpenAutoFocus}
                onCloseAutoFocus={handleDialogCloseAutoFocus}
              >
                {howItWorksContent}
              </SheetContent>
            </Sheet>
          )}

          {isDesktop ? (
            <Dialog open={isConverterOpen} onOpenChange={handleConverterVisibilityChange}>
              <DialogContent
                id={converterDialogId}
                className="w-full max-w-[560px] gap-0 overflow-hidden rounded-3xl border border-[rgba(13,148,136,0.15)] bg-white dark:border-white/10 dark:bg-slate-900/95 backdrop-blur-xl p-0 shadow-2xl"
                onOpenAutoFocus={handleConverterOpenAutoFocus}
                onCloseAutoFocus={handleDialogCloseAutoFocus}
              >
                <CurrencyConverterTool
                  onClose={() => handleConverterVisibilityChange(false)}
                  lastConversion={lastConversion}
                  onConversion={handleConversionUpdate}
                  mobile={!isDesktop}
                  autoFocusAmount={isConverterOpen}
                  closeButtonRef={converterCloseButtonRef}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Sheet open={isConverterOpen} onOpenChange={handleConverterVisibilityChange}>
              <SheetContent
                side="bottom"
                className="flex h-[100dvh] max-h-[100dvh] w-full max-w-full flex-col gap-0 overflow-hidden rounded-t-[32px] border border-[rgba(13,148,136,0.15)] bg-white dark:border-white/10 dark:bg-slate-900/95 backdrop-blur-xl p-0 shadow-2xl"
                onOpenAutoFocus={handleConverterOpenAutoFocus}
                onCloseAutoFocus={handleDialogCloseAutoFocus}
              >
                <CurrencyConverterTool
                  onClose={() => handleConverterVisibilityChange(false)}
                  lastConversion={lastConversion}
                  onConversion={handleConversionUpdate}
                  mobile={!isDesktop}
                  autoFocusAmount={isConverterOpen}
                  closeButtonRef={converterCloseButtonRef}
                />
              </SheetContent>
            </Sheet>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1
                id="dashboard-hero"
                className="font-fraunces text-3xl font-semibold tracking-tight text-[#0D3D39] dark:text-white sm:text-4xl"
              >
                {user?.firstName ? `Hey, ${user.firstName}` : "Your trips"}
              </h1>
              {nextTrip ? (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(13,148,136,0.08)] dark:bg-slate-800 px-3 py-1 text-xs font-medium text-teal-700 dark:text-slate-300">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {daysToNextTrip === 0 ? "Trip starts today!" : `${daysToNextTrip} days to your next trip`}
                  </span>
                </div>
              ) : (
                <p className="mt-1 text-sm text-[rgba(13,61,57,0.65)] dark:text-slate-400">Plan your next adventure</p>
              )}
            </div>
            <Button
              onClick={handlePlanTrip}
              className="h-auto self-start rounded-full px-6 py-2.5 text-sm font-semibold shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:self-auto"
            >
              Plan a New Trip
            </Button>
          </div>

          <section aria-labelledby="upcoming-trips-heading" className="space-y-4">
            <h2
              id="upcoming-trips-heading"
              className="text-lg font-semibold text-[#0D3D39] dark:text-white"
            >
              Upcoming trips
            </h2>

            {isError ? (
              <Card className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-amber-900">
                We’re having trouble loading your trips right now. Try refreshing the page.
              </Card>
            ) : null}

            {isLoading ? (
              <Skeleton className="h-[300px] w-full rounded-2xl" />
            ) : upcomingSummaries.length > 0 ? (
              <>
                <FeaturedTripCard
                  trip={upcomingSummaries[0]!}
                  nextTripData={nextTripWithPlanningData}
                  onNavigate={setLocation}
                />
                {upcomingSummaries.length > 1 && (
                  <div
                    className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2"
                    aria-label="Other upcoming trips"
                  >
                    {upcomingSummaries.slice(1).map((trip) => (
                      <CompactTripPill key={`compact-${trip.id}`} trip={trip} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <EmptyTripsState onPlanTrip={handlePlanTrip} />
            )}
          </section>

          <DashboardNotifications
            sectionId="dashboard-activity"
            memberLookup={memberLookup}
            tripLookup={tripLookup}
          />
        </div>
      </main>
    </div>
  );
}

function FeaturedTripCard({
  trip,
  nextTripData,
  onNavigate,
}: {
  trip: TripSummary;
  nextTripData: TripWithPlanningData | null;
  onNavigate: (path: string) => void;
}) {
  const cardImageSrc = resolveCoverPhotoUrl(
    trip.coverPhotoCardUrl ?? trip.coverPhotoOriginalUrl ?? trip.coverPhotoUrl ?? trip.coverImageUrl ?? null,
  );
  const cardImageSrcSet = buildCoverPhotoSrcSet({
    full: trip.coverPhotoUrl ?? trip.coverPhotoOriginalUrl ?? trip.coverImageUrl ?? null,
    card: trip.coverPhotoCardUrl ?? trip.coverPhotoUrl ?? trip.coverPhotoOriginalUrl ?? trip.coverImageUrl ?? null,
    thumb: trip.coverPhotoThumbUrl ?? trip.coverPhotoCardUrl ?? trip.coverPhotoUrl ?? trip.coverPhotoOriginalUrl ?? trip.coverImageUrl ?? null,
  });
  const altText = buildCoverPhotoAltText(trip.name);
  const objectPosition = getCoverPhotoObjectPosition(trip.coverPhotoFocalX, trip.coverPhotoFocalY);
  const { showImage, isLoaded, handleLoad, handleError } = useCoverPhotoImage(cardImageSrc);

  const progress = nextTripData ? calculateTripPlanningProgress(nextTripData) : null;
  const openDecisions = nextTripData ? countOpenDecisions(nextTripData) : null;
  const totalOpen = openDecisions
    ? (Object.values(openDecisions) as number[]).reduce((s, v) => s + v, 0)
    : 0;

  const daysLeft = differenceInCalendarDays(parseISO(trip.startDate), startOfDay(new Date()));
  const daysLabel =
    daysLeft === 0 ? "Starts today!" : daysLeft > 0 ? `${daysLeft} days to go` : "In progress";

  return (
    <div
      role="region"
      aria-label={`Featured trip: ${trip.name}`}
      className="overflow-hidden rounded-2xl border border-[rgba(13,148,136,0.18)] shadow-[0_4px_32px_-8px_rgba(13,61,57,0.12)]"
    >
      <div className="relative min-h-[280px] bg-[#C8EDE9] md:min-h-[360px]">
        {showImage && (
          <img
            src={cardImageSrc ?? undefined}
            srcSet={cardImageSrcSet}
            sizes="100vw"
            alt={altText}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition }}
            onLoad={handleLoad}
            onError={handleError}
            loading="eager"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,61,57,0.88)] via-[rgba(13,61,57,0.35)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D9488] px-3 py-1 text-xs font-semibold text-white">
              <CalendarDays className="h-3.5 w-3.5" />
              {daysLabel}
            </span>
          </div>
          <h2 className="font-fraunces mb-1 text-3xl font-semibold leading-tight text-white md:text-4xl">
            {trip.name}
          </h2>
          <p className="mb-5 flex items-center gap-1.5 text-sm text-white/80">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{trip.destination}</span>
            <span className="text-white/50">·</span>
            <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
          </p>
          {trip.travelers.length > 0 && (
            <div className="mb-5 flex items-center gap-2">
              <div className="flex -space-x-2">
                {trip.travelers.slice(0, 5).map((traveler, index) => (
                  <Avatar
                    key={`featured-traveler-${index}`}
                    className="h-7 w-7 border-2 border-white/30 bg-[rgba(13,148,136,0.40)]"
                  >
                    <AvatarImage src={traveler.avatar ?? undefined} alt="" loading="lazy" />
                    <AvatarFallback className="text-[10px] text-white">{traveler.initial}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-white/75">{getTravelersLabel(trip.travelersCount)}</span>
            </div>
          )}
          {progress !== null && (
            <div className="mb-5 max-w-xs">
              <div className="mb-1.5 flex justify-between text-xs text-white/70">
                <span>Planning progress</span>
                <span>{progress.percentage}%</span>
              </div>
              <Progress
                value={progress.percentage}
                className="h-1.5 bg-white/20 [&>div]:bg-[#0D9488]"
              />
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => onNavigate(`/trip/${trip.id}`)}
              className="h-8 rounded-full px-4 text-xs font-semibold"
            >
              Open Trip
            </Button>
            {totalOpen > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigate(`/trip/${trip.id}?view=proposals`)}
                className="h-8 rounded-full border-white/30 bg-transparent px-4 text-xs font-semibold text-white hover:bg-white/10 hover:text-white dark:border-white/20"
              >
                Proposals ({totalOpen})
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate(`/trip/${trip.id}?view=members`)}
              className="h-8 rounded-full border-white/30 bg-transparent px-4 text-xs font-semibold text-white hover:bg-white/10 hover:text-white dark:border-white/20"
            >
              Members
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactTripPill({ trip }: { trip: TripSummary }) {
  const daysLeft = differenceInCalendarDays(parseISO(trip.startDate), startOfDay(new Date()));
  const daysLabel =
    daysLeft === 0 ? "Today!" : daysLeft > 0 ? `${daysLeft}d to go` : "In progress";

  return (
    <Link
      href={`/trip/${trip.id}`}
      aria-label={buildTripAriaLabel(trip.name, trip.destination, trip.startDate, trip.endDate)}
      className="w-44 flex-shrink-0 rounded-xl border border-[rgba(13,148,136,0.15)] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(13,148,136,0.30)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] dark:border-white/10 dark:bg-slate-800/60"
    >
      <p className="truncate text-sm font-semibold text-[#0D3D39] dark:text-white">{trip.name}</p>
      <p className="mt-0.5 truncate text-xs text-[rgba(13,61,57,0.65)] dark:text-slate-400">{trip.destination}</p>
      <p className="mt-2 text-xs font-semibold text-[#0D9488]">{daysLabel}</p>
    </Link>
  );
}

function EmptyTripsState({ onPlanTrip }: { onPlanTrip: () => void }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-5 p-12 text-center border-[rgba(13,148,136,0.15)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(13,148,136,0.10)]">
        <Plane className="h-8 w-8 text-[#0D9488]" />
      </div>
      <div>
        <h3 className="font-fraunces mb-2 text-2xl font-semibold text-[#0D3D39] dark:text-white">
          Ready for your next getaway?
        </h3>
        <p className="mx-auto max-w-sm text-sm text-[rgba(13,61,57,0.65)] dark:text-slate-400">
          Start planning a new adventure to see it appear here.
        </p>
      </div>
      <Button onClick={onPlanTrip} className="rounded-full px-6">
        Plan a New Trip
      </Button>
    </Card>
  );
}
