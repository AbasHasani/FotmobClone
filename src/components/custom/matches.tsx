"use client";

import { convertUTCToLocalTime, truncateAfterSpace } from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Match from "./match";
import { Calender, useCalender } from "../providers/calender";
import { useGetLiveScoresQuery } from "@/generated/graphql";
import { Loader2 } from "lucide-react";
import AnimatedBacground from "./motion-ui/AnimatedBacground";

const GET_MATCHES = gql`
  query GetLiveScores($date: String!) {
    liveScore(date: $date) {
      competition {
        name
        id
        image {
          url
        }
      }
      matches {
        status
        id
        startDate
        period {
          minute
          extra
        }
        teamA {
          name
          id
          image {
            url
          }
        }
        teamB {
          name
          id
          image {
            url
          }
        }
        score {
          teamA
          teamB
        }
      }
    }
  }
`;

const pollInterval = 1000 * 60;
export default function MatchesPage() {
  const { date } = useCalender();
  const { loading, data, error, refetch } = useGetLiveScoresQuery({
    variables: { date },
    pollInterval,
  });
  const [filter, setFilter] = useState("all");
  const changeFilter = (val: string) => {
    setFilter(val)
  }
  if (loading && !data) {
    return (
      <>
      {/* Loading */}
        <div className="col-span-3 flex justify-center pt-6">
          <Loader2 size={50} className="animate-spin" />
        </div>
      </>
    );
  }
  if (error) {
    return (
      <div className="col-span-3 flex flex-col pt-6">
        <span>Error: {error.message} </span>
        <span>Type of Error: {typeof error} </span>
        <button
          className="bg-fuchsia-700 rounded-md p-2"
          onClick={() => refetch()}
        >
          Refetch
        </button>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="col-span-3 flex justify-center pt-6">
        <Loader2 size={50} className="animate-spin" />
      </div>
    );
  }
  if (!data.liveScore) {
    return (
      <div className="col-span-3 flex justify-center pt-6">
        <Loader2 size={50} className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 col-span-3">
      <AnimatedBacground changeFilter={changeFilter} />
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
}
