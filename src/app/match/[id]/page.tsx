import Events from "@/components/custom/events";
import Card from "@/components/custom/events/Card";
import Goal from "@/components/custom/events/Goal";
import Substitution from "@/components/custom/events/Substitution";
import Lineup from "@/components/custom/Lineup";
import { MatchDetails, Match } from "@/generated/graphql";
import {
  baseGoalImageUrl,
  convertUTCToLocalTime,
  requestGraphql,
} from "@/lib/utils";
import { gql } from "@apollo/client";
import { print } from "graphql";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface props {
  params: Promise<{
    id: string;
  }>;
}

const GET_MATCH = gql`
  query Query($id: String!) {
    match(id: $id) {
      status
      period
      startDate
      score {
        teamA
        teamB
      }
      scorers {
        teamA {
          player {
            name
          }
          events {
            type
            period {
              minute
            }
          }
        }
        teamB {
          player {
            name
          }
          events {
            type
            period {
              minute
            }
          }
        }
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
      events {
        type
        player {
          name
          id
        }
        in {
          name
        }
        assist {
          name
        }
        out {
          name
        }
        score {
          teamA
          teamB
        }
        scorer {
          name
        }
        period {
          minute
          extra
        }
        side
      }
      lineups {
        confirmed
        teamA {
          formation
          manager {
            name
            id
          }
          lineup {
            shirtNumber
            pitchPosition {
              x
              y
            }
            person {
              name
              id
            }
            events {
              type
              player {
                name
                id
              }
              in {
                name
              }
              assist {
                name
              }
              out {
                name
              }
              score {
                teamA
                teamB
              }
              scorer {
                name
              }
              period {
                minute
                extra
              }
              side
            }
          }
        }
        teamB {
          formation
          manager {
            name
            id
          }
          lineup {
            shirtNumber
            pitchPosition {
              x
              y
            }
            person {
              name
              id
            }
            events {
              type
              player {
                name
                id
              }
              in {
                name
              }
              assist {
                name
              }
              out {
                name
              }
              score {
                teamA
                teamB
              }
              scorer {
                name
              }
              period {
                minute
                extra
              }
              side
            }
          }
        }
      }
    }
  }
`;

const Page: FC<props> = async ({ params }) => {
  const { id } = await params;
  const query = print(GET_MATCH);
  const variables = { id };
  const res: any = await requestGraphql(query, variables);
  if (!res) return "Error";
  const data = res.data.match;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between md:justify-around m-3 items-center">
        <div className="flex flex-col gap-3 items-center">
          <Link
            href={"/team/" + data.teamA?.id}
            className="border p-5 grid place-items-center rounded-full"
          >
            <Image
              src={baseGoalImageUrl + (data.teamA?.image?.url || "")}
              width={200}
              height={300}
              alt="team-a-image"
              className="w-[5rem]"
            />
          </Link>
          <p className="text-sm font-light text-green-200">
            {data.teamA?.name}
          </p>
        </div>
        <div>
          {data.score && (
            <div className="flex text-4xl">
              <p
                className={`${
                  (data.score?.teamA || 0) > (data.score?.teamB || 0) &&
                  "text-green-400"
                }`}
              >
                {data.score?.teamA}
              </p>
              <p className="mx-2">-</p>
              <p
                className={`${
                  (data.score?.teamB || 0) > (data.score?.teamA || 0) &&
                  "text-green-400"
                }`}
              >
                {data.score?.teamB}
              </p>
            </div>
          )}
          <p className="text-center">
            {/* @ts-ignore */}
            {data.status === "LIVE" ? (
              // @ts-ignore
              <span className="live-minute">{period}'</span>
            ) : // @ts-ignore
            data.status === "RESULT" ? (
              "FT"
            ) : (
              convertUTCToLocalTime(data.startDate).toString()
            )}
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Link
            href={"/team/" + data.teamB?.id}
            className="border p-5 grid place-items-center rounded-full"
          >
            <Image
              src={baseGoalImageUrl + (data.teamB?.image?.url || "")}
              width={200}
              height={300}
              alt="team-a-image"
              className="w-[5rem]"
            />
          </Link>
          <p className="text-sm font-light text-green-200">
            {data.teamB?.name}
          </p>
        </div>
      </div>
      <div className="flex justify-between md:justify-around m-3">
        <div className="flex flex-col md:flex-row md:items-center">
          {data.scorers.teamA.map((player: any) => (
            <div
              key={player.player.name}
              className="flex bg-green-950/20 p-3 border-r border-green-900/40 items-center"
            >
              {player?.events.map((event: any) => (
                <p
                  key={event.period.minute + event.type}
                  className="w-8 h-8 bg-green-900/40 rounded-full grid place-items-center mr-2"
                >
                  {event.period.minute}'
                </p>
              ))}
              <p>{player.player.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center">
          {data.scorers.teamB.map((player: any) => (
            <div
              key={player.player.name}
              className="flex bg-green-950/20 p-3 border-b md:border-r md:border-b-0 border-green-900/40 items-center"
            >
              {player?.events.map((event: any) => (
                <p
                  key={event.period.minute + event.type}
                  className="w-8 h-8 bg-green-900/40 rounded-full grid place-items-center mr-2"
                >
                  {event.period.minute}'
                </p>
              ))}
              <p>{player.player.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Events data={data} />
      <Lineup data={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
