import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white dark:ring-offset-slate-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0D9488] text-white shadow-[0_8px_20px_-8px_rgba(13,148,136,0.40)] hover:bg-[#0B7C73] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(13,148,136,0.50)] dark:bg-[#0D9488] dark:hover:bg-[#0B7C73]",
        destructive:
          "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_10px_40px_-10px_rgba(244,63,94,0.4)] hover:from-rose-400 hover:to-pink-400",
        outline:
          "border border-[rgba(13,148,136,0.25)] bg-white text-[#0D3D39] hover:bg-[#F0FDFA] hover:border-[rgba(13,148,136,0.40)] dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/30",
        secondary:
          "border border-[rgba(13,148,136,0.30)] bg-[rgba(13,148,136,0.08)] text-teal-700 hover:bg-[rgba(13,148,136,0.15)] hover:text-teal-800 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-200",
        ghost: "text-[#0D3D39] hover:bg-[rgba(13,148,136,0.08)] hover:text-teal-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
        link: "text-teal-600 underline-offset-4 hover:text-teal-700 hover:underline dark:text-teal-400 dark:hover:text-teal-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
