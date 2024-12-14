"use client";
import { convertUTCToLocalTime, truncateAfterSpace } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Match = ({
  status,
  period,
  teamA,
  teamB,
  score,
  id,
  startDate,
  isImageAbsolute,
}: any) => {
  return (
    <Link
      href={`/match/${id}`}
      className="overflow-auto items-start odd:bg-slate-800/20 even:bg-slate-900/20 hover:bg-green-950/30  rounded-md flex md:grid md:items-center flex-col transition-all text-green-100 relative pl-14 md:p-4 gap-2 md:gap-0 py-2"
      style={{
        gridTemplateColumns: "1fr auto 1fr",
      }}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-3 text-green-400 text-sm">
        {status ? (
          status === "LIVE" ? (
            <span className="live-minute">
              {period?.type == "HALF_TIME" ? (
                "HT"
              ) : (
                <span>
                  {period?.minute +
                    (period?.extra ? "+" + period?.extra : null)}
                    &#39;
                </span>
              )}
            </span>
          ) : status === "RESULT" ? (
            "FT"
          ) : (
            convertUTCToLocalTime(startDate).toString()
          )
        ) : null}
      </div>
      <div className="flex flex-row-reverse md:flex-row justify-end gap-3 items-center overflow-auto">
        <p className="text-sm lg:text-base text-ellipsis whitespace-nowrap overflow-hidden">
          {teamA?.name}
        </p>
        <p
          className={`block md:hidden ${
            (score?.teamA || 0) > (score?.teamB || 0) ? "text-green-400" : ""
          }`}
        >
          {score?.teamA}
        </p>
        <Image
          src={
            isImageAbsolute
              ? teamA?.image.url || "no"
              : `https://www.goal.com${teamA?.image.url || ""}`
          }
          width={50}
          height={50}
          alt="home-icon"
          className="w-7 h-7"
        />
      </div>
      <div className="hidden md:flex text-center gap-1 md:gap-3 md:mx-4 mx-2">
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
      <div className="flex justify-start gap-3 items-center overflow-auto">
        <Image
          src={
            isImageAbsolute
              ? teamB?.image.url || "no"
              : `https://www.goal.com${teamB?.image?.url || ""}`
          }
          width={50}
          height={50}
          alt="away-icon"
          className="w-7 h-7"
        />
        <p
          className={`block md:hidden ${
            (score?.teamB || 0) > (score?.teamA || 0) && "text-green-400"
          }`}
        >
          {score?.teamB}
        </p>
        <p className="text-sm lg:text-base text-ellipsis whitespace-nowrap overflow-hidden">
          {teamB?.name}
        </p>
      </div>
    </Link>
  );
};

export default Match;
