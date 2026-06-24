import { type ReactNode, type RefObject } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ModalLayout from "@/components/dashboard/modal-layout";

interface HowItWorksPanelProps {
  titleId: string;
  descriptionId: string;
  onClose: () => void;
  onDismiss: () => void;
  onCreateTrip: () => void;
  onInviteMembers: () => void;
  onAddActivity: () => void;
  onBrowseDiscovery: () => void;
  onOpenExpenses: () => void;
  onOpenPacking: () => void;
  onOpenPreferences: () => void;
  closeButtonRef?: RefObject<HTMLButtonElement>;
  mobile?: boolean;
}

type Benefit = {
  title: string;
  description: string;
  icon: ReactNode;
};

type FlowStep = {
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
};

const benefits: Benefit[] = [
  {
    title: "Plan together, in one place.",
    description:
      "Keep flights, stays, meals, activities, and RSVPs on a single shared timeline.",
    icon: (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(13,148,136,0.10)] border border-[rgba(13,148,136,0.25)] text-[#0D9488]">
        <UsersRound className="h-5 w-5" aria-hidden="true" />
      </div>
    ),
  },
  {
    title: "Decide fast.",
    description: "Float options, vote, and convert winners into scheduled items.",
    icon: (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(13,148,136,0.10)] border border-[rgba(13,148,136,0.25)] text-[#0D9488]">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      </div>
    ),
  },
  {
    title: "Stay in sync.",
    description:
      "Personal schedule for what you're attending; group calendar for everything the trip sees.",
    icon: (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(13,148,136,0.10)] border border-[rgba(13,148,136,0.25)] text-[#0D9488]">
        <CalendarDays className="h-5 w-5" aria-hidden="true" />
      </div>
    ),
  },
];

