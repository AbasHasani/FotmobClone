import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Area = {
  __typename?: 'Area';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<Array<Maybe<Author>>>;
  body?: Maybe<SingleNewsBody>;
  commentId?: Maybe<Scalars['String']['output']>;
  disclaimer?: Maybe<Scalars['Boolean']['output']>;
  headline?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  poster?: Maybe<MediaImage>;
  publishTime?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<Settings>;
  tagList?: Maybe<Tags>;
  teaser?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Coach = {
  __typename?: 'Coach';
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<SquadImage>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CommentCount = {
  __typename?: 'CommentCount';
  hideIfNoComments?: Maybe<Scalars['Boolean']['output']>;
  postId?: Maybe<Scalars['String']['output']>;
  threadId?: Maybe<Scalars['String']['output']>;
};

export type Competition = {
  __typename?: 'Competition';
  area: Area;
  id: Scalars['ID']['output'];
  image: Image;
  name: Scalars['String']['output'];
};

export type DataClass = {
  __typename?: 'DataClass';
  agg?: Maybe<Scalars['String']['output']>;
  competition?: Maybe<Competition>;
  events?: Maybe<Array<Maybe<DataEvent>>>;
  extraTime?: Maybe<Scalars['String']['output']>;
  form?: Maybe<Form>;
  fullTime?: Maybe<FullTime>;
  halfTime?: Maybe<FullTime>;
  id?: Maybe<Scalars['ID']['output']>;
  keyEvents?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  lineups?: Maybe<Lineups>;
  penalty?: Maybe<Scalars['String']['output']>;
  period?: Maybe<Scalars['String']['output']>;
  referee?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  round?: Maybe<Round>;
  score?: Maybe<FullTime>;
  scorers?: Maybe<Scorers>;
  season?: Maybe<Season>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  stats?: Maybe<MatchStats>;
  status?: Maybe<Scalars['String']['output']>;
  teamA?: Maybe<MatchTeam>;
  teamB?: Maybe<MatchTeam>;
  venue?: Maybe<Venue>;
};

export type DataEvent = {
  __typename?: 'DataEvent';
  assist?: Maybe<Person>;
  in?: Maybe<Person>;
  out?: Maybe<Person>;
  period?: Maybe<Period>;
  player?: Maybe<Person>;
  reason?: Maybe<Scalars['String']['output']>;
  score?: Maybe<FullTime>;
  scorer?: Maybe<Person>;
  side?: Maybe<Side>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Embeds = {
  __typename?: 'Embeds';
  teamIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Form = {
  __typename?: 'Form';
  allTeamA?: Maybe<TeamStats>;
  allTeamB?: Maybe<TeamStats>;
  homeTeamA?: Maybe<TeamStats>;
  homeTeamB?: Maybe<TeamStats>;
  match?: Maybe<FormMatch>;
  wdl?: Maybe<Scalars['String']['output']>;
};

export type FormMatch = {
  __typename?: 'FormMatch';
  id?: Maybe<Scalars['String']['output']>;
  score?: Maybe<RedCards>;
  status?: Maybe<Scalars['String']['output']>;
  teamA?: Maybe<FormTeam>;
  teamB?: Maybe<FormTeam>;
};

export type FormTeam = {
  __typename?: 'FormTeam';
  id: Scalars['ID']['output'];
};

export type FullTime = {
  __typename?: 'FullTime';
  teamA?: Maybe<Scalars['Int']['output']>;
  teamB?: Maybe<Scalars['Int']['output']>;
};

export type Image = {
  __typename?: 'Image';
  url: Scalars['String']['output'];
};

export type Injury = {
  __typename?: 'Injury';
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  person?: Maybe<Person>;
  shirtNumber?: Maybe<Scalars['Int']['output']>;
};

export type LineupPlayer = {
  __typename?: 'LineupPlayer';
  events?: Maybe<Array<Maybe<DataEvent>>>;
  isCaptain?: Maybe<Scalars['Boolean']['output']>;
  person?: Maybe<Person>;
  pitchPosition?: Maybe<PitchPosition>;
  score?: Maybe<Scalars['Int']['output']>;
  shirtNumber?: Maybe<Scalars['Int']['output']>;
};

export type Lineups = {
  __typename?: 'Lineups';
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  teamA?: Maybe<Team>;
  teamB?: Maybe<Team>;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID']['output'];
  pageType?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type LiveScore = {
  __typename?: 'LiveScore';
  competition: Competition;
  matches: Array<Match>;
};

export type Manager = {
  __typename?: 'Manager';
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<ManagerImage>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ManagerImage = {
  __typename?: 'ManagerImage';
  url?: Maybe<Scalars['String']['output']>;
};

export type Marker = {
  __typename?: 'Marker';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Match = {
  __typename?: 'Match';
  agg?: Maybe<Scalars['String']['output']>;
  bettingOddsDetailsList: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['DateTime']['output']>;
  penalty?: Maybe<Scalars['String']['output']>;
  period?: Maybe<Period>;
  redCards?: Maybe<RedCards>;
  round: Round;
  score?: Maybe<RedCards>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  teamA?: Maybe<Team>;
  teamB?: Maybe<Team>;
  tvChannel?: Maybe<Scalars['String']['output']>;
  venue: Area;
};

export type MatchDetails = {
  __typename?: 'MatchDetails';
  id?: Maybe<Scalars['ID']['output']>;
  score?: Maybe<FullTime>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  teamA?: Maybe<MatchTeam>;
  teamB?: Maybe<MatchTeam>;
};

export type MatchElement = {
  __typename?: 'MatchElement';
  match?: Maybe<MatchDetails>;
  wdl?: Maybe<Wdl>;
};

export type MatchStats = {
  __typename?: 'MatchStats';
  attacking?: Maybe<Array<Maybe<StatItem>>>;
  defence?: Maybe<Array<Maybe<StatItem>>>;
  discipline?: Maybe<Array<Maybe<StatItem>>>;
  duels?: Maybe<Array<Maybe<StatItem>>>;
  passing?: Maybe<Array<Maybe<StatItem>>>;
  summary?: Maybe<Array<Maybe<StatItem>>>;
};

export type MatchTeam = {
  __typename?: 'MatchTeam';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<PersonImage>;
  long?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Media = {
  __typename?: 'Media';
  credit?: Maybe<Scalars['String']['output']>;
  image?: Maybe<MediaImage>;
  source?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MediaImage = {
  __typename?: 'MediaImage';
  alt?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  sizes?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type MostRead = {
  __typename?: 'MostRead';
  cards?: Maybe<Array<Maybe<MostReadCard>>>;
  headline?: Maybe<Scalars['String']['output']>;
};

export type MostReadCard = {
  __typename?: 'MostReadCard';
  headline?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Link>;
};

export type Nationality = {
  __typename?: 'Nationality';
  image?: Maybe<Image>;
  name?: Maybe<Scalars['String']['output']>;
};

export type News = {
  __typename?: 'News';
  cards?: Maybe<Array<Maybe<NewsItem>>>;
};

export type NewsImage = {
  __typename?: 'NewsImage';
  alt?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  srcSet?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type NewsImageContainer = {
  __typename?: 'NewsImageContainer';
  image?: Maybe<NewsImage>;
};

export type NewsItem = {
  __typename?: 'NewsItem';
  commentCount?: Maybe<CommentCount>;
  image?: Maybe<NewsImageContainer>;
  newsTab?: Maybe<Scalars['Boolean']['output']>;
  publishTime?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Tags>;
  teaser?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Period = {
  __typename?: 'Period';
  extra: Scalars['Int']['output'];
  minute: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export type Person = {
  __typename?: 'Person';
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<PersonImage>;
  name?: Maybe<Scalars['String']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type PersonImage = {
  __typename?: 'PersonImage';
  alt?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PitchPosition = {
  __typename?: 'PitchPosition';
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['ID']['output'];
  image?: Maybe<SquadImage>;
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  shirtNumber?: Maybe<Scalars['Int']['output']>;
};

export type PlayerContainer = {
  __typename?: 'PlayerContainer';
  onLoan?: Maybe<Scalars['Boolean']['output']>;
  player?: Maybe<Player>;
  stats?: Maybe<PlayerStatsInSquad>;
};

export type PlayerDetails = {
  __typename?: 'PlayerDetails';
  age?: Maybe<Scalars['Int']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
  lastName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Nationality>;
  position?: Maybe<Scalars['String']['output']>;
  shirtNumber?: Maybe<Scalars['Int']['output']>;
  stats?: Maybe<Array<Maybe<PlayerStats>>>;
  team?: Maybe<Team>;
};

export type PlayerStatTeam = {
  __typename?: 'PlayerStatTeam';
  id: Scalars['ID']['output'];
  image?: Maybe<Image>;
};

export type PlayerStats = {
  __typename?: 'PlayerStats';
  competition?: Maybe<Competition>;
  season?: Maybe<Season>;
  stats?: Maybe<StatItems>;
  team?: Maybe<PlayerStatTeam>;
};

export type PlayerStatsInSquad = {
  __typename?: 'PlayerStatsInSquad';
  appearances?: Maybe<Scalars['Int']['output']>;
  assists?: Maybe<Scalars['Int']['output']>;
  goals?: Maybe<Scalars['Int']['output']>;
  redCards?: Maybe<Scalars['Int']['output']>;
  yellowCards?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  liveScore?: Maybe<Array<Maybe<LiveScore>>>;
  liveScoreLives?: Maybe<LiveScore>;
  match?: Maybe<DataClass>;
  news?: Maybe<News>;
  newsItem?: Maybe<SingleNews>;
  player?: Maybe<PlayerDetails>;
  playerNews?: Maybe<News>;
  teamMatches?: Maybe<Array<Maybe<Match>>>;
  teamNews?: Maybe<News>;
  teamSquad?: Maybe<TeamSquad>;
  teamStandings?: Maybe<Array<Maybe<Standings>>>;
};


export type QueryLiveScoreArgs = {
  date: Scalars['String']['input'];
};


export type QueryMatchArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNewsItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryPlayerArgs = {
  id: Scalars['String']['input'];
};


export type QueryPlayerNewsArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamMatchesArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamNewsArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamSquadArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamStandingsArgs = {
  id: Scalars['String']['input'];
};

export type Rankings = {
  __typename?: 'Rankings';
  draw?: Maybe<Scalars['Int']['output']>;
  form?: Maybe<Form>;
  goalsAgainst?: Maybe<Scalars['Int']['output']>;
  goalsDifference?: Maybe<Scalars['Int']['output']>;
  goalsFor?: Maybe<Scalars['Int']['output']>;
  lose?: Maybe<Scalars['Int']['output']>;
  played?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  team?: Maybe<MatchTeam>;
  win?: Maybe<Scalars['Int']['output']>;
};

export type RedCards = {
  __typename?: 'RedCards';
  teamA: Scalars['Int']['output'];
  teamB: Scalars['Int']['output'];
};

export type Round = {
  __typename?: 'Round';
  display: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
};

export type ScorerEvent = {
  __typename?: 'ScorerEvent';
  period?: Maybe<Period>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ScorerInfo = {
  __typename?: 'ScorerInfo';
  events?: Maybe<Array<Maybe<ScorerEvent>>>;
  player?: Maybe<Player>;
};

export type Scorers = {
  __typename?: 'Scorers';
  teamA?: Maybe<Array<Maybe<ScorerInfo>>>;
  teamB?: Maybe<Array<Maybe<ScorerInfo>>>;
};

export type Season = {
  __typename?: 'Season';
  active?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Settings = {
  __typename?: 'Settings';
  commentsAllowed?: Maybe<Scalars['Boolean']['output']>;
  enableEditorsPicks?: Maybe<Scalars['Boolean']['output']>;
  includeInFeeds?: Maybe<Scalars['Boolean']['output']>;
};

export enum Side {
  TeamA = 'TEAM_A',
  TeamB = 'TEAM_B'
}

export type SingleNews = {
  __typename?: 'SingleNews';
  editorsPicks?: Maybe<MostRead>;
  mostRead?: Maybe<MostRead>;
  slideList?: Maybe<SlideList>;
};

export type SingleNewsBody = {
  __typename?: 'SingleNewsBody';
  body?: Maybe<Scalars['String']['output']>;
  embeds?: Maybe<Embeds>;
};

export type SingleNewsSlideBody = {
  __typename?: 'SingleNewsSlideBody';
  body?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type Slide = {
  __typename?: 'Slide';
  body?: Maybe<SingleNewsSlideBody>;
  headline?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Media>;
};

export type SlideList = {
  __typename?: 'SlideList';
  article?: Maybe<Article>;
  matches?: Maybe<Array<Maybe<Match>>>;
  slides?: Maybe<Array<Maybe<Slide>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SquadImage = {
  __typename?: 'SquadImage';
  alt?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type Standings = {
  __typename?: 'Standings';
  competition?: Maybe<Competition>;
  markers?: Maybe<Array<Maybe<Marker>>>;
  table?: Maybe<Table>;
};

export type StatItem = {
  __typename?: 'StatItem';
  teamA?: Maybe<Scalars['Int']['output']>;
  teamB?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type StatItems = {
  __typename?: 'StatItems';
  appearances?: Maybe<Scalars['Int']['output']>;
  assists?: Maybe<Scalars['Int']['output']>;
  blockedShots?: Maybe<Scalars['Int']['output']>;
  cleanSheets?: Maybe<Scalars['Int']['output']>;
  clearances?: Maybe<Scalars['Int']['output']>;
  corners?: Maybe<Scalars['Int']['output']>;
  crosses?: Maybe<Scalars['Int']['output']>;
  foulsCommited?: Maybe<Scalars['Int']['output']>;
  foulsSuffered?: Maybe<Scalars['Int']['output']>;
  freekickGoals?: Maybe<Scalars['Int']['output']>;
  goals?: Maybe<Scalars['Int']['output']>;
  goalsConceded?: Maybe<Scalars['Int']['output']>;
  goalsOutsideBox?: Maybe<Scalars['Int']['output']>;
  hitWoodwork?: Maybe<Scalars['Int']['output']>;
  minutesPerGoal?: Maybe<Scalars['Int']['output']>;
  minutesPlayed?: Maybe<Scalars['Int']['output']>;
  offsides?: Maybe<Scalars['Int']['output']>;
  ownGoals?: Maybe<Scalars['Int']['output']>;
  penaltiesMissed?: Maybe<Scalars['Int']['output']>;
  penaltyGoals?: Maybe<Scalars['Int']['output']>;
  penaltySaves?: Maybe<Scalars['Int']['output']>;
  redCards?: Maybe<Scalars['Int']['output']>;
  saves?: Maybe<Scalars['Int']['output']>;
  shotsOffTarget?: Maybe<Scalars['Int']['output']>;
  shotsOnTarget?: Maybe<Scalars['Int']['output']>;
  startingEleven?: Maybe<Scalars['Int']['output']>;
  successfulCrosses?: Maybe<Scalars['Int']['output']>;
  tackles?: Maybe<Scalars['Int']['output']>;
  yellowCards?: Maybe<Scalars['Int']['output']>;
};

export type Stats = {
  __typename?: 'Stats';
  gamesBothTeamsScored?: Maybe<Scalars['Int']['output']>;
  gamesOverTwoAndHalfGoals?: Maybe<Scalars['Int']['output']>;
  gamesTotal?: Maybe<Scalars['Int']['output']>;
  goalsConceded?: Maybe<Scalars['Int']['output']>;
  goalsScored?: Maybe<Scalars['Int']['output']>;
};

export type Substitute = {
  __typename?: 'Substitute';
  events?: Maybe<Array<Maybe<DataEvent>>>;
  person?: Maybe<Person>;
  score?: Maybe<Scalars['Int']['output']>;
  shirtNumber?: Maybe<Scalars['Int']['output']>;
};

export type Table = {
  __typename?: 'Table';
  live?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rankings?: Maybe<Array<Maybe<Rankings>>>;
};

export type Tag = {
  __typename?: 'Tag';
  link?: Maybe<Link>;
  name?: Maybe<Scalars['String']['output']>;
  pageType?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Tags = {
  __typename?: 'Tags';
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type Team = {
  __typename?: 'Team';
  code: Scalars['String']['output'];
  formation?: Maybe<Scalars['String']['output']>;
  full: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Image;
  injuries?: Maybe<Array<Maybe<Injury>>>;
  kit?: Maybe<Scalars['String']['output']>;
  lineup?: Maybe<Array<Maybe<LineupPlayer>>>;
  long: Scalars['String']['output'];
  manager?: Maybe<Manager>;
  name: Scalars['String']['output'];
  short: Scalars['String']['output'];
  substitutes?: Maybe<Array<Maybe<Substitute>>>;
  suspensions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type TeamSquad = {
  __typename?: 'TeamSquad';
  coach?: Maybe<Coach>;
  players?: Maybe<Array<Maybe<PlayerContainer>>>;
};

export type TeamStats = {
  __typename?: 'TeamStats';
  matches?: Maybe<Array<Maybe<MatchElement>>>;
  stats?: Maybe<Stats>;
};

export enum Typename {
  MatchCardEvent = 'MATCH_CARD_EVENT',
  MatchGoalEvent = 'MATCH_GOAL_EVENT',
  MatchPeriodEvent = 'MATCH_PERIOD_EVENT',
  MatchSubstitutionEvent = 'MATCH_SUBSTITUTION_EVENT'
}

export type Venue = {
  __typename?: 'Venue';
  name?: Maybe<Scalars['String']['output']>;
};

export enum Wdl {
  Draw = 'DRAW',
  Lose = 'LOSE',
  Win = 'WIN'
}

export type GetMatchDetailsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMatchDetailsQuery = { __typename?: 'Query', match?: { __typename?: 'DataClass', status?: string | null, score?: { __typename?: 'FullTime', teamA?: number | null, teamB?: number | null } | null, scorers?: { __typename?: 'Scorers', teamA?: Array<{ __typename?: 'ScorerInfo', player?: { __typename?: 'Player', name?: string | null, shirtNumber?: number | null } | null } | null> | null, teamB?: Array<{ __typename?: 'ScorerInfo', player?: { __typename?: 'Player', name?: string | null, shirtNumber?: number | null } | null } | null> | null } | null, teamA?: { __typename?: 'MatchTeam', name?: string | null, id?: string | null, image?: { __typename?: 'PersonImage', url?: string | null } | null } | null, teamB?: { __typename?: 'MatchTeam', name?: string | null, id?: string | null, image?: { __typename?: 'PersonImage', url?: string | null } | null } | null, events?: Array<{ __typename?: 'DataEvent', type?: string | null, side?: Side | null, player?: { __typename?: 'Person', name?: string | null, id?: string | null } | null, period?: { __typename?: 'Period', minute: number } | null } | null> | null, lineups?: { __typename?: 'Lineups', confirmed?: boolean | null, teamA?: { __typename?: 'Team', manager?: { __typename?: 'Manager', name?: string | null, id?: string | null } | null, lineup?: Array<{ __typename?: 'LineupPlayer', person?: { __typename?: 'Person', name?: string | null, id?: string | null } | null } | null> | null } | null, teamB?: { __typename?: 'Team', manager?: { __typename?: 'Manager', name?: string | null, id?: string | null } | null, lineup?: Array<{ __typename?: 'LineupPlayer', person?: { __typename?: 'Person', name?: string | null, id?: string | null } | null } | null> | null } | null } | null } | null };

export type GetLiveScoresQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetLiveScoresQuery = { __typename?: 'Query', liveScore?: Array<{ __typename?: 'LiveScore', competition: { __typename?: 'Competition', name: string, id: string, image: { __typename?: 'Image', url: string } }, matches: Array<{ __typename?: 'Match', status?: string | null, id: string, startDate?: any | null, period?: { __typename?: 'Period', minute: number } | null, teamA?: { __typename?: 'Team', name: string, id: string, image: { __typename?: 'Image', url: string } } | null, teamB?: { __typename?: 'Team', name: string, id: string, image: { __typename?: 'Image', url: string } } | null, score?: { __typename?: 'RedCards', teamA: number, teamB: number } | null }> } | null> | null };


export const GetMatchDetailsDocument = gql`
    query GetMatchDetails($id: String!) {
  match(id: $id) {
    status
    score {
      teamA
      teamB
    }
    scorers {
      teamA {
        player {
          name
          shirtNumber
        }
      }
      teamB {
        player {
          name
          shirtNumber
        }
      }
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
    events {
      type
      player {
        name
        id
      }
      period {
        minute
      }
      side
    }
    lineups {
      confirmed
      teamA {
        manager {
          name
          id
        }
        lineup {
          person {
            name
            id
          }
        }
      }
      teamB {
        manager {
          name
          id
        }
        lineup {
          person {
            name
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetMatchDetailsQuery__
 *
 * To run a query within a React component, call `useGetMatchDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMatchDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetMatchDetailsQuery, GetMatchDetailsQueryVariables> & ({ variables: GetMatchDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchDetailsQuery, GetMatchDetailsQueryVariables>(GetMatchDetailsDocument, options);
      }
export function useGetMatchDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchDetailsQuery, GetMatchDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchDetailsQuery, GetMatchDetailsQueryVariables>(GetMatchDetailsDocument, options);
        }
export function useGetMatchDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchDetailsQuery, GetMatchDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchDetailsQuery, GetMatchDetailsQueryVariables>(GetMatchDetailsDocument, options);
        }
export type GetMatchDetailsQueryHookResult = ReturnType<typeof useGetMatchDetailsQuery>;
export type GetMatchDetailsLazyQueryHookResult = ReturnType<typeof useGetMatchDetailsLazyQuery>;
export type GetMatchDetailsSuspenseQueryHookResult = ReturnType<typeof useGetMatchDetailsSuspenseQuery>;
export type GetMatchDetailsQueryResult = Apollo.QueryResult<GetMatchDetailsQuery, GetMatchDetailsQueryVariables>;
export const GetLiveScoresDocument = gql`
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

/**
 * __useGetLiveScoresQuery__
 *
 * To run a query within a React component, call `useGetLiveScoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiveScoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiveScoresQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetLiveScoresQuery(baseOptions: Apollo.QueryHookOptions<GetLiveScoresQuery, GetLiveScoresQueryVariables> & ({ variables: GetLiveScoresQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiveScoresQuery, GetLiveScoresQueryVariables>(GetLiveScoresDocument, options);
      }
export function useGetLiveScoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiveScoresQuery, GetLiveScoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiveScoresQuery, GetLiveScoresQueryVariables>(GetLiveScoresDocument, options);
        }
export function useGetLiveScoresSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLiveScoresQuery, GetLiveScoresQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLiveScoresQuery, GetLiveScoresQueryVariables>(GetLiveScoresDocument, options);
        }
export type GetLiveScoresQueryHookResult = ReturnType<typeof useGetLiveScoresQuery>;
export type GetLiveScoresLazyQueryHookResult = ReturnType<typeof useGetLiveScoresLazyQuery>;
export type GetLiveScoresSuspenseQueryHookResult = ReturnType<typeof useGetLiveScoresSuspenseQuery>;
export type GetLiveScoresQueryResult = Apollo.QueryResult<GetLiveScoresQuery, GetLiveScoresQueryVariables>;