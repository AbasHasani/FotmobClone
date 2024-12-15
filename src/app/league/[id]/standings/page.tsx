import { baseGoalImageUrl, requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";
import Image from "next/image";
import React from "react";
export const revalidate = 28800;
const GETLEAGUE_TABLE = gql`
  query GETLEAGUE_TABLE($id: String!) {
    leagueStandings(id: $id) {
      tables {
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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const {leagueStandings: standings}: any = await requestGraphql(GETLEAGUE_TABLE, { id });
//   if(true) {
//     return <div>
//         <pre>{JSON.stringify(standings, null, 2)}</pre>
//     </div>
//   }
  return (
    <div className="">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-sm md:text-base text-left pl-2 " >Pos</th>
            <th className="text-sm md:text-base text-left">Team</th>
            <th className="text-sm md:text-base text-left">Points</th>
            <th className="text-sm md:text-base text-left hidden md:table-cell">Win</th>
            <th className="text-sm md:text-base text-left hidden md:table-cell">Draw</th>
            <th className="text-sm md:text-base text-left hidden md:table-cell">Loss</th>
            <th className="text-sm md:text-base text-left">+/-</th>
            <th className="text-sm md:text-base text-left">form</th>
          </tr>
        </thead>
        <tbody>
          {standings.tables[0].rankings.map((ranking: any) => (
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
              <td className="hidden md:table-cell">{ranking.win}</td>
              <td className="hidden md:table-cell">{ranking.draw}</td>
              <td className="hidden md:table-cell">{ranking.lose}</td>
              <td>{ranking.goalsDifference}</td>
              <td>
                <div className="flex md:gap-1 text-xs md:text-base">
                  {ranking.form
                    .map(({ wdl }: { wdl: string }) => wdl[0])
                    .map((wdl: string, i: number) => (
                      <div
                        key={wdl + i + Math.random()}
                        className={`md:w-5 md:h-5 grid place-content-center rounded-sm ${
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
  );
};

export default page;
