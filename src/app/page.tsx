import CustomCalendar from "@/components/custom/calendar";
import MatchesPage from "@/components/custom/matches";
import News from "@/components/custom/SideNews";
import CalenderProvider from "@/components/providers/calender";
import { requestGraphql } from "@/lib/utils";
import { gql } from "graphql-request";

const GET_MATCHES = gql`
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
          type
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

export const dynamic = "force-dynamic";


export default async function Home() {
  let now:any = new Date();
  const offset = now.getTimezoneOffset();
  now = new Date(now.getTime() - offset * 60 * 1000);
  now = now.toISOString().split("T")[0];
  
  const data = await requestGraphql(GET_MATCHES, { date: now });
  
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-7 m-2 gap-3">
        <News />
        <CalenderProvider>
          <MatchesPage matches={data} />
          <CustomCalendar />
        </CalenderProvider>
      </div>
    </div>
  );
}
