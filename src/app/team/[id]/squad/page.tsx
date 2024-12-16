import { baseGoalImageUrl, fetchGraphql, requestGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
import { HandHelping, LoaderPinwheel, PersonStanding } from "lucide-react";
import { Abril_Fatface } from "next/font/google";
// export const revalidate = 80000000;
const GET_TEAM_SQUAD = gql`
  query Team($id: String!) {
    teamSquad(id: $id) {
      coach {
        name
        id
        image {
          url
        }
      }
      players {
        onLoan
        player {
          name
          id
          shirtNumber
          position
          image {
            url
          }
        }
        stats {
          goals
          assists
          appearances
        }
      }
    }
  }
`;

const positions = ["GOALKEEPER", "DEFENDER", "MIDFIELDER", "ATTACKER"];
function filterPlayersByPosition(players: any) {
  return players.reduce(
    (acc: any, player: any) => {
      const position = player.player.position.toLowerCase(); // Normalize position
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(player);
      return acc;
    },
    { goalkeeper: [], defender: [], midfielder: [], attacker: [] }
  );
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // const data = await fetchGraphql(GET_TEAM_SQUAD, { id });
  const data: any = await requestGraphql(GET_TEAM_SQUAD, { id });
  if (!data || !data.teamSquad) return null;
  const players = Object.entries(
    filterPlayersByPosition(data.teamSquad.players)
  );
  return (
    <div className="">
      <ul className="flex gap-6 text-xs md:text-base">
        <li className="flex gap-2">
          <HandHelping />: Assist
        </li>
        <li className="flex gap-2">
          <PersonStanding />: Appeaerances
        </li>
        <li className="flex gap-2">
          <LoaderPinwheel />: Goals
        </li>
      </ul>
      <div className="">
        <h1
          className={`capitalize m-3 font-bold text-xl ${AbrilFatface.className}`}
        >
          Coach
        </h1>
        <div className="flex odd:bg-slate-800/20 items-center gap-2 bg-slate-700/20 p-3">
          <Image
            src={baseGoalImageUrl + (data.teamSquad.coach.image.url || "")}
            alt=""
            width={100}
            height={200}
            className="w-14 h-14 rounded-full"
            unoptimized
          />
          <h1>{data.teamSquad.coach.name}</h1>
        </div>
      </div>
      <div className="mt-3">
        {players.map(([key, value]: any) => (
          <div key={key}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex items-center gap-2 p-3 justify-between">
                <h1
                  className={`capitalize m-3 font-bold text-xl ${AbrilFatface.className}`}
                >
                  {key}
                </h1>
                <div className="flex gap-4">
                  <LoaderPinwheel className="w-5" />
                  <HandHelping className="w-5" />
                  <PersonStanding className="w-5" />
                </div>
              </div>
              <div className="md:flex items-center gap-2 p-3 justify-between hidden">
                <span />
                <div className="flex gap-4">
                  <LoaderPinwheel className="w-5" />
                  <HandHelping className="w-5" />
                  <PersonStanding className="w-5" />
                </div>
              </div>
            </div>

            <div className="grid gird-cols-1 md:grid-cols-2 md:gap-1">
              {value.map((player: any) => (
                <Link
                  href={"/player/" + player.player.id}
                  target={"_blank"}
                  key={player.player.id}
                  className="flex odd:bg-slate-800/20 items-center gap-2 bg-slate-700/20 p-3"
                >
                  <Image
                    src={baseGoalImageUrl + (player.player.image.url || "")}
                    alt=""
                    width={100}
                    height={200}
                    className="w-14 h-14 rounded-full"
                    unoptimized
                  />
                  <div className="ml-2 flex gap-3 flex-1 justify-between">
                    <div className="flex gap-3">
                      <span className="font-bold">
                        {player.player.shirtNumber}
                      </span>
                      <span>{player.player.name}</span>
                    </div>
                    {player?.stats && (
                      <div className="flex gap-3">
                        <span className="flex gap-2 w-5">
                          {player?.stats?.goals}
                        </span>
                        <span className="flex gap-2 w-5">
                          {player?.stats?.assists}
                        </span>
                        <span className="flex gap-2 w-5">
                          {player?.stats?.appearances}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
