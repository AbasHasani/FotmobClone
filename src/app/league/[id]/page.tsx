import NewsSection from "@/components/custom/NewsSection";
import { requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";
import React from "react";

const GET_LEAGUE_NEWS = gql`
  query GET_LEAGUE_NEWS($id: String!) {
    leagueNews(id: $id) {
      cards {
        title
        teaser
        url
        tags {
          tags {
            name
          }
        }
        image {
          image {
            src
          }
        }
      }
    }
  }
`;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data: any = await requestGraphql(GET_LEAGUE_NEWS, { id });
  return (
    <div className="">
      <NewsSection cards={data.leagueNews.cards} />
    </div>
  );
};

export default Page;
