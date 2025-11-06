"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

interface Props {
  onUpdateForm?: (e: DateRange | undefined) => void;
  className?: string;
}

const TaskCalendar = ({ className, onUpdateForm }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const formatRange = () => {
    if (!date?.from) return "Pick a date";
    if (date.to) {
      return `${format(date.from, "dd LLL yyyy", { locale: enUS })} → ${format(
        date.to,
        "dd LLL yyyy",
        { locale: enUS }
      )}`;
    }
    return format(date.from, "dd LLL yyyy", { locale: enUS });
  };

  const onSelectDateChange = (d: DateRange | undefined) => {
    setDate(d);
    onUpdateForm?.(d);
  };

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size="sm"
            variant="outline"
            className="flex items-center gap-2 min-w-[160px] rounded-lg"
          >
            <CalendarIcon size={18} />
            <span className="text-sm text-muted-foreground">{formatRange()}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="rounded-lg p-2 shadow-lg border bg-popover">
          <Calendar
            mode="range"
            initialFocus
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelectDateChange}
            locale={enUS}
            numberOfMonths={1}
            className="rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskCalendar;
