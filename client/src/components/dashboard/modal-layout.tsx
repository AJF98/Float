import { type ReactNode, type RefObject } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type ModalLayoutProps = {
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  closeLabel?: string;
  closeButtonRef?: RefObject<HTMLButtonElement>;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

export default function ModalLayout({
  header,
  children,
  footer,
  onClose,
  closeLabel = "Close dialog",
  closeButtonRef,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: ModalLayoutProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden bg-white dark:bg-slate-900",
        className,
      )}
    >
      <div
        className={cn(
          "sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[rgba(13,148,136,0.15)] bg-white/95 dark:border-white/10 dark:bg-slate-900/95 px-6 py-5 backdrop-blur",
          headerClassName,
        )}
      >
        <div className="min-w-0 flex-1">{header}</div>
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.06)] text-[#0D3D39]/60 transition hover:border-[rgba(13,148,136,0.35)] hover:text-[#0D3D39] dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          aria-label={closeLabel}
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className={cn("flex-1 overflow-y-auto px-6 py-6", bodyClassName)}>
        {children}
      </div>
      {footer ? (
        <div
          className={cn(
            "sticky bottom-0 z-10 border-t border-[rgba(13,148,136,0.15)] bg-white/95 dark:border-white/10 dark:bg-slate-900/95 px-6 py-5 backdrop-blur",
            footerClassName,
          )}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}
