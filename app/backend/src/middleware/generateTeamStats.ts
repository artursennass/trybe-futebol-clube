import { Sequelize } from 'sequelize';
import { IMatches } from '../interfaces/MatchesInterface';
import Matches from '../database/models/MatchesModel';
import { ITeamComplete } from '../interfaces/TeamInterface';

export default class GenerateTeamStats {
  static findMatchById = async (id: number): Promise<IMatches[]> => {
    const matches = await Matches.findAll({
      where: Sequelize.and(
        { inProgress: true },
        Sequelize.or(
          { homeTeamId: id },
          { awayTeamId: id },
        ),
      ),
    });

    return matches;
  };

  static pointsAndResults = (matches: IMatches[], id: number) => {
    const results = { victories: 0, losses: 0, ties: 0 };

    const totalPoints = matches.reduce((total: number, match: IMatches) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        results.ties += 1; return total + 1;
      } if (match.awayTeamId === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          results.victories += 1; return total + 3;
        }
        results.losses += 1; return total;
      }
      if (match.awayTeamGoals < match.homeTeamGoals) {
        results.victories += 1; return total + 3;
      }
      results.losses += 1; return total;
    }, 0);

    return { totalPoints, results };
  };

  static trackGoals = (matches: IMatches[], id: number) => {
    const totalGoals = { scored: 0, suffered: 0 };

    matches.forEach((match: IMatches) => {
      if (match.awayTeamId === id) {
        totalGoals.scored += match.awayTeamGoals;
        totalGoals.suffered += match.homeTeamGoals;
      }
      if (match.homeTeamId === id) {
        totalGoals.scored += match.homeTeamGoals;
        totalGoals.suffered += match.awayTeamGoals;
      }
    });

    return totalGoals;
  };

  static generateStats = async (team: ITeamComplete) => {
    const matches = await GenerateTeamStats.findMatchById(team.id);

    const pointsResult = GenerateTeamStats.pointsAndResults(matches, team.id);

    const goals = GenerateTeamStats.trackGoals(matches, team.id);

    const goalsBalance = goals.scored - goals.suffered;

    const efficiency = ((pointsResult.totalPoints / (matches.length * 3)) * 100).toFixed(2);

    const stats = {
      name: team.teamName,
      totalPoints: pointsResult.totalPoints,
      totalGames: matches.length,
      totalVictories: pointsResult.results.victories,
      totalDraws: pointsResult.results.ties,
      totalLosses: pointsResult.results.losses,
      goalsFavor: goals.scored,
      goalsOwn: goals.suffered,
      goalsBalance,
      efficiency,
    };

    return stats;
  };

  //   static leaderboard = async (allTeams: ITeamComplete[]) => {
  //     const leadeboard = allTeams.map((team) => GenerateTeamStats.generateStats(team));

  //     const orderedLeaderboard = leadeboard.sort((team1, team2) => {

//         if(team1.totalVictories === team2.totalVictories) {}
//     });
//   };
}

// const referência = {
// `Classificação`: Posição na classificação;
// `Time`: Nome do time;
// `P`: Total de Pontos;
// `J`: Total de Jogos;
// `V`: Total de Vitórias;
// `E`: Total de Empates;
// `D`: Total de Derrotas;
// `GP`: Gols marcados a favor;
// `GC`: Gols sofridos;
// `SG`: Saldo total de gols;
// `%`: Aproveitamento do time.
// }
