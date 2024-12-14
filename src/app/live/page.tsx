import { requestGraphql } from '@/lib/utils';
import { gql } from 'graphql-request';
import React from 'react'

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


const page = async () => {
    const data = await requestGraphql(GET_MATCHES);
  return (
    <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default page