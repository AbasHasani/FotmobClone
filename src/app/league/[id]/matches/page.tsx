import Match from "@/components/custom/match";
import { requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";
import React from "react";

const GET_LEAGUE_MATCHES = gql`
  query GET_LEAGUE_MATCHES($id: String!) {
    leagueMatches(id: $id) {
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
`;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data: any = await requestGraphql(GET_LEAGUE_MATCHES, { id });
  return (
    <div className="">
      {data.leagueMatches.map((leagueRound: any) =>
        leagueRound.matches.map((match: any) => (
          <Match key={match.id} {...match} />
        ))
      )}
    </div>
  );
};

export default page;
