"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const Rounds = ({
  data,
  id,
  round: currentRound,
}: {
  data: any;
  id: string;
  round?: string;
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const activeRoundRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (activeRoundRef.current && containerRef.current) {
      activeRoundRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
  }, []);
  return (
    <ScrollArea className="mb-3p">
      <ul ref={containerRef} className="flex gap-3 mb-3">
        {data.leagueMatches.leagueRoundMatches.map((round: any) => (
          <li
            className={`min-w-[10rem] grid place-content-center p-3 rounded-sm ${
              round.active
                ? "bg-green-800 scale-100 hover:scale-100"
                : "bg-slate-800/20 scale-90"
            } ${
              currentRound ? currentRound == round.gameSetTypeId ? "bg-green-400" : "" : ""
            } hover:scale-95 cursor-pointer transition-all`}
            key={round.gameSetTypeId}
            ref={currentRound ? currentRound == round.gameSetTypeId ? activeRoundRef : null : round.active ? activeRoundRef : null}
            onClick={() =>
              router.push(`/league/${id}/matches?round=${round.gameSetTypeId}`)
            }
          >
            {round.name}
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Rounds;
