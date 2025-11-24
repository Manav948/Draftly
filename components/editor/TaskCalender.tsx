"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDebounce } from "use-debounce";

interface Props {
  onUpdateForm?: (e: DateRange | undefined) => void;
  className?: string;
  from: Date | undefined;
  to: Date | undefined;
  workspaceId: string;
  taskId: string;
}

const TaskCalendar = ({ className, onUpdateForm, from, to, workspaceId, taskId }: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  });

  const [debouncedDate] = useDebounce(date, 2000);

  const { mutate: updateTaskDate } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/task/update/date", {
        workspaceId,
        taskId,
        date: debouncedDate,
      });
    },
  });

  useEffect(() => {
    if (!debouncedDate) return;
    updateTaskDate();
  }, [debouncedDate]);

  const onSelectDateChange = (d: DateRange | undefined) => {
    setDate(d);
    onUpdateForm?.(d);
  };

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarIcon size={16} className="mr-2" />
            {date?.from
              ? date?.to
                ? `${format(date.from, "dd LLL yyyy", { locale: enUS })} → ${format(date.to, "dd LLL yyyy", { locale: enUS })}`
                : format(date.from, "dd LLL yyyy", { locale: enUS })
              : "Pick a date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={onSelectDateChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskCalendar;
