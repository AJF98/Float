import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default:
          "border-[rgba(13,148,136,0.30)] bg-[rgba(13,148,136,0.10)] text-teal-700 hover:bg-[rgba(13,148,136,0.18)] dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20",
        secondary:
          "border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.06)] text-teal-600 hover:bg-[rgba(13,148,136,0.12)] dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300 dark:hover:bg-violet-400/20",
        destructive:
          "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300 dark:hover:bg-rose-400/20",
        outline: "border-[rgba(13,148,136,0.25)] text-teal-700 hover:bg-[rgba(13,148,136,0.06)] dark:border-white/20 dark:text-slate-300 dark:hover:bg-white/5",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20",
        warning:
          "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
