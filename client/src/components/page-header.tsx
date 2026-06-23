import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  tripName?: string | null;
  tripId?: string | number | null;
  backTo?: "trip" | "dashboard";
  icon?: ReactNode;
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
  badge?: { label: string; variant?: "default" | "secondary" | "outline" | "destructive" };
  sticky?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  tripName,
  tripId,
  backTo = "trip",
  icon,
  primaryAction,
  secondaryActions,
  badge,
  sticky = false,
  className,
}: PageHeaderProps) {
  const backHref = backTo === "trip" && tripId ? `/trip/${tripId}` : "/";
  const backLabel = backTo === "trip" ? "Back to Trip" : "Back to Dashboard";

  return (
    <div
      className={cn(
        "bg-white/95 border-b dark:bg-slate-900/80 dark:backdrop-blur-xl dark:border-white/10",
        sticky && "sticky top-0 z-10",
        className
      )}
      style={{ borderColor: 'rgba(13,148,136,0.18)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-0 md:h-16">
          <div className="flex items-center gap-4">
            <Link href={backHref}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center text-[#0D3D39]/65 hover:text-[#0D9488] hover:bg-[rgba(13,148,136,0.08)] dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
                data-testid="button-back-navigation"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backLabel}
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex-shrink-0 text-[#0D9488] dark:text-cyan-400">{icon}</div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className="text-xl font-semibold text-[#0D3D39] dark:text-white"
                    data-testid="text-page-title"
                  >
                    {title}
                  </h1>
                  {badge && (
                    <Badge variant={badge.variant || "secondary"} className="text-xs">
                      {badge.label}
                    </Badge>
                  )}
                </div>
                {tripName && (
                  <p
                    className="text-sm text-[#0D3D39]/55 dark:text-slate-400"
                    data-testid="text-trip-context"
                  >
                    {tripName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {(primaryAction || secondaryActions) && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {secondaryActions}
              {primaryAction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
