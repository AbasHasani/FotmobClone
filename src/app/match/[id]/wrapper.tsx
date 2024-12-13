"use client";
import Events from "@/components/custom/events";
import Form from "@/components/custom/Form";
import GeneralMatchInfo from "@/components/custom/GeneralMatchInfo";
import Lineup from "@/components/custom/Lineup";
import MatchStats from "@/components/custom/MatchStats";
import React, { useState } from "react";

const fields = [
  { label: "General", value: "general" },
  { label: "Events", value: "events" },
  { label: "Lineup", value: "lineup" },
  { label: "Stats", value: "stats" },
  { label: "Form", value: "form" },
];

const Wrapper = ({ data }: any) => {
  const [currentField, setCurrentField] = useState("events");
  return (
    <div>
      <ul className="flex gap-2 m-5 my-0 overflow-x-auto">
        {fields.map((field) => (
          <li
            className={`p-2 ${
              currentField == field.value
                ? "bg-green-800"
                : "bg-gray-800/50 scale-90"
            } rounded-sm cursor-pointer transition-all hover:scale-95`}
            key={field.value}
            onClick={() => setCurrentField(field.value)}
          >
            {field.label}
          </li>
        ))}
      </ul>
      <div>
        {data?.events.length > 0 && currentField == "events" && (
          <Events data={data} />
        )}
        {data?.lineups?.teamA.formation && currentField == "lineup" && (
          <Lineup data={data} />
        )}
        {currentField == "general" && <GeneralMatchInfo data={data} />}
        {data?.stats && currentField == "stats" && <MatchStats data={data} />}
        {data?.form && currentField == "form" && <Form data={data} />}
      </div>
    </div>
  );
};

export default Wrapper;
