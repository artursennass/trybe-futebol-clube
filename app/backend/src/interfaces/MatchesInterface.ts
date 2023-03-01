export interface IMatches {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

type TTeamName = {
  teamName: string,
};

export interface IMatchesSearch extends IMatches {
  homeTeam: TTeamName,
  awayTeam: TTeamName
}
