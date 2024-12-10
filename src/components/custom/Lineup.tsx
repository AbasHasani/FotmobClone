"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
const groupPlayers = ({
  formation,
  players,
}: {
  formation: string;
  players: any;
}) => {
  // Parse the formation into an array of rows
  const rows = formation.split("").map(Number);

  // Group players into rows based on the formation
  const groupedPlayers: any = [];
  let playerIndex = 1;
  groupedPlayers.push(players.slice(0, 1));
  players.sort(
    (playerA: any, playerB: any) =>
      playerA.pitchPosition.y - playerB.pitchPosition.y
  );
  rows.forEach((count: number) => {
    groupedPlayers.push(players.slice(playerIndex, playerIndex + count));
    playerIndex += count;
  });
  return groupedPlayers;
};

const Lineup = ({ data }: any) => {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const groupedPlayers = groupPlayers({
    formation: data.lineups[selectedTeam == 0 ? "teamA" : "teamB"].formation,
    players: data.lineups[selectedTeam == 0 ? "teamA" : "teamB"]?.lineup,
  });
  const groupedPlayers1 = groupPlayers({
    formation: data.lineups[selectedTeam == 1 ? "teamA" : "teamB"].formation,
    players: data.lineups[selectedTeam == 1 ? "teamA" : "teamB"]?.lineup,
  });
  const lineupContainer = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  useEffect(() => {
    if (lineupContainer) {
      const Width = lineupContainer.current?.offsetWidth || 0;
      const Height = lineupContainer.current?.offsetHeight || 0;
      setContainerWidth(Width);
      setContainerHeight(Height);
    }
  }, []);
  return (
    <div className="border m-5 rounded-md overflow-hidden">
      {!data.confirmed && <h1 className="font-bold text-xl p-3 text-center">This is probable lineup!</h1>}
      <ul className="flex w-full">
        <li
          className={`p-2 flex-1 text-center cursor-pointer rounded-br-xl md:pointer-events-none transition-all ${
            selectedTeam == 0 ? "bg-green-800 md:bg-transparent " : ""
          }`}
          onClick={() => setSelectedTeam(() => 0)}
        >
          {data.teamA.name}
        </li>
        <li
          className={`p-2 flex-1 cursor-pointer text-center rounded-bl-xl md:pointer-events-none transition-all ${
            selectedTeam == 1 ? "bg-green-800 md:bg-transparent " : ""
          }`}
          onClick={() => setSelectedTeam(() => 1)}
        >
          {data.teamB.name}
        </li>
      </ul>
      <div className="flex gap-3 items-center my-3">
        <div
          className="flex justify-between items-center gap-3  w-full"
          suppressHydrationWarning
        >
          <div className="min-h-[30rem] flex-1 flex flex-col md:flex-row items-center justify-around gap-3 md:gap-0">
            {groupedPlayers.map((line: any) => (
              <div
                className="flex md:flex-col-reverse gap-6"
                key={Math.random()}
              >
                {line
                  .sort(
                    (playerA: any, playerB: any) =>
                      playerA.pitchPosition.x - playerB.pitchPosition.x
                  )
                  .map((player: any) => (
                    <div
                      key={player.person.id}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-10 md:w-20 md:h-20 h-10 rounded-full border md:text-4xl border-green-950/50 transition-all grid place-content-center
                          ${
                            selectedTeam == 0
                              ? "bg-slate-900 text-green-300"
                              : "bg-slate-800/20 text-green-100/60"
                          }
                          
                        `}
                      >
                        {/* <Image src={player.person.image} /> */}
                        {player.shirtNumber}
                      </div>
                      <p className="text-xs md:text-base text-green-100">
                        {player.person.name}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <div className="flex-1 hidden md:flex flex-row-reverse items-center justify-around">
            {groupedPlayers1.map((line: any, index: any) => (
              <div className="flex flex-col gap-6" key={Math.random()}>
                {line
                  .sort(
                    (playerA: any, playerB: any) =>
                      playerA.pitchPosition.x - playerB.pitchPosition.x
                  )
                  .map((player: any) => (
                    <div
                      key={player.person.id}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-20 h-20 rounded-full md:text-4xl border border-green-950/50 transition-all grid place-content-center ${
                          selectedTeam == 1
                            ? "bg-slate-900 text-green-300"
                            : "bg-slate-800/20 text-green-100/60"
                        }`}
                      >
                        {player.shirtNumber}
                      </div>
                      <p className="text-xs md:text-base text-green-100">
                        {player.person.name}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
          {/* {data.lineups.teamA.lineup.map((player: any) => (
            <div
              key={player.person.id}
              className={`flex items-center gap-2 justify-center absolute bg-slate-900 w-11 h-11`}
              style={{
                left: (player.pitchPosition.x * containerWidth) / 100,
                top: (player.pitchPosition.y * containerHeight) / 100,
              }}
            >
              <div className="w-10 h-10 rounded-full border grid place-content-center">
                {player.shirtNumber}
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Lineup;
