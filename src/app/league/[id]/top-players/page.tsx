import { requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";
import React from "react";
// export const revalidate = 28800;
const GET_LEAGUE_TOP_PLAYERS = gql`
  query getLeagueTopPlayers($id: String!) {
    leagueTopPlayers(id: $id) {
      goals {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      assists {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      redCards {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      yellowCards {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      shotsOnTarget {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      foulsCommitted {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      foulsWon {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      tackles {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
      offsides {
        value
        team {
          id
          name
        }
        player {
          id
          name
        }
      }
    }
  }
`;
function formatString(input: string) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { leagueTopPlayers }: any = await requestGraphql(
    GET_LEAGUE_TOP_PLAYERS,
    { id }
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 md:mx-0">
      {Object.entries(leagueTopPlayers).map(([key, value]: any) => (
        <div
          key={key}
          className="border border-slate-900 rounded-sm mx-5 md:mx-0"
        >
          <h1 className="p-3">{formatString(key)}</h1>
          {value.map((player: any) => (
            <div
              key={player.player.id}
              className="flex gap-3 odd:bg-slate-900/20 even:bg-slate-800/20 p-3"
            >
              <p className="grid place-content-center rounded-full bg-green-900/20 border border-cyan-600/50 w-8 h-8 text-cyan-600">
                {player.value}
              </p>
              <p>{player.player.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default page;
