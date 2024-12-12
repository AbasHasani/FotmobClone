"use client";
import Match from "@/components/custom/match";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

const TeamMatches = ({ data }: any) => {
  const lastMatch = useRef<HTMLDivElement>(null);
  const lastMatchId = data.data.teamMatches.filter(
    (s: any) => s.status === "FIXTURE"
  )[0].id;
  return (
    <div>
      <Button
        onClick={() => {
          lastMatch?.current?.scrollIntoView({ behavior: "smooth" });
          console.log(lastMatch?.current);
        }}
        className="bg-green-950/40 text-white hover:bg-green-950/70 my-2"
      >
        Go to next Match
      </Button>
      {data.data.teamMatches.map((match: any, index: number) => {

        return (
          <div
            key={match.id}
            ref={match.id == lastMatchId ? lastMatch : null}
          >
            <Match {...match} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamMatches;
