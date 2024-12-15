import Match from "@/components/custom/match";
import { requestGraphql } from "@/lib/utils";
// import { gql } from "graphql-request";
import React from "react";
import Rounds from "./rounds";
import { print } from "@apollo/client/utilities";
import { gql } from "@apollo/client";
export const revalidate = 8 * 60 * 60;
const query = (showRound: boolean) => gql`
  query ($leagueMatchesId: String!${
    showRound ? `, $leagueRoundId: String!, $round: String!` : ""
  }) {
    leagueMatches(id: $leagueMatchesId) {
    ${
      showRound
        ? `
        leagueRound(id: $leagueRoundId, round: $round) {
        name
   active
   matches {
     status
     id
     startDate
     score {
       teamA
       teamB
     }
     period {
       type
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
   }
      }`
        : ""
    }
    leagueRoundMatches {
        name
        gameSetTypeId
        active
        matches {
          status
          id
          startDate
          score {
            teamA
            teamB
          }
          period {
            type
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
        }
      }
    }
  }
`;

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ round: string }>;
}) => {
  const { id } = await params;
  const { round } = await searchParams;
  const data: any = await requestGraphql(query(round ? true : false), {
    leagueMatchesId: id,
    leagueRoundId: id,
    round,
  });

  return (
    <div className="">
      <Rounds data={data} id={id} round={round} />
      {round
        ? data.leagueMatches.leagueRound.matches.map((match: any) => (
            <Match key={match.id} {...match} />
          ))
        : data.leagueMatches.leagueRoundMatches.map(
            (leagueRound: any) =>
              leagueRound.active &&
              leagueRound.matches.map((match: any) => (
                <Match key={match.id} {...match} />
              ))
          )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default page;
