import { CalendarPlus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type SaveProposeMode = "SAVE" | "PROPOSE";

interface SaveProposeToggleProps<T extends string = SaveProposeMode> {
  mode: T;
  onModeChange: (mode: T) => void;
  saveMode?: T;
  proposeMode?: T;
  saveLabel?: string;
  proposeLabel?: string;
  saveDescription?: string;
  proposeDescription?: string;
  disabled?: boolean;
  className?: string;
}

export function SaveProposeToggle<T extends string = SaveProposeMode>({
  mode,
  onModeChange,
  saveMode = "SAVE" as T,
  proposeMode = "PROPOSE" as T,
  saveLabel = "Add to Trip",
  proposeLabel = "Float Idea",
  saveDescription = "Adds directly to selected members' trip calendars — no acceptance needed.",
  proposeDescription = "Float this idea to the group for voting. Not added to calendars until confirmed.",
  disabled = false,
  className = "",
}: SaveProposeToggleProps<T>) {
  const isSaveMode = mode === saveMode;
  const isProposeMode = mode === proposeMode;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onModeChange(saveMode)}
          disabled={disabled}
          data-testid="button-mode-save"
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all",
            isSaveMode
              ? "bg-[#0D9488] text-white shadow-sm"
              : "border border-[rgba(13,148,136,0.20)] bg-white text-[#0D3D39] hover:bg-[rgba(13,148,136,0.06)]",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <CalendarPlus className="h-4 w-4" />
          {saveLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange(proposeMode)}
          disabled={disabled}
          data-testid="button-mode-propose"
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all",
            isProposeMode
              ? "bg-[#0D9488] text-white shadow-sm"
              : "border border-[rgba(13,148,136,0.20)] bg-white text-[#0D3D39] hover:bg-[rgba(13,148,136,0.06)]",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <Users className="h-4 w-4" />
          {proposeLabel}
        </button>
      </div>
      <p className="text-xs text-[rgba(13,61,57,0.60)]">
        {isSaveMode ? saveDescription : proposeDescription}
      </p>
    </div>
  );
}
