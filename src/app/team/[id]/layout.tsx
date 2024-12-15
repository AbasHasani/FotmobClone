import { baseGoalImageUrl, requestGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import { print } from "graphql";
import { Abril_Fatface } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const AbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});

export const revalidate = 24 * 60 * 60;

const GET_TEAM = gql`
  query Team($id: String!) {
    team(id: $id) {
      name
      id
      image {
        url
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
  const query = print(GET_TEAM);
  const variables = { id };
  const { team: data }: any = await requestGraphql(query, variables);
  return (
    <div className="container">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {data && (
        <div className="my-3 mb-8">
          <div className="flex items-center pb-3">
            <Image
              width={100}
              height={200}
              src={baseGoalImageUrl + (data?.image?.url || "")}
              alt="logo"
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
              <Link href={"/team/" + id} className="mx-3">
                News
              </Link>
              <Link href={"/team/" + id + "/matches"} className="mx-3">
                Matches
              </Link>
              <Link href={"/team/" + id + "/squad"} className="mx-3">
                Squad
              </Link>
              <Link href={"/team/" + id + "/standings"} className="mx-3">
                Standings
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
