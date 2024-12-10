"use client";
import { AbrilFatface } from "@/app/team/[id]/layout";
import AnimatedBackground from "@/components/ui/animated-background";
import {
  CalendarFold,
  CheckCheck,
  Columns3,
  Home,
  PhoneCall,
  Radio,
  Settings,
  User,
} from "lucide-react";
import React from "react";

const AnimatedBacground = ({
  changeFilter,
}: {
  changeFilter: (val: string) => void;
}) => {
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
  return (
    <div className="flex flex-col items-center my-3">
      <h1 className={`font-bold text-3xl ${AbrilFatface.className}`}>
        Matches
      </h1>
      <div className="mt-6 mb-2">
        <AnimatedBackground
          defaultValue={TABS[3].value}
          className="rounded-sm bg-green-100"
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
              className="inline-flex text-zinc-500 items-center transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950"
            >
              <span className="flex gap-2 items-center p-3 justify-center">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
};

export default AnimatedBacground;
