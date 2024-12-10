import { baseGoalImageUrl, fetchGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { AbrilFatface } from "../layout";

const GET_TEAM_STANDIGS = gql`
  query Team($id: String!) {
    teamStandings(id: $id) {
      competition {
        name
        id
      }
      table {
        live
        name
        rankings {
          team {
            name
            id
            image {
              url
            }
          }
          position
          points
          goalsAgainst
          goalsFor
          goalsDifference
          form {
            wdl
          }
          win
          draw
          lose
        }
      }
    }
  }
`;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchGraphql(GET_TEAM_STANDIGS, { id });
  if (!data) return <p>No Data!</p>;
  if (!data.data.teamStandings) return <p>{JSON.stringify(data)}</p>;
  return (
    <div className="">
      <div>
        {data.data.teamStandings.map((standing: any) => (
          <div key={standing.competition.id} className="mb-14">
            <h1
              className={`capitalize my-6 font-bold text-2xl ${AbrilFatface.className}`}
            >
              {standing.competition.name}
            </h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Pos</th>
                  <th className="text-left">Team</th>
                  <th className="text-left">Points</th>
                  <th className="text-left">Win</th>
                  <th className="text-left">Draw</th>
                  <th className="text-left">Loss</th>
                  <th className="text-left">+/-</th>
                  <th className="text-left">form</th>
                </tr>
              </thead>
              <tbody>
                {standing.table.rankings.map((ranking: any) => (
                  <tr key={ranking.team.id} className={`odd:bg-gray-700/50 ${ranking.team.id == id ? "text-green-300" : ""}`}>
                    <td>
                      <h2 className="p-2">{ranking.position}</h2>
                    </td>
                    <td className="flex items-center my-2">
                      <Image
                        src={baseGoalImageUrl + (ranking.team.image.url || "")}
                        alt=""
                        width={100}
                        height={200}
                        className="w-14 h-14"
                        unoptimized
                      />
                      <h2 className="ml-3">{ranking.team.name}</h2>
                    </td>
                    <td>{ranking.points}</td>
                    <td>{ranking.win}</td>
                    <td>{ranking.draw}</td>
                    <td>{ranking.lose}</td>
                    <td>{ranking.goalsDifference}</td>
                    <td>
                      <div className="flex gap-1">
                        {ranking.form
                          .map(({ wdl }: { wdl: string }) => wdl[0])
                          .map((wdl: string, i: number) => (
                            <div
                              key={wdl + i + Math.random()}
                              className={`w-5 h-5 grid place-content-center rounded-sm text-white ${
                                wdl == "W"
                                  ? "bg-green-500"
                                  : wdl == "D"
                                  ? "bg-gray-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {wdl}
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
