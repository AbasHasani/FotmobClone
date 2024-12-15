import React, { useMemo } from "react";
import Substitution from "./Substitution";
import Goal from "./Goal";
import Card from "./Card";
import { ArrowUpDown, IdCard, LoaderPinwheel } from "lucide-react";

const Event = ({ event }: { event: any }) => {
  const cards = ["CARD_YELLOW", "CARD_RED"];
  const goals = ["GOAL", "GOAL_PENALTY"];

  const isCard = cards.includes(event.type);
  const isGoal = goals.includes(event.type);

  const player = isCard
    ? event.player.name
    : isGoal
    ? event.scorer?.name
    : event.in?.name;

  const eventContribute = isCard
    ? event.type == "CARD_RED"
      ? "Red"
      : "Yellow"
    : isGoal
    ? event.assist?.name
    : event.out?.name;

  const Icon = isCard ? (
    <IdCard />
  ) : isGoal ? (
    <LoaderPinwheel />
  ) : (
    <ArrowUpDown />
  );

  return (
    <div
      className={`inline-flex items-center ${
        event.side == "TEAM_A" ? "justify-end" : ""
      }`}
    >
      <div>
        <div
          className={`flex items-center gap-3 ${
            event.side == "TEAM_A" ? "flex-row-reverse" : ""
          }`}
        >
          <span>{Icon}</span>
          <div
            className={`${
              event.side == "TEAM_A" ? "flex flex-col items-end" : ""
            }`}
          >
            <p className="font-bold text-lg">{player}</p>
            <p className="font-light text-sm text-green-400/40">
              {eventContribute}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
