"use client";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCalender } from "@/components/providers/calender";
import AnimatedBackground from "@/components/ui/animated-background";
import { getAdjacentDates } from "@/lib/utils";
import { CalendarFold, CheckCheck, Columns3, Radio } from "lucide-react";
import { Abril_Fatface } from "next/font/google";
import React from "react";
import { IconLeft, IconRight } from "react-day-picker";
import Calender from "../calendar";

const AnimatedBacground = ({
  changeFilter,
}: {
  changeFilter: (val: string) => void;
}) => {
  const date = useCalender();
  const TABS = [
    {
      label: "Live",
      value: "LIVE",
      icon: <Radio className="h-5 w-5" />,
    },
    {
      label: "Completed",
      value: "RESULT",
      icon: <CheckCheck className="h-5 w-5" />,
    },
    {
      label: "Upcoming",
      value: "FIXTURE",

      icon: <CalendarFold className="h-5 w-5" />,
    },
    {
      label: "All",
      value: "all",
      icon: <Columns3 className="h-5 w-5" />,
    },
  ];

  const handleDateChange = (tomorrow: boolean) => {
    const dates: any = getAdjacentDates(date.date);
    let newDate: any;
    if (tomorrow) {
      newDate = dates.tomorrow;
    } else {
      newDate = dates.yesterday;
    }
    date.changeDate(newDate);
    console.log(newDate);
  };
  return (
    <div className="flex flex-col items-center md:my-3">
      <div className="flex items-center justify-between w-full px-2 md:px-0 md:flex-col">
        <h1 className={`md:font-bold md:text-3xl ${AbrilFatface.className}`}>
          Matches
        </h1>
        <div className="mt-6 mb-2 rounded-sm bg-slate-950 p-3">
          <AnimatedBackground
            defaultValue={TABS[3].value}
            className="rounded-sm bg-green-300"
            onValueChange={(val) => {
              if (val) {
                changeFilter(val);
              }
            }}
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.label}
                data-id={tab.value}
                type="button"
                className={`md:inline-flex text-zinc-500 items-center transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950 ${
                  tab.value == "RESULT" || tab.value == "FIXTURE"
                    ? "hidden"
                    : "inline-flex"
                } text-sm md:text-base`}
              >
                <span className="flex gap-2 items-center p-1 px-3 justify-center">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </AnimatedBackground>
        </div>
      </div>
      <div className="flex justify-between items-center  w-full my-3">
        <button className="hover:bg-green-800/20 rounded-xl p-2 hover:text-green-200" onClick={() => handleDateChange(false)}>
          <IconLeft />
        </button>
        <Popover>
          <PopoverTrigger>
            <p className="p-2 bg-slate-950/20 rounded-sm w-[8rem] grid place-content-center">{date.date}</p>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calender noTitle />
          </PopoverContent>
        </Popover>
        <button className="hover:bg-green-800/20 rounded-xl p-2 hover:text-green-200" onClick={() => handleDateChange(true)}>
          <IconRight className="" />
        </button>
      </div>
    </div>
  );
};

export default AnimatedBacground;
