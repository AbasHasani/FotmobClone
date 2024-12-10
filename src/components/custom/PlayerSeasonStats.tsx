"use client";
import { PlayerStats } from "@/generated/graphql";
import { baseGoalImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Combobox } from "./Combobox";

const PlayerSeasonStats = ({ stats }: any) => {
  const [competetion, setCompetition] = useState({
    name: stats[0].competition?.name || "",
    season: stats[0].season?.name || "",
  });
  const stat = stats.filter(
    (s:any) =>
      s.competition?.name == competetion.name &&
      s.season?.name == competetion.season
  )[0];
  return (
    <div>
      <div className="my-5">
        <Combobox
          items={stats.map((s:any) => ({
            label: s.competition?.name + " " + s.season?.name,
            value: s.competition?.name + "-" + s.season?.name,
          }))}
          onChange={(value: string) => {
            setCompetition({
              name: value.split("-")[0],
              season: value.split("-")[1],
            });
            console.log(value.split(" ")[0]);
            console.log(value.split(" ")[1]);
          }}
        />
      </div>
      {competetion.name && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-3">Field</th>
              <th className="text-left py-3">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stat?.stats || {}).map((key) => (
              <tr className="odd:bg-slate-800/20" key={key}>
                <td className="p-5">{key}</td>
                {/* @ts-ignore */}
                <td className="pl-6">{stat?.stats?.[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlayerSeasonStats;
