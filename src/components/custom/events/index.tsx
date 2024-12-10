import React from "react";
import Substitution from "./Substitution";
import Goal from "./Goal";
import Card from "./Card";

const Events = ({ data }: any) => {
  return (
    <div className="md:mx-[10rem] m-3">
      {data.events.map(
        (event: any, i: number) =>
          event.type != "PERIOD_MATCH_END" &&
          event.type != "PERIOD_HALF_TIME" &&
          event.type != "PERIOD_SECOND_HALF" &&
          event.type != "PERIOD_FIRST_HALF" && (
            <div key={i} className="flex flex-col justify-around">
              <div
                className={`flex from-green-950/40 to-transparent to-50% ${
                  event.side == "TEAM_B"
                    ? "justify-end text-right bg-gradient-to-l"
                    : "bg-gradient-to-r"
                } bg-green-950/10 p-3 border border-green-900/40 relative`}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-700">
                  {event.period.minute}
                  {event.period.extra > 0 && `+${event.period.extra}`}
                </div>
                {event.type == "SUBSTITUTION" ? (
                  <Substitution
                    in={event.in}
                    out={event.out}
                    homeSide={event.side != "TEAM_B"}
                  />
                ) : event.type == "GOAL" || event.type == "GOAL_PENALTY" ? (
                  <Goal
                    scorer={event.scorer}
                    assist={event.assist}
                    homeSide={event.side != "TEAM_B"}
                    penalty={event.type == "GOAL_PENALTY"}
                  />
                ) : event.type == "CARD_YELLOW" || event.type == "CARD_RED" ? (
                  <Card
                    player={event.player}
                    homeSide={event.side != "TEAM_B"}
                    red={event.type == "CARD_RED"}
                  />
                ) : (
                  event.type
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Events;
