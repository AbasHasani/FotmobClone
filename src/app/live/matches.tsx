"use client";
import { requestGraphql } from "@/lib/utils";
import React, { useState } from "react";
import { GET_MATCHES } from "./page";
import Image from "next/image";
import Match from "@/components/custom/match";

const Matches = () => {
  const [data, setdata] = useState<any>([]);
  const [count, setcount] = useState(12);
  const [filter, setFilter] = useState("all")
  const refetch = async () => {
    const updatedMatches = await requestGraphql(GET_MATCHES, {
      date: `2024-12-${count}`,
    });
    setdata(updatedMatches);
  };
  return (
    <div className="flex flex-col gap-2 col-span-3">
      <button onClick={refetch}>Refetch</button>
      {data.liveScore?.map((league, i: number) =>
        league?.matches?.filter((m) =>
          filter == "all" ? true : m.status === filter
        ).length == 0 ? null : (
          <div
            className="w-full border border-green-900  p-2"
            key={league?.competition.id}
          >
            <div className="flex gap-2 items-center bg-green-950/50 p-1 pl-5">
              <div className="bg-green-300 rounded-full">
                <Image
                  src={`https://www.goal.com${league?.competition.image.url}`}
                  width={50}
                  height={50}
                  // style={{
                  //   filter: "brightness(1.1) contrast(1.1) hue-rotate(40deg)",
                  // }}
                  alt="league.competition.id-icon"
                  className="w-7 h-7 object-cover rounded-full mix-blend-multiply"
                />
              </div>
              <h1 className="text-lg font-bold p-3 text-green-400">
                {league?.competition.name}
              </h1>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              {league?.matches
                ?.filter((m: any) =>
                  filter == "all" ? true : m.status === filter
                )
                .map((match) => (
                  //@ts-ignore
                  <Match key={match.id} {...match} />
                ))}
            </div>
          </div>
        )
      )}
      {/* <button onClick={() => refetch()}>Refetch</button> */}
    </div>
  );
};

export default Matches;
