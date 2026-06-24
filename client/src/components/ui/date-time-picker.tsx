import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Set a deadline",
  minDate,
  className,
}: DateTimePickerProps) {
  const parsed = value ? new Date(value) : null;
  const isValid = parsed !== null && !isNaN(parsed.getTime());
  const datePart = value ? value.split("T")[0] : "";
  const timePart = value ? (value.split("T")[1]?.slice(0, 5) ?? "00:00") : "00:00";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const effectiveMin = minDate ?? today;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            "hover:bg-[rgba(13,148,136,0.05)] focus-visible:ring-2 focus-visible:ring-[#0D9488]/40 focus-visible:ring-offset-2",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
          {isValid ? (
            format(parsed!, "MMM d, yyyy 'at' h:mm a")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={isValid ? parsed! : undefined}
          defaultMonth={isValid ? parsed! : undefined}
          onSelect={(date) => {
            if (date) {
              const newDatePart = format(date, "yyyy-MM-dd");
              onChange(newDatePart + "T" + (timePart || "00:00"));
            }
          }}
          disabled={(date: Date) => date < effectiveMin}
          initialFocus
        />
        <div className="border-t p-3">
          <Input
            type="time"
            value={timePart}
            onChange={(e) => {
              const newTime = e.target.value;
              const existingDate = datePart || format(new Date(), "yyyy-MM-dd");
              onChange(existingDate + "T" + newTime);
            }}
            className="w-full border-[rgba(13,148,136,0.20)]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
