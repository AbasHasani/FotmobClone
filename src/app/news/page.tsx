import NewsSection from "@/components/custom/NewsSection";
import { fetchGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import React from "react";

const GET_NEWS = gql`
  query GetMatch {
    news {
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
export const dynamic = "force-dynamic";

const News = async () => {
  const data = await fetchGraphql(GET_NEWS);
  return (
    <div className="container mx-auto">
      <NewsSection cards={data.data.news.cards} />
    </div>
  );
};

export default News;
