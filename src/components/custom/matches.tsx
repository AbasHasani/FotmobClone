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

const pollInterval = 1000 * 60;
export default function MatchesPage() {
  const [filter, setFilter] = useState("all");
  const { date } = useCalender();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [changeLoading, setChangeLoading] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const changeFilter = (val: string) => {
    setFilter(val);
  };
  // const { loading, data, error, refetch } = useGetLiveScoresQuery({
  //   variables: { date },
  //   pollInterval,
  // });
  // if (loading && !data) {
  //   return (
  //     <>
  //     {/* Loading */}
  //       <div className="col-span-3 flex justify-center pt-6">
  //         <Loader2 size={50} className="animate-spin" />
  //       </div>
  //     </>
  //   );
  // }
  // if (error) {
  //   return (
  //     <div className="col-span-3 flex flex-col pt-6">
  //       <span>Error: {error.message} </span>
  //       <span>Type of Error: {typeof error} </span>
  //       <button
  //         className="bg-fuchsia-700 rounded-md p-2"
  //         onClick={() => refetch()}
  //       >
  //         Refetch
  //       </button>
  //     </div>
  //   );
  // }
  // if (!data) {
  //   return (
  //     <div className="col-span-3 flex justify-center pt-6">
  //       <Loader2 size={50} className="animate-spin" />
  //     </div>
  //   );
  // }
  // if (!data.liveScore) {
  //   return (
  //     <div className="col-span-3 flex justify-center pt-6">
  //       <Loader2 size={50} className="animate-spin" />
  //     </div>
  //   );
  // }
  const getMatches = async () => {
    setError(false);
    setLoading(true);
    try {
      const matches = await requestGraphql(GET_MATCHES, { date });
      setData(matches);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    setChangeLoading(false);
  };
  useEffect(() => {
    setChangeLoading(true);
    getMatches();
    const matchesUpdater = setInterval(() => {
      getMatches();
    }, pollInterval);
    return () => clearInterval(matchesUpdater);
  }, [date]);
  // useEffect(() => {
  //   getMatches();
  // }, [date]);
  // if (loading && data?.length == 0) {
  //   return (
  //     <div className="col-span-3">
  //       Loading... <Loader2 className="animate-spin" />
  //     </div>
  //   );
  // }
  // if (error && data?.length > 0) {
  //   return (
  //     <div className="col-span-3">
  //       <p>Error</p>
  //       <button className="p-3 bg-cyan-800 text-white" onClick={getMatches}>
  //         Refetch
  //       </button>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col gap-2 col-span-3">
      {data.length == 0 ? "Yes" : "No"}
      <AnimatedBacground changeFilter={changeFilter} />
      {changeLoading && (
        <div className="col-span-3 w-full flex items-start justify-center">
          <div className="flex items-center gap-3 p-3 border rounded-sm  justify-center">
            <p className="text-green-50">Loading...</p>
            <Loader2 className="animate-spin text-green-800" />
          </div>
        </div>
      )}
      {loading && data.length == 0 && !changeLoading && (
        <div className="col-span-3 w-full flex items-start justify-center">
          <div className="flex items-center gap-3 p-3 border rounded-sm  justify-center">
            <p className="text-green-50">Loading...</p>
            <Loader2 className="animate-spin text-green-800" />
          </div>
        </div>
      )}
      {error && data.length == 0 && (
        <div className="col-span-3">
          <p>Error</p>
          <button className="p-3 bg-cyan-800 text-white" onClick={getMatches}>
            Refetch
          </button>
        </div>
      )}
      {!changeLoading &&
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
