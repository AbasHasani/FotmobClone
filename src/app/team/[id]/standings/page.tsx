import { baseGoalImageUrl, fetchGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import React from "react";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});

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
    <div className="px-3">
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
                  <th className="text-left hidden md:block">Win</th>
                  <th className="text-left hidden md:block">Draw</th>
                  <th className="text-left hidden md:block">Loss</th>
                  <th className="text-left">+/-</th>
                  <th className="text-left">form</th>
                </tr>
              </thead>
              <tbody>
                {standing.table.rankings.map((ranking: any) => (
                  <tr
                    key={ranking.team.id}
                    className={`odd:bg-gray-700/50 ${
                      ranking.team.id == id ? "text-green-300" : ""
                    }`}
                  >
                    <td>
                      <h2 className="p-2">{ranking.position}</h2>
                    </td>
                    <td className="flex items-center my-2">
                      <Image
                        src={baseGoalImageUrl + (ranking.team.image.url || "")}
                        alt=""
                        width={100}
                        height={200}
                        className="md:w-14 md:h-14 w-7 h-7"
                        unoptimized
                      />
                      <h2 className="ml-3">{ranking.team.name}</h2>
                    </td>
                    <td>{ranking.points}</td>
                    <td className="hidden md:block">{ranking.win}</td>
                    <td className="hidden md:block">{ranking.draw}</td>
                    <td className="hidden md:block">{ranking.lose}</td>
                    <td>{ranking.goalsDifference}</td>
                    <td>
                      <div className="flex md:gap-1 text-xs md:text-base">
                        {ranking.form
                          .map(({ wdl }: { wdl: string }) => wdl[0])
                          .map((wdl: string, i: number) => (
                            <div
                              key={wdl + i + Math.random()}
                              className={`md:w-5 md:h-5 grid place-content-center rounded-sm text-white ${
                                wdl == "W"
                                  ? "md:bg-green-500 text-green-500"
                                  : wdl == "D"
                                  ? "md:bg-gray-500 text-gray-500"
                                  : "md:bg-red-500 text-red-500"
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
