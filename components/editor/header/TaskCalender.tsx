"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

const TaskCalendar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const formatRange = () => {
    if (!date?.from) return "Pick a Date";
    if (date.to) {
      return `${format(date.from, "dd LLL y", { locale: enUS })} → ${format(
        date.to,
        "dd LLL y",
        { locale: enUS }
      )}`;
    }
    return format(date.from, "dd LLL y", { locale: enUS });
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            size="sm"
            variant="outline"
            className="flex items-center gap-2 justify-start min-w-[160px] hover:bg-accent transition-all"
          >
            <CalendarIcon size={18} className="opacity-80" />
            <span className="text-sm text-muted-foreground">
              {formatRange()}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="rounded-lg p-2 shadow-md border bg-popover"
        >
          <Calendar
            mode="range"
            initialFocus
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
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
