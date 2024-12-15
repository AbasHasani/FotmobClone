import NewsSection from "@/components/custom/NewsSection";
import { News } from "@/generated/graphql";
import { requestGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import { print } from "graphql";
import React, { FC } from "react";

const GET_TEAM_NEWS = gql`
  query TeamNews($id: String!) {
    teamNews(id: $id) {
      cards {
        title
        teaser
        url
        image {
          image {
            src
          }
        }
        publishTime
        tags {
          tags {
            name
          }
        }
      }
    }
  }
`;
export const revalidate = 28800;
interface props {
  params: Promise<{
    id: string;
  }>;
}

const Page: FC<props> = async ({ params }) => {
  const { id } = await params;
  const query = print(GET_TEAM_NEWS);
  const variables = { id };
  const res: any = await requestGraphql(query, variables);
  if (!res) return <p>No Data!</p>;
  const data = res?.teamNews?.cards as any;
  return (
    <div>
      <NewsSection cards={data} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Page;
