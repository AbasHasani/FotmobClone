import { requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";
import React from "react";
import Matches from "./matches";

export const GET_MATCHES = gql`
  query GetLiveScores($date: String!) {
    liveScore(date: $date) {
      competition {
        name
        id
        image {
          url
        }
      }
      matches {
        status
        id
        startDate
        period {
          minute
          extra
        }
        teamA {
          name
          id
          image {
            url
          }
        }
        teamB {
          name
          id
          image {
            url
          }
        }
        score {
          teamA
          teamB
        }
      }
    }
  }
`;

const page = () => {
  return (
    <div>
      <Matches />
    </div>
  );
};

export default page;
