import { baseGoalImageUrl, requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});

const GET_LEAGUE = gql`
  query getLeague($id: String!) {
    leagueCompetition(id: $id) {
      name
      image {
        url
      }
      area {
        name
      }
    }
  }
`;

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { leagueCompetition: data }: any = await requestGraphql(GET_LEAGUE, {
    id,
  });
  return (
    <div className="container">
      {data && (
        <div className="my-3 mb-8">
          <div className="flex items-center pb-3">
            <Image
              width={100}
              height={200}
              src={baseGoalImageUrl + (data?.image?.url || "")}
              alt="logo"
              className="object-contain"
            />
            <h1
              className={`text-4xl font-extrabold text-gray-200 ml-10 ${AbrilFatface.className}`}
            >
              {data?.name}
            </h1>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-white to-green-400 w-full" />
          <ul className="mt-3">
            <li>
              <Link href={"/league/" + id} className="mx-3">
                News
              </Link>
              <Link href={"/league/" + id + "/matches"} className="mx-3">
                Matches
              </Link>
              <Link href={"/league/" + id + "/top-players"} className="mx-3">
                Top Players
              </Link>
              <Link href={"/league/" + id + "/standings"} className="mx-3">
                Standings
              </Link>
            </li>
          </ul>
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
