import type { DateRange } from "react-day-picker";

import { format, endOfDay } from "date-fns";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import { Field } from "#/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover";

interface Props {
  storedFilter: DateRange | undefined;
  storeFilter: (value: DateRange | undefined) => void;
  zIndex?: number;
}

export default function DateRangeFilterPopover({ storedFilter, storeFilter, zIndex = 100 }: Props) {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(storedFilter);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(open) => {
        if (!open) storeFilter(dateRange?.from || dateRange?.to ? dateRange : undefined);
      }}
    >
      <PopoverTrigger
        render={
          <Button variant="ghost">
            <FilterIcon className={storedFilter ? "fill-foreground" : ""} />
          </Button>
        }
      />
      <PopoverContent zIndex={zIndex}>
        <Field>
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" className="justify-start px-2.5 font-normal">
                  <CalendarIcon data-icon="inline-start" />
                  {dateRange?.from &&
                    (dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    ))}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start" zIndex={zIndex}>
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(value) => {
                  setDateRange({
                    from: value?.from,
                    to: value?.to ? endOfDay(value.to) : undefined,
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </Field>
      </PopoverContent>
    </Popover>
  );
}
