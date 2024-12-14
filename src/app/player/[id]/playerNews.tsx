import NewsSection from "@/components/custom/NewsSection";
import { requestGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import React from "react";

const GET_PLAYER_NEWS = gql`
  query PlayerNews($id: String!) {
    playerNews(id: $id) {
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
        publishTime
      }
    }
  }
`;

const PlayerNews = async ({ id }: { id: string }) => {
  const variables = { id };
  const data: any = await requestGraphql(GET_PLAYER_NEWS, variables);
  if (!data) return "Error";
  // return (
  //   <div>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // );
  return <NewsSection cards={data.playerNews.cards} />;
};

export default PlayerNews;
