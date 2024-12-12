import { analyzeNumbers } from "@/lib/utils";
import React, { useMemo } from "react";

const MatchStats = ({ data }: { data: any }) => {
  const allStats: any = [];
  const keys = Object.keys(data?.stats || {});
  const flattedStats = useMemo(() => {
    keys.forEach((key) => {
      allStats.push(data?.stats[key]);
    });
    return allStats.flat();
  }, [data]);
  return (
    <ul className="rounded-sm flex flex-col my-3 overflow-hidden">
      {flattedStats?.map(
        ({
          teamA,
          teamB,
          type,
        }: {
          teamA: number;
          teamB: number;
          type: string;
        }) => {
          const { firstNumber, secondNumber } = analyzeNumbers(teamA, teamB);
          return (
            <li
              key={type}
              className="grid odd:bg-slate-800/20 even:bg-slate-900/20 p-3 text-green-100"
              style={{
                gridTemplateColumns: "auto 1fr auto",
              }}
            >
              <p className="w-6">{teamA}</p>
              <div className="capitalize flex justify-center">
                <div className="flex-1 flex justify-end items-center">
                  <div
                    style={{ width: `${firstNumber}%` }}
                    className={`${
                      teamA > teamB ? "bg-green-300/90" : "bg-green-300/40"
                    } rounded h-[0.2rem]`}
                  />
                </div>
                <p className="w-[10rem] text-center">
                  {type?.toLocaleLowerCase().replaceAll("_", " ")}
                </p>
                <div className="flex-1 flex items-center">
                  <div
                    style={{ width: `${secondNumber}%` }}
                    className={`${
                      teamA < teamB ? "bg-green-300/90" : "bg-green-300/40"
                    } rounded h-[0.2rem]`}
                  />
                </div>
              </div>
              <p className="flex w-6 justify-end">{teamB}</p>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default MatchStats;
