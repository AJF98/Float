import { useEffect } from "react";
import type { InputHTMLAttributes } from "react";
import type { DateRange } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  HOTEL_FIELD_LABELS,
  type HotelFormValues,
} from "@/lib/hotel-form";

const requiredFields: Array<keyof HotelFormValues> = [
  "hotelName",
  "address",
  "city",
  "country",
  "checkInDate",
  "checkOutDate",
  "pricePerNight",
  "guestCount",
];

const integerFields = new Set<keyof HotelFormValues>(["guestCount", "roomCount"]);

const selectFieldOptions: Record<string, Array<{ label: string; value: string }>> = {
  currency: [
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
    { label: "GBP", value: "GBP" },
    { label: "CAD", value: "CAD" },
    { label: "AUD", value: "AUD" },
    { label: "JPY", value: "JPY" },
    { label: "MXN", value: "MXN" },
  ],
  status: [
    { label: "Confirmed", value: "confirmed" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
    { label: "On Hold", value: "on-hold" },
  ],
  bookingPlatform: [
    { label: "Booking.com", value: "booking.com" },
    { label: "Expedia", value: "expedia" },
    { label: "Hotels.com", value: "hotels.com" },
    { label: "Airbnb", value: "airbnb" },
    { label: "VRBO", value: "vrbo" },
    { label: "Direct", value: "direct" },
    { label: "Other", value: "other" },
  ],
};

interface HotelFormFieldsProps {
  form: UseFormReturn<HotelFormValues>;
  isSubmitting: boolean;
  submitLabel: string;
  onCancel?: () => void;
  showCancelButton?: boolean;
  children?: React.ReactNode;
}

export function HotelFormFields({
  form,
  isSubmitting,
  submitLabel,
  onCancel,
  showCancelButton = false,
  children,
}: HotelFormFieldsProps) {
  useEffect(() => {
    form.register("checkOutDate");
  }, [form]);

  const checkOutValue = form.watch("checkOutDate");

  return (
    <div className="space-y-3">

      {/* Section A — Property */}
      <div className="rounded-xl bg-[rgba(13,148,136,0.04)] border border-[rgba(13,148,136,0.12)] p-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(13,61,57,0.4)]">Property</p>
        <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
          <div className="space-y-1">
            <label className="text-sm text-[rgba(13,61,57,0.65)] font-medium">
              Hotel Name <span className="text-destructive">*</span>
            </label>
            {renderTextField(form, "hotelName", { placeholder: "e.g., The Ritz-Carlton" })}
          </div>
          <div className="space-y-1 w-24">
            <label className="text-sm text-[rgba(13,61,57,0.65)] font-medium">Stars</label>
            {renderNumberField(form, "hotelRating", { min: "0", max: "5", step: "0.5", placeholder: "4.5" })}
          </div>
        </div>
      </div>

      {/* Section B — Location */}
      <div className="rounded-xl bg-[rgba(13,148,136,0.04)] border border-[rgba(13,148,136,0.12)] p-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(13,61,57,0.4)]">Location</p>
        {renderTextField(form, "address", { placeholder: "123 Main St" })}
        <div className="grid grid-cols-2 gap-3">
          {renderTextField(form, "city", { placeholder: "Austin" })}
          {renderTextField(form, "country", { placeholder: "United States" })}
        </div>
        {renderTextField(form, "zipCode", { placeholder: "78701" })}
      </div>

      {/* Section C — Stay Dates */}
      <div className="rounded-xl bg-[rgba(13,148,136,0.04)] border border-[rgba(13,148,136,0.12)] p-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(13,61,57,0.4)]">Stay Dates</p>
        <FormField
          control={form.control}
          name="checkInDate"
          render={({ field }) => {
            const fromDate = field.value ? (field.value instanceof Date ? field.value : new Date(field.value)) : undefined;
            const toDate = checkOutValue ? (checkOutValue instanceof Date ? checkOutValue : new Date(checkOutValue)) : fromDate;
            const selectedRange: DateRange | undefined = fromDate
              ? { from: fromDate, to: toDate }
              : undefined;

            const hasBothDates = Boolean(selectedRange?.from && selectedRange?.to);
            const nights = hasBothDates
              ? Math.max(1, differenceInCalendarDays(selectedRange!.to!, selectedRange!.from!))
              : 0;

            return (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm text-[rgba(13,61,57,0.65)] font-medium mb-1">
                  Check-in / Check-out <span className="text-destructive ml-0.5">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          "w-full justify-start text-left font-normal h-auto py-2.5",
                          !selectedRange?.from && "text-muted-foreground",
                          "hover:bg-[rgba(13,148,136,0.05)] focus-visible:ring-2 focus-visible:ring-[#0D9488]/40 focus-visible:ring-offset-2"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                        {selectedRange?.from ? (
                          <span>
                            {format(selectedRange.from, "MMM d, yyyy")}
                            {hasBothDates && (
                              <span className="text-muted-foreground"> → {format(selectedRange!.to!, "MMM d, yyyy")}</span>
                            )}
                            {hasBothDates && (
                              <span className="text-[rgba(13,61,57,0.4)] text-xs ml-2">
                                · {nights} night{nights === 1 ? "" : "s"}
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Select check-in and check-out dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={selectedRange?.from}
                      selected={selectedRange}
                      onSelect={(range) => {
                        if (range?.from) {
                          field.onChange(range.from);
                        }
                        if (range?.to) {
                          form.setValue("checkOutDate", range.to, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        } else if (range?.from) {
                          form.setValue("checkOutDate", range.from, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }
                      }}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {(form.formState.errors.checkInDate || form.formState.errors.checkOutDate) && (
                  <FormMessage>
                    {form.formState.errors.checkInDate?.message ||
                      form.formState.errors.checkOutDate?.message}
                  </FormMessage>
                )}
              </FormItem>
            );
          }}
        />
      </div>

      {/* Section D — Pricing & Guests */}
      <div className="rounded-xl bg-[rgba(13,148,136,0.04)] border border-[rgba(13,148,136,0.12)] p-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(13,61,57,0.4)]">Pricing & Guests</p>
        <div className="grid grid-cols-3 gap-3">
          {renderNumberField(form, "pricePerNight", { min: "0", step: "0.01", placeholder: "99.00" })}
          {renderNumberField(form, "guestCount", { min: "1", step: "1" })}
          {renderNumberField(form, "roomCount", { min: "1", step: "1" })}
        </div>
      </div>

      {/* Section E — Details */}
      <div className="rounded-xl bg-[rgba(13,148,136,0.04)] border border-[rgba(13,148,136,0.12)] p-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[rgba(13,61,57,0.4)]">Details</p>
        {renderTextField(form, "bookingUrl", { type: "url", placeholder: "https://booking.com/..." })}
        {renderTextareaField(form, "notes", "Share group preferences or special requests.")}
      </div>

      {/* Advanced Details */}
      <Accordion type="single" collapsible className="overflow-hidden rounded-xl border border-[rgba(13,148,136,0.12)]">
        <AccordionItem value="advanced" className="border-b-0">
          <AccordionTrigger className="px-4 text-sm font-medium text-[rgba(13,61,57,0.65)] hover:text-[#0D3D39]">
            Advanced Details
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderTextField(form, "hotelChain", { placeholder: "Hilton Worldwide" })}
                {renderTextField(form, "roomType", { placeholder: "Double Queen" })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderTextField(form, "bookingReference", { placeholder: "ABC123" })}
                {renderTextField(form, "bookingSource", { placeholder: "Travel agent" })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {renderNumberField(form, "totalPrice", { min: "0", step: "0.01", placeholder: "299.00" })}
                {renderSelectField(form, "currency")}
                {renderSelectField(form, "status")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderNumberField(form, "latitude", { step: "0.000001" })}
                {renderNumberField(form, "longitude", { step: "0.000001" })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {renderTextField(form, "purchaseUrl", { type: "url", placeholder: "https://portal.example.com" })}
                {renderSelectField(form, "bookingPlatform", true)}
                {renderTextField(form, "cancellationPolicy", {
                  placeholder: "Free cancellation until 48 hours prior",
                })}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {renderTextField(form, "contactInfo", { placeholder: "Front desk: +1 (555) 555-5555" })}
              </div>

              <Separator className="bg-[rgba(13,148,136,0.12)]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderTextareaField(form, "amenities", "Separate amenities with commas or paste JSON.")}
                {renderTextareaField(form, "policies", "Use JSON or descriptive text for important policies.")}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {renderTextareaField(form, "images", "Provide image URLs separated by commas or JSON array.")}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {children}

      <div className="flex justify-end gap-3 border-t border-[rgba(13,148,136,0.15)] pt-4 mt-2">
        {showCancelButton && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-[rgba(13,61,57,0.65)] hover:text-[#0D3D39] hover:bg-[rgba(13,148,136,0.05)]"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#0D9488] hover:bg-[#0B7C73] text-white"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </div>
  );
}

function renderTextField(
  form: UseFormReturn<HotelFormValues>,
  name: keyof HotelFormValues,
  inputProps: InputHTMLAttributes<HTMLInputElement> = {},
) {
  const label = HOTEL_FIELD_LABELS[name as keyof typeof HOTEL_FIELD_LABELS] ?? name;

  return (
    <FormField
      key={String(name)}
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[rgba(13,61,57,0.65)] font-medium">
            {label}
            <RequiredMark fieldName={name} />
          </FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              {...field}
              value={field.value ?? ""}
              onChange={(event) => field.onChange(event.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderNumberField(
  form: UseFormReturn<HotelFormValues>,
  name: keyof HotelFormValues,
  props: { min?: string; max?: string; step?: string; placeholder?: string } = {},
) {
  const label = HOTEL_FIELD_LABELS[name as keyof typeof HOTEL_FIELD_LABELS] ?? name;
  const isInteger = integerFields.has(name);

  return (
    <FormField
      key={String(name)}
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[rgba(13,61,57,0.65)] font-medium">
            {label}
            <RequiredMark fieldName={name} />
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              inputMode="decimal"
              {...props}
              value={field.value ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "") {
                  field.onChange(null);
                  return;
                }
                field.onChange(isInteger ? parseInt(value, 10) : parseFloat(value));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderSelectField(
  form: UseFormReturn<HotelFormValues>,
  name: keyof HotelFormValues,
  isOptional = false,
) {
  const options = selectFieldOptions[name as string];
  const label = HOTEL_FIELD_LABELS[name as keyof typeof HOTEL_FIELD_LABELS] ?? name;

  if (!options) {
    return renderTextField(form, name);
  }

  return (
    <FormField
      key={String(name)}
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[rgba(13,61,57,0.65)] font-medium">
            {label}
            {!isOptional && <RequiredMark fieldName={name} />}
          </FormLabel>
          <Select value={field.value ?? undefined} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function renderTextareaField(
  form: UseFormReturn<HotelFormValues>,
  name: keyof HotelFormValues,
  helperText?: string,
) {
  const label = HOTEL_FIELD_LABELS[name as keyof typeof HOTEL_FIELD_LABELS] ?? name;

  return (
    <FormField
      key={String(name)}
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[rgba(13,61,57,0.65)] font-medium">{label}</FormLabel>
          <FormControl>
            <Textarea
              rows={3}
              {...field}
              value={field.value ?? ""}
              onChange={(event) => field.onChange(event.target.value)}
            />
          </FormControl>
          {helperText && (
            <p className="text-xs text-[rgba(13,61,57,0.5)]">{helperText}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function RequiredMark({ fieldName }: { fieldName: keyof HotelFormValues }) {
  const isRequired = requiredFields.includes(fieldName);
  if (!isRequired) {
    return null;
  }
  return <span className="ml-1 text-destructive">*</span>;
}
