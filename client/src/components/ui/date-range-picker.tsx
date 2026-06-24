import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  startValue: string;
  endValue: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

export function DateRangePicker({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  placeholder = "Select dates",
  minDate,
  className,
}: DateRangePickerProps) {
  const startDate = startValue ? new Date(startValue + "T00:00") : undefined;
  const endDate = endValue ? new Date(endValue + "T00:00") : undefined;
  const hasStart = startDate && !isNaN(startDate.getTime());
  const hasEnd = endDate && !isNaN(endDate.getTime());

  const selected: DateRange | undefined = hasStart
    ? { from: startDate!, to: hasEnd ? endDate! : undefined }
    : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className={cn(
            "w-full justify-start text-left font-normal h-auto py-2.5",
            !startValue && "text-muted-foreground",
            "hover:bg-[rgba(13,148,136,0.05)] focus-visible:ring-2 focus-visible:ring-[#0D9488]/40 focus-visible:ring-offset-2",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
          {hasStart && hasEnd ? (
            <span>
              {format(startDate!, "MMM d, yyyy")}
              <span className="text-muted-foreground"> → </span>
              {format(endDate!, "MMM d, yyyy")}
            </span>
          ) : hasStart ? (
            <span>{format(startDate!, "MMM d, yyyy")}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <Calendar
          mode="range"
          selected={selected}
          defaultMonth={startDate ?? undefined}
          onSelect={(range) => {
            if (range?.from) {
              onStartChange(format(range.from, "yyyy-MM-dd"));
            }
            if (range?.to) {
              onEndChange(format(range.to, "yyyy-MM-dd"));
            } else if (range?.from) {
              onEndChange(format(range.from, "yyyy-MM-dd"));
            }
          }}
          disabled={minDate ? (date: Date) => date < minDate! : undefined}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
