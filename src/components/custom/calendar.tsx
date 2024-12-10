"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useCalender } from "../providers/calender";

const CustomCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { changeDate } = useCalender();
  return (
    <div className="col-span-2 flex flex-col justify-start items-start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(val) => {
          changeDate(val);
          setDate(val);
        }}
        className="border sticky top-6"
        classNames={{
          cell: "p-2",
          head_cell: "text-muted-foreground rounded-md w-12 font-normal text-[0.8rem]"
        }}
      />
    </div>
  );
};

export default CustomCalendar;