export default function HowItWorksPanel({
  titleId,
  descriptionId,
  onClose,
  onDismiss,
  onCreateTrip,
  onInviteMembers,
  onAddActivity,
  onBrowseDiscovery,
  onOpenExpenses,
  onOpenPacking,
  onOpenPreferences,
  closeButtonRef,
  mobile = false,
}: HowItWorksPanelProps) {
  const flowSteps: FlowStep[] = [
    {
      title: "Create Your First Trip",
      description: "Start a new trip calendar with destination and dates.",
      cta: "Create trip",
      onClick: onCreateTrip,
    },
    {
      title: "Invite Your Travel Group",
      description: "Share your trip link so friends can join and collaborate.",
      cta: "Invite members",
      onClick: onInviteMembers,
    },
    {
      title: "Plan Activities Together",
      description:
        "Float or schedule restaurants, tours, and more. Friends can vote or RSVP yes/no.",
      cta: "Add activity",
      onClick: onAddActivity,
    },
    {
      title: "Discover Local Experiences",
      description:
        "Search hotels, restaurants, and activities with live filters — add straight to the trip.",
      cta: "Browse discovery",
      onClick: onBrowseDiscovery,
    },
    {
      title: "Split Expenses Fairly",
      description: "Log group costs, see who owes who, and settle up later.",
      cta: "Open expenses",
      onClick: onOpenExpenses,
    },
    {
      title: "Coordinate Packing",
      description: "Keep a shared checklist so nothing gets missed.",
      cta: "Open packing list",
      onClick: onOpenPacking,
    },
    {
      title: "Tune Notifications & Preferences",
      description: "Choose what updates you get and how you're notified.",
      cta: "Profile & Preferences",
      onClick: onOpenPreferences,
    },
  ];

  return (
    <ModalLayout
      onClose={onClose}
      closeButtonRef={closeButtonRef}
      closeLabel="Close how it works"
      headerClassName={`px-6 ${mobile ? "pt-6" : "pt-8"} pb-4 sm:px-10 ${mobile ? "sm:pt-8" : "sm:pt-10"}`}
      bodyClassName={`px-6 pb-10 pt-2 sm:px-10 ${mobile ? "sm:pb-10" : "sm:pb-12"}`}
      footerClassName="border-t border-[rgba(13,148,136,0.15)] bg-white/95 dark:border-white/10 dark:bg-slate-900/95 px-6 py-5 backdrop-blur sm:px-10"
      header={
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(13,148,136,0.25)] bg-[rgba(13,148,136,0.08)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#0D9488]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            How it works
          </div>
          <div className="space-y-3">
            <h1
              id={titleId}
              className="font-fraunces text-3xl font-semibold tracking-tight text-[#0D3D39] dark:text-white sm:text-4xl"
            >
              How Float Works
            </h1>
            <p
              id={descriptionId}
              className="max-w-2xl text-base text-[rgba(13,61,57,0.65)] dark:text-slate-300 sm:text-lg"
            >
              Plan amazing group trips with collaborative tools — all in one place.
            </p>
          </div>
        </div>
      }
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-full px-5 text-sm font-semibold text-[rgba(13,61,57,0.65)] transition hover:bg-[rgba(13,148,136,0.08)] hover:text-[#0D3D39] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={onCreateTrip}
          >
            Create a trip
          </Button>
          <Button
            type="button"
            className="h-11 rounded-full px-6 text-sm font-semibold"
            onClick={onDismiss}
          >
            Got it
          </Button>
        </div>
      }
    >
      <div className="space-y-12">
        <section aria-labelledby="how-it-works-why" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 id="how-it-works-why" className="text-lg font-semibold text-[#0D3D39] dark:text-white">
              Why Float
            </h2>
            <span className="text-sm text-[rgba(13,61,57,0.65)] dark:text-slate-400">Three quick benefits</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(13,148,136,0.15)] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[rgba(13,148,136,0.30)] hover:shadow-md dark:border-white/10 dark:bg-slate-800/60"
              >
                {benefit.icon}
                <h3 className="mt-5 text-base font-semibold text-[#0D3D39] dark:text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm text-[rgba(13,61,57,0.65)] dark:text-slate-300">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="how-it-works-flow" className="space-y-5">
          <div className="space-y-2">
            <h2 id="how-it-works-flow" className="text-lg font-semibold text-[#0D3D39] dark:text-white">
              The flow
            </h2>
            <p className="text-sm text-[rgba(13,61,57,0.65)] dark:text-slate-400">Seven quick steps to launch your next adventure.</p>
          </div>
          <div className="space-y-3">
            {flowSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex flex-col gap-4 rounded-2xl border border-[rgba(13,148,136,0.12)] bg-white p-5 shadow-sm transition hover:border-[rgba(13,148,136,0.25)] sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-slate-800/50"
              >
                <div className="flex flex-1 items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0D9488] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-[#0D3D39] dark:text-white">{step.title}</h3>
                    <p className="text-sm text-[rgba(13,61,57,0.65)] dark:text-slate-300">{step.description}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 shrink-0 rounded-full border border-[rgba(13,148,136,0.20)] bg-white px-4 text-sm font-medium text-[#0D3D39] transition hover:border-[rgba(13,148,136,0.40)] hover:bg-[rgba(13,148,136,0.06)] dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-slate-700 dark:hover:text-white"
                  onClick={step.onClick}
                >
                  {step.cta}
                  <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="how-it-works-tips" className="space-y-4">
          <h2 id="how-it-works-tips" className="text-lg font-semibold text-[#0D3D39] dark:text-white">
            Tips
          </h2>
          <div className="space-y-4 rounded-2xl border border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.06)] p-6">
            <div>
              <h3 className="text-base font-semibold text-[#0D9488]">Scheduled vs Floated</h3>
              <p className="mt-1.5 text-sm text-[rgba(13,61,57,0.65)]">
                Use <strong>Scheduled</strong> when a time/date is set and you need accept/decline. Use <strong>Floated</strong> to
                collect interest/votes before booking.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0D9488]">Two calendars</h3>
              <p className="mt-1.5 text-sm text-[rgba(13,61,57,0.65)]">
                <strong>My Schedule</strong> shows only what you're attending; <strong>Group Calendar</strong> shows everything on the trip.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#0D9488]">Quick add</h3>
              <p className="mt-1.5 text-sm text-[rgba(13,61,57,0.65)]">
                You can add items from each tab without leaving the page (search sits in-page).
              </p>
            </div>
          </div>
        </section>
      </div>
    </ModalLayout>
  );
}
