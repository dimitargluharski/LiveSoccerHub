import { getLiveGames } from "../services/getLiveGames";
import { getTeamsStatistics } from "../services/getTeamsStatistics";

export const consumeLiveGamesData = async () => {
  const allGames = await getLiveGames();

  let results = [];
  for (let i = 0; i < allGames.length; i++) {
    let game = {
      gameId: allGames[i].fixture.id ?? 0,
      leagueId: allGames[i].league.id ?? 0,
      seasonId: allGames[i].league.season ?? 0,
      homeTeamId: allGames[i].teams.home.id ?? 0,
      awayTeamId: allGames[i].teams.away.id ?? 0
    };

    results.push(game);
  }

  let allGamesStats = [];
  for (let i = 0; i < results.length; i++) {
    const game = results[i];

    try {
      const homeTeamStats = await getTeamsStatistics(game.seasonId, game.homeTeamId, game.leagueId);
      const awayTeamStats = await getTeamsStatistics(game.seasonId, game.awayTeamId, game.leagueId);

      allGamesStats.push({
        homeTeam: {
          teamId: game.homeTeamId,
          stats: homeTeamStats
        },
        awayTeam: {
          teamId: game.awayTeamId,
          stats: awayTeamStats
        }
      });
    } catch (error) {
      console.log(`Error fetching stats for game ${game.gameId}:`, error);
    }
  }

  return allGamesStats;
};
