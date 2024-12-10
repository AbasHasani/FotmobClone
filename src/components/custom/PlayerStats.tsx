import { Player, PlayerDetails } from "@/generated/graphql";
import Image from "next/image";
import React from "react";
import PlayerSeasonStats from "./PlayerSeasonStats";
import { Combobox } from "./Combobox";

const PlayerStats = ({ data }: { data: PlayerDetails }) => {
  return (
    <div className="mt-3">
      <div className="bg-slate-700/50 p-3">
        <ul className="">
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              First Name:
            </span>
            <span>{data.firstName}</span>
          </li>
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              Last Name:
            </span>
            <span>{data.lastName}</span>
          </li>
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              Date of birth:
            </span>
            <span>
              {new Date(data.dateOfBirth).toString().substring(0, 15)} (
              {data.age} years old)
            </span>
          </li>
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              Nationality:
            </span>
            <span>{data.nationality?.name}</span>
          </li>
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              Team:
            </span>
            <span>{data.team?.name}</span>
          </li>
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              Position:
            </span>
            <span className="capitalize">{data.position?.toLowerCase()}</span>
          </li>
          <li>
            <span className="font-extralight text-sm text-gray-500 mr-3">
              Shirt number (club):
            </span>
            <span>{data.shirtNumber}</span>
          </li>
        </ul>
      </div>
      <div>
        <PlayerSeasonStats stats={data.stats} />
      </div>
    </div>
  );
};

export default PlayerStats;
