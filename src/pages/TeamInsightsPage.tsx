import { useEffect, useState } from "react";

import * as LiveGameService from "../services/getLiveGames";
import { Link } from "react-router-dom";

interface League {
  id: number;
  name: string;
  country: string;
  flag: string;
  logo: string;
  season: number;
  round: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  league: League;
}

export const TeamInsightsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  useEffect(() => {
    LiveGameService.getLiveGames()
      .then((response) => {
        const processedTeams = response.flatMap((game: any) => [
          {
            id: game.teams.home.id,
            name: game.teams.home.name,
            logo: game.teams.home.logo,
            fixtureId: game.fixture.id,
            league: {
              id: game.league.id,
              name: game.league.name,
              country: game.league.country,
              flag: game.league.flag,
              logo: game.league.logo,
              season: game.league.season,
              round: game.league.round,
            },
          },
          {
            id: game.teams.away.id,
            name: game.teams.away.name,
            logo: game.teams.away.logo,
            fixtureId: game.fixture.id,
            league: {
              id: game.league.id,
              name: game.league.name,
              country: game.league.country,
              flag: game.league.flag,
              logo: game.league.logo,
              season: game.league.season,
              round: game.league.round,
            },
          },
        ]);
        setTeams(processedTeams);
        setFilteredTeams(processedTeams);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = teams.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchQuery, teams]);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-8">
          Team Insights
        </h1>
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 mb-8 border dark:text-slate-100 border-gray-300 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTeams.map((team, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden relative"
            >
              <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow-md">
                <img
                  src={team.league.flag}
                  alt={team.league.country}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div className="bg-blue-100 dark:bg-gray-700 p-4 flex justify-center items-center">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-24 h-24 object-contain"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center truncate">
                  {team.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center truncate">
                  League: <span className="font-medium">{team.league.name}</span>
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="truncate">Season: {team.league.season}</span>
                  <span className="truncate">Round: {team.league.round}</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 flex justify-center">
                <Link to={`/team-insights/${team.id}`} state={{ team }} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};