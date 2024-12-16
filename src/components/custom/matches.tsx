"use client";
import {
  convertUTCToLocalTime,
  requestGraphql,
  truncateAfterSpace,
} from "@/lib/utils";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Match from "./match";
import { useCalender } from "../providers/calender";
import { useGetLiveScoresQuery } from "@/generated/graphql";
import { Loader2 } from "lucide-react";
import AnimatedBacground from "./motion-ui/AnimatedBacground";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import request from "graphql-request";
import useSWR from "swr";

const GET_MATCHES = `
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
          type
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
const fetcher = ([query, vars]: any) =>
  request({
    url: "https://fotmob-uvwm.onrender.com/graphql",
    document: query,
    variables: vars,
  });

const refreshInterval = 1000 * 60;
export default function MatchesPage({ matches }: any) {
  const { date } = useCalender();
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR<any>([GET_MATCHES, { date }], fetcher, {
    refreshInterval,
  });
  const [filter, setFilter] = useState("all");
  // return <pre>{JSON.stringify(data, null, 2)}</pre>
  // if (loading) return null;
  if (error && data?.length == 0) {
    return (
      <div className="col-span-3">
        <p>Error</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 col-span-3">
      <AnimatedBacground changeFilter={(val) => setFilter(val)} />
      {loading && (
        <div className="col-span-3 w-full flex items-start justify-center">
          <div className="flex items-center gap-3 p-3 border rounded-sm  justify-center">
            <p className="text-green-50">Loading...</p>
            <Loader2 className="animate-spin text-green-800" />
          </div>
        </div>
      )}
      {!loading &&
        data.liveScore?.map((league: any, i: number) =>
          league?.matches?.filter((m: any) =>
            filter == "all" ? true : m.status === filter
          ).length == 0 ? null : (
            <div
              className="w-full border border-green-900  p-2"
              key={league?.competition.id}
            >
              <Link
                className="flex gap-2 items-center bg-green-950/50 p-1 pl-5"
                href={`/league/${league.competition.id}`}
              >
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
              </Link>
              <div className="flex flex-col gap-1 mt-2">
                {league?.matches
                  ?.filter((m: any) =>
                    filter == "all" ? true : m.status === filter
                  )
                  .map((match: any) => (
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
