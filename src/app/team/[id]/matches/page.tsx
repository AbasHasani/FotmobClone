import Match from "@/components/custom/match";
import { fetchGraphql } from "@/lib/utils";
import { gql } from "@apollo/client";
import React from "react";
import TeamMatches from "./TeamMatches";

const GET_TEAM_MATCHES = gql`
  query Team($id: String!) {
    teamMatches(id: $id) {
      status
      startDate
      id
      period {
        minute
        extra
      }
      score {
        teamA
        teamB
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
`;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await fetchGraphql(GET_TEAM_MATCHES, { id });
  if (!data.data.teamMatches) return <pre>{JSON.stringify(data)}</pre>;
  return (
    <div className="flex flex-col gap-1">
      <TeamMatches data={data} />
    </div>
  );
};

export default Page;
