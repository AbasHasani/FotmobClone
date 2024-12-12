import React from "react";
import Event from "./Event";

const eventsToIgnore = [
  "PERIOD_MATCH_END",
  "PERIOD_HALF_TIME",
  "PERIOD_SECOND_HALF",
  "PERIOD_FIRST_HALF",
];

const Events = ({ data }: any) => {
  return (
    <ul className="rounded-sm flex flex-col my-3 overflow-hidden">
      {data.events.map(
        (event: any, i: number) =>
          !eventsToIgnore.includes(event.type) && (
            <li
              key={i}
              className={`grid odd:bg-slate-800/20 even:bg-slate-900/20 to-transparent min-h-[4rem] p-1 items-center overflow-hidden text-green-100 relative `}
              style={{
                gridTemplateColumns: "1fr auto 1fr",
              }}
            >
              {event.side == "TEAM_A" ? <Event event={event} /> : <div />}
              <div className="font-bold w-16 text-center">
                {event.period.minute}
                {event.period.extra > 0 && `+${event.period.extra}`}
              </div>
              {event.side == "TEAM_B" ? <Event event={event} /> : <div />}
            </li>
          )
      )}
    </ul>
  );
};

export default Events;
