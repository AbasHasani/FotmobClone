import NewsSection from "@/components/custom/NewsSection";
import { fetchGraphql } from "@/lib/utils";
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
  const data = await fetchGraphql(GET_PLAYER_NEWS, variables);
  if (!data) return "Error";
  return <NewsSection cards={data.data.playerNews.cards} />;
};

export default PlayerNews;
