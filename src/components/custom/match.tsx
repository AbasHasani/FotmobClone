"use client";
import { convertUTCToLocalTime, truncateAfterSpace } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Match = ({ status, period, teamA, teamB, score, id, startDate }: any) => {
  // const date = new Date(startTimestamp * 1000);
  // const readable = date.toLocaleDateString("en-US", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  // });
  if (teamA?.name == "Sibenic") {
    console.log(teamA);
  }
  return (
    <Link
      href={`/match/${id}`}
      className="grid text-center items-center bg-green-950/10 hover:bg-green-950/30 h-14 rounded-md transition-all text-green-100 relative"
      style={{
        gridTemplateColumns: "1fr auto 1fr",
      }}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-3 text-green-400 text-sm">
        {status === "LIVE" ? (
          <span className="live-minute">{period?.minute}{period?.extra}&apos; </span>
        ) : status === "RESULT" ? (
          "FT"
        ) : (
          convertUTCToLocalTime(startDate).toString()
        )}
      </div>
      <div className="flex justify-end gap-3 items-center">
        <p className="text-xs lg:text-base">
          {truncateAfterSpace(teamA?.name || "", 16)}
        </p>
        <Image
          src={`https://www.goal.com${teamA?.image.url || ""}`}
          width={50}
          height={50}
          alt="home-icon"
          className="w-7 h-7"
        />
      </div>
      <div className="text-center flex gap-1 md:gap-3 md:mx-4 mx-2">
        <p
          className={`${
            (score?.teamA || 0) > (score?.teamB || 0) ? "text-green-400" : ""
          }`}
        >
          {score?.teamA}
        </p>
        <span>-</span>
        <p
          className={`${
            (score?.teamB || 0) > (score?.teamA || 0) && "text-green-400"
          }`}
        >
          {score?.teamB}
        </p>
      </div>
      <div className="flex justify-start gap-3 items-center">
        <Image
          src={`https://www.goal.com${teamB?.image?.url || ""}`}
          width={50}
          height={50}
          alt="away-icon"
          className="w-7 h-7"
        />
        <p className="text-xs lg:text-base">
          {truncateAfterSpace(teamB?.name || "", 20)}
        </p>
      </div>
    </Link>
  );
};

export default Match;
