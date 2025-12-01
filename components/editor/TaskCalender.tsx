"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSaveTaskState } from "@/context/TaskSavingContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useDebounce, useDebouncedCallback } from "use-debounce";

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

  const {status , onSetStatus} = useSaveTaskState();

  const { mutate: updateTaskDate } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/task/update/date", {
        workspaceId,
        taskId,
        date,
      });
    },
    onSuccess : () => {
      onSetStatus("saved")
    },
    onError : () => {
      onSetStatus("unsaved")
    }
  });

  const debounded = useDebouncedCallback(() => {
      onSetStatus("pending")
      updateTaskDate()
  },2000)
  

  const onSelectDateChange = (d: DateRange | undefined) => {
    if(status === "unsaved") return onSetStatus("unsaved")
    setDate(d);
    onUpdateForm?.(d);
    debounded()
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
