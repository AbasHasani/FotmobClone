"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useCalender } from "../providers/calender";
import { Abril_Fatface } from "next/font/google";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
const CustomCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { changeDate } = useCalender();
  return (
    <div className="hidden md:flex col-span-2 flex-col justify-start items-start sticky top-[4.32rem]">
      <div className="sticky top-[4.32rem]">
        <h1 className={`my-2 font-bold text-3xl ${AbrilFatface.className}`}>
          Calendar
        </h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(val) => {
            changeDate(val);
            setDate(val);
          }}
          className="border"
          classNames={{
            cell: "p-2",
            head_cell:
              "text-muted-foreground rounded-md w-12 font-normal text-[0.8rem]",
          }}
        />
      </div>
    </div>
  );
};

export default CustomCalendar;
