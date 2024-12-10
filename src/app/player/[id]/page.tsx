import { baseGoalImageUrl, fetchGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PlayerNews from "./playerNews";
import PlayerStats from "@/components/custom/PlayerStats";
import { Abril_Fatface } from "next/font/google";
const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});

const GET_PLAYER = gql`
  query GET_PLAYER($id: String!) {
    player(id: $id) {
      name
      image {
        url
      }
      nationality {
        name
        image {
          url
        }
      }
      age
      dateOfBirth
      firstName
      lastName
      position
      shirtNumber
      team {
        name
        id
        image {
          url
        }
      }
      stats {
        competition {
          name
        }
        team {
          id
          image {
            url
          }
        }
        stats {
          goals
          assists
          appearances
          blockedShots
          cleanSheets
          clearances
          corners
          crosses
          freekickGoals
          penaltyGoals
        }
        season {
          name
          id
          active
        }
      }
    }
  }
`;

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
}) => {
  const { id } = await params;
  const { tab } = await searchParams;
  const data = await fetchGraphql(GET_PLAYER, { id });
  if (!data) return <p>No Date!.. soooooryyyy</p>;
  if (!data.data.player) return <p>No Date!.. soooooryyyy</p>;
  return (
    <div className="container">
      <div className=" my-5">
        <div className="flex items-center gap-6 pb-3">
          <Image
            src={baseGoalImageUrl + data.data.player.image.url}
            width={100}
            height={100}
            alt=""
            className="rounded-full"
            unoptimized
          />
          <div>
            <h1 className={`text-4xl ${AbrilFatface.className}`}>
              {data.data.player.name}
            </h1>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-white to-green-400 w-full mb-3" />
        <ul className="mt-3">
          <li>
            <Link href={"/player/" + id} className="mx-3">
              Stats
            </Link>
            <Link href={"/player/" + id + "?tab=news"} className="mx-3">
              News
            </Link>
          </li>
        </ul>
      </div>
      {tab ? <PlayerNews id={id} /> : <PlayerStats data={data.data.player} />}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Page;
