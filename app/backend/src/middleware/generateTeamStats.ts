import { Sequelize } from 'sequelize';
import { IMatches } from '../interfaces/MatchesInterface';
import Matches from '../database/models/MatchesModel';
import { ITeamComplete } from '../interfaces/TeamInterface';

export default class GenerateTeamStats {
  static findMatchById = async (id: number, status: string): Promise<IMatches[]> => {
    if (status === 'away') {
      const matches = await Matches.findAll({
        where: Sequelize.and({ inProgress: false }, { awayTeamId: id }) }); return matches;
    } if (status === 'home') {
      const matches = await Matches.findAll({
        where: Sequelize.and({ inProgress: false }, { homeTeamId: id }) }); return matches;
    }
    const matches = await Matches.findAll({
      where: Sequelize.and(
        { inProgress: false },
        Sequelize.or(
          { homeTeamId: id },
          { awayTeamId: id },
        ),
      ),
    }); return matches;
  };

  static pointsAndResultsComplete = (matches: IMatches[], id: number) => {
    const results = { victories: 0, losses: 0, ties: 0 };

    const totalPoints = matches.reduce((total: number, match: IMatches) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        results.ties += 1; return total + 1;
      }
      if (match.awayTeamId === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          results.victories += 1; return total + 3;
        } results.losses += 1; return total;
      }
      if (match.homeTeamId === id) {
        if (match.awayTeamGoals < match.homeTeamGoals) {
          results.victories += 1; return total + 3;
        } results.losses += 1; return total;
      }
      return total;
    }, 0);

    return { totalPoints, results };
  };

  static pointsAndResultsAway = (matches: IMatches[], id: number) => {
    const results = { victories: 0, losses: 0, ties: 0 };

    const totalPoints = matches.reduce((total: number, match: IMatches) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        results.ties += 1; return total + 1;
      }
      if (match.awayTeamId === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          results.victories += 1; return total + 3;
        }
        results.losses += 1; return total;
      }
      return total;
    }, 0);

    return { totalPoints, results };
  };

  static pointsAndResultsHome = (matches: IMatches[], id: number) => {
    const results = { victories: 0, losses: 0, ties: 0 };

    const totalPoints = matches.reduce((total: number, match: IMatches) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        results.ties += 1; return total + 1;
      }
      if (match.homeTeamId === id) {
        if (match.awayTeamGoals < match.homeTeamGoals) {
          results.victories += 1; return total + 3;
        }
        results.losses += 1; return total;
      }
      return total;
    }, 0);

    return { totalPoints, results };
  };

  static pointsAndResults = (matches: IMatches[], id: number, status: string) => {
    let outcome = {
      totalPoints: 0,
      results: { victories: 0, losses: 0, ties: 0 },
    };

    if (status === 'away') {
      outcome = GenerateTeamStats.pointsAndResultsAway(matches, id);
    } if (status === 'home') {
      outcome = GenerateTeamStats.pointsAndResultsHome(matches, id);
    } if (status === 'complete') {
      outcome = GenerateTeamStats.pointsAndResultsComplete(matches, id);
    }

    return outcome;
  };

  static trackGoalsHome = (matches: IMatches[], id: number) => {
    const totalGoals = { scored: 0, suffered: 0 };

    matches.forEach((match: IMatches) => {
      if (match.homeTeamId === id) {
        totalGoals.scored += match.homeTeamGoals;
        totalGoals.suffered += match.awayTeamGoals;
      }
    }); return totalGoals;
  };

  static trackGoalsAway = (matches: IMatches[], id: number) => {
    const totalGoals = { scored: 0, suffered: 0 };

    matches.forEach((match: IMatches) => {
      if (match.awayTeamId === id) {
        totalGoals.scored += match.awayTeamGoals;
        totalGoals.suffered += match.homeTeamGoals;
      }
    });
    return totalGoals;
  };

  static trackGoalsComplete = (matches: IMatches[], id: number) => {
    const totalGoals = { scored: 0, suffered: 0 };

    matches.forEach((match: IMatches) => {
      if (match.awayTeamId === id) {
        totalGoals.scored += match.awayTeamGoals;
        totalGoals.suffered += match.homeTeamGoals;
      } if (match.homeTeamId === id) {
        totalGoals.scored += match.homeTeamGoals;
        totalGoals.suffered += match.awayTeamGoals;
      }
    });
    return totalGoals;
  };

  static trackGoals = (matches: IMatches[], id: number, status: string) => {
    let totalGoals = { scored: 0, suffered: 0 };

    if (status === 'away') {
      totalGoals = GenerateTeamStats.trackGoalsAway(matches, id);
    } if (status === 'home') {
      totalGoals = GenerateTeamStats.trackGoalsHome(matches, id);
    } if (status === 'complete') {
      totalGoals = GenerateTeamStats.trackGoalsComplete(matches, id);
    }

    return totalGoals;
  };

  static generateStats = async (team: ITeamComplete, status: string) => {
    const matches = await GenerateTeamStats.findMatchById(team.id, status);

    const pointsResult = GenerateTeamStats.pointsAndResults(matches, team.id, status);

    const goals = GenerateTeamStats.trackGoals(matches, team.id, status);

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

  static generateLeaderboard = async (allTeams: ITeamComplete[], status: string) => {
    const leadeboard = allTeams.map(async (team) => {
      const statsGenerated = await GenerateTeamStats.generateStats(team, status);
      return statsGenerated;
    });

    return Promise.all(leadeboard);
  };

  static leaderboard = async (allTeams: ITeamComplete[], status = 'complete') => {
    const leadeboard = await GenerateTeamStats.generateLeaderboard(allTeams, status);

    const orderedLeaderboard = leadeboard.sort((team1, team2) => {
      if (team1.totalPoints === team2.totalPoints) {
        if (team1.totalVictories === team2.totalVictories) {
          if (team1.goalsBalance === team2.goalsBalance) {
            if (team1.goalsFavor === team2.goalsFavor) {
              return team2.goalsOwn - team1.goalsOwn;
            }
            return team2.goalsFavor - team1.goalsFavor;
          }
          return team2.goalsBalance - team1.goalsBalance;
        }
        return team2.totalVictories - team1.totalVictories;
      }
      return team2.totalPoints - team1.totalPoints;
    });

    return orderedLeaderboard;
  };
}

// so vai
