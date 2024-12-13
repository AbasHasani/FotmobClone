"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useCalender } from "../providers/calender";
import { Abril_Fatface } from "next/font/google";
import { useRouter } from "next/navigation";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
const CustomCalendar = ({ noTitle }: { noTitle?: boolean }) => {
  const { changeDate, date: globalDate } = useCalender();
  const [date, setDate] = useState<Date | undefined>(
    globalDate ? new Date(globalDate) : new Date()
  );
  useEffect(() => {
    setDate(new Date(globalDate));
  }, [globalDate]);
  const router = useRouter();
  return (
    <div
      className={`${
        noTitle ? "flex" : "hidden md:flex"
      } col-span-2 flex-col justify-start items-start`}
    >
      <div className="sticky top-[4rem]">
        {!noTitle && (
          <h1 className={`my-2 font-bold text-3xl ${AbrilFatface.className}`}>
            Calendar
          </h1>
        )}
        <Calendar
          mode="single"
          selected={date}
          onSelect={(val) => {
            setDate(val);
            changeDate(val);
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
