import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBullseye, FaCalendarAlt, FaRunning, FaShieldAlt, FaTrophy } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaFutbol } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Fixtures {
  played: { total: number };
  wins: { total: number };
  draws: { total: number };
  loses: { total: number };
}

interface Goals {
  for: { total: { total: number } };
  against: { total: { total: number } };
}

interface Penalty {
  scored: { total: number };
  missed: { total: number };
}

interface Statistics {
  fixtures: Fixtures;
  goals: Goals;
  clean_sheet: { total: number };
  failed_to_score: { total: number };
  form: string;
  penalty: Penalty;
}

interface Player {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

interface WinnerPrediction {
  predictions: {
    advice: string;
    percent: {
      home: string;
      draw: string;
      away: string;
    };
    goals: {
      home: string;
      away: string;
    };
    under_over: string;
    win_or_draw: boolean;
    winner: {
      id: number;
      name: string;
      comment: string | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  comparison: {
    form: {
      home: string;
      away: string;
    };
    att: {
      home: string;
      away: string;
    };
    def: {
      home: string;
      away: string;
    };
    poisson_distribution: {
      home: string;
      away: string;
    };
    h2h: {
      home: string;
      away: string;
    };
  };
  h2h: Array<{
    fixture: {
      date: string;
      venue: {
        name: string;
        city: string;
      };
    };
    teams: {
      home: {
        name: string;
      };
      away: {
        name: string;
      };
    };
    goals: {
      home: number;
      away: number;
    };
  }>;
}
import * as TeamsStatistics from "../services/getTeamsStatistics";
import * as StandingsService from "../services/getStanding";
import * as TeamsSeasons from "../services/getTeamsSeasons";
import * as WinnerPredictionService from '../services/getMatchPredictionWinner';

export const TeamDetailsPage = () => {
  const location = useLocation();
  const { team } = location.state || {};

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [standings, setStandings] = useState<any>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [winnerPrediction, setWinnerPrediction] = useState<WinnerPrediction | null>(null);
  const [showWinnerPrediction, setShowWinnerPrediction] = useState<boolean>(false);

  if (!team) {
    return <p className="dark:text-slate-300">No data available.</p>;
  }

  const {
    id,
    name,
    logo,
    fixtureId,
    league: { id: leagueId, name: leagueName, country: leagueCountry, season, round },
  } = team;


  useEffect(() => {
    setLoading(true);

    TeamsStatistics.getTeamsStatistics(season, id, leagueId)
      .then((data) => {
        setStatistics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load statistics.");
        setLoading(false);
      });

    StandingsService.getStandings(leagueId, season)
      .then((response) => {
        // console.log("Standings:", response);
        setStandings(response[1] || []);
      })
      .catch((err) => {
        console.error("Error fetching standings:", err);
      });

    TeamsSeasons.getTeamsSeasons(id)
      .then((data) => {
        // console.log("Players:", data);
        setPlayers(data[0].players || []);
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
      });

    WinnerPredictionService.getLiveGames(fixtureId)
      .then((data) => {
        // console.log(data);
        setWinnerPrediction(data[0] ?? null)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [season, id, leagueId]);

  if (loading) {
    return <p className="dark:text-slate-300">Loading...</p>;
  }

  if (error) {
    return <p className="dark:text-red-500">{error}</p>;
  }

  if (!statistics || !standings) {
    return <p className="dark:text-slate-300">No data available.</p>;
  }

  const {
    fixtures,
    goals,
    clean_sheet,
    failed_to_score,
    form,
    penalty,
  } = statistics;

  const renderForm = (form: string) => {
    return form.split("").slice(-10).map((char, index) => {
      let colorClass = "";
      if (char === "W") colorClass = "text-green-500";
      if (char === "D") colorClass = "text-yellow-500";
      if (char === "L") colorClass = "text-red-500";
      return (
        <span
          key={index}
          className={`rounded-full font-bold ${colorClass}`}
        >
          {char}
        </span>
      );
    });
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPlayers = {
    Goalkeepers: filteredPlayers.filter((player) => player.position === "Goalkeeper"),
    Defenders: filteredPlayers.filter((player) => player.position === "Defender"),
    Midfielders: filteredPlayers.filter((player) => player.position === "Midfielder"),
    Attackers: filteredPlayers.filter((player) => player.position === "Attacker"),
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <img src={logo} alt={name} className="w-24 h-24 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{name}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                League: {leagueName} ({leagueCountry})
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Season: {season}, Round: {round}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Form</h2>
          <div className="flex space-x-2">{renderForm(form)}</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaCalendarAlt className="text-blue-500 w-6 h-6 mr-2" />
            Fixtures
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Played: {fixtures.played.total}</p>
          <div className="mb-2">
            <p className="text-gray-600 dark:text-gray-400">
              Wins: {fixtures.wins.total} ({((fixtures.wins.total / fixtures.played.total) * 100).toFixed(1)}%)
            </p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(fixtures.wins.total / fixtures.played.total) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-gray-600 dark:text-gray-400">
              Draws: {fixtures.draws.total} ({((fixtures.draws.total / fixtures.played.total) * 100).toFixed(1)}%)
            </p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${(fixtures.draws.total / fixtures.played.total) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              Losses: {fixtures.loses.total} ({((fixtures.loses.total / fixtures.played.total) * 100).toFixed(1)}%)
            </p>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${(fixtures.loses.total / fixtures.played.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaFutbol className="text-green-500 w-6 h-6 mr-2" />
            Goals
          </h2>
          <Bar
            data={{
              labels: ["Goals For", "Goals Against"],
              datasets: [
                {
                  label: "Goals",
                  data: [goals.for.total.total, goals.against.total.total],
                  backgroundColor: ["#4CAF50", "#F44336"],
                  borderColor: ["#388E3C", "#D32F2F"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FaChartBar className="text-purple-500 w-6 h-6 mr-2" />
            Additional
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Clean Sheets:</span> {clean_sheet.total || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Failed to Score:</span> {failed_to_score.total || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Penalty Scored:</span> {penalty.scored.total || 0}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-bold">Penalty Missed:</span> {penalty.missed.total || 0}
          </p>
        </div>

        {winnerPrediction && (
          <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <FaBullseye className="text-red-500 w-6 h-6 mr-2" />
                Winner Prediction
              </h2>
              <button
                onClick={() => setShowWinnerPrediction(!showWinnerPrediction)}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                {showWinnerPrediction ? "Hide" : "Show"}
              </button>
            </div>

            {showWinnerPrediction && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-center items-center">
                  <Bar
                    data={{
                      labels: ["Home Win & Draw", "Draw", "Away Win & Draw"],
                      datasets: [
                        {
                          data: [
                            parseFloat(winnerPrediction.predictions.percent.home),
                            parseFloat(winnerPrediction.predictions.percent.draw),
                            parseFloat(winnerPrediction.predictions.percent.away),
                          ],
                          backgroundColor: [
                            "#4CAF50",
                            "#FFC107",
                            "#F44336",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const index = context.dataIndex;
                              const percentages = [
                                parseFloat(winnerPrediction.predictions.percent.home),
                                parseFloat(winnerPrediction.predictions.percent.draw),
                                parseFloat(winnerPrediction.predictions.percent.away),
                              ];
                              return `${percentages[index]}%`;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg">
                    {/* <FaHome className="text-green-500 w-6 h-6 mr-2" /> */}
                    <p className="text-lg font-semibold">
                      <span className="font-bold">Home Win:</span> {winnerPrediction.predictions.percent.home}
                    </p>
                  </div>

                  <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg">
                    {/* <FaHandshake className="text-yellow-500 w-6 h-6 mr-2" /> */}
                    <p className="text-lg font-semibold">
                      <span className="font-bold">Draw:</span> {winnerPrediction.predictions.percent.draw}
                    </p>
                  </div>

                  <div className="flex items-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                    {/* <FaPlane className="text-red-500 w-6 h-6 mr-2" /> */}
                    <p className="text-lg font-semibold">
                      <span className="font-bold">Away Win:</span> {winnerPrediction.predictions.percent.away}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showWinnerPrediction && (
              <div
                className={`flex items-center p-4 rounded-lg mt-4 ${winnerPrediction.predictions.winner?.name === winnerPrediction.teams.home.name
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : winnerPrediction.predictions.winner?.name === winnerPrediction.teams.away.name
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                  }`}
              >
                <FaTrophy
                  className={`w-6 h-6 mr-2 ${winnerPrediction.predictions.winner?.name === winnerPrediction.teams.home.name
                    ? "text-green-500"
                    : winnerPrediction.predictions.winner?.name === winnerPrediction.teams.away.name
                      ? "text-red-500"
                      : "text-yellow-500"
                    }`}
                />
                <p className="text-lg font-semibold">
                  <span className="font-bold">Predicted Winner:</span>{" "}
                  {winnerPrediction.predictions.winner?.name || "No winner predicted"}
                </p>
              </div>
            )}

            {showWinnerPrediction && (
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg mt-4 flex items-center">
                <FaBullseye className="text-blue-500 w-6 h-6 mr-2" />
                <p className="text-sm font-semibold">{winnerPrediction.predictions.advice || "No advice available."}</p>
              </div>
            )}
          </div>
        )}

        {winnerPrediction?.comparison && (
          <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <FaChartBar className="text-purple-500 w-6 h-6 mr-2" />
              Comparison
            </h2>

            <div className="flex justify-center items-center gap-8 mb-4">
              <p className="text-lg font-semibold text-green-500">
                {winnerPrediction.teams.home.name}
              </p>
              <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">vs</span>
              <p className="text-lg font-semibold text-red-500">
                {winnerPrediction.teams.away.name}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {(["form", "att", "def"] as Array<keyof typeof winnerPrediction.comparison>).map((key) => {
                const homeValue = parseInt(winnerPrediction.comparison[key].home);
                const awayValue = parseInt(winnerPrediction.comparison[key].away);

                return (
                  <div key={key} className="flex items-center">
                    <div className="flex-1 flex justify-end items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">{homeValue}%</p>
                      <div
                        className="w-1/2 bg-green-500 h-4 rounded-l-full"
                        style={{ width: `${homeValue}%` }}
                      ></div>
                    </div>

                    <div className="w-24 text-center">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 capitalize">{key}</p>
                    </div>

                    <div className="flex-1 flex items-center">
                      <div
                        className="w-1/2 bg-red-500 h-4 rounded-r-full"
                        style={{ width: `${awayValue}%` }}
                      ></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 ml-2">{awayValue}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {winnerPrediction?.h2h && winnerPrediction.h2h.length > 0 ? (
          <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <FaChartBar className="text-purple-500 w-6 h-6 mr-2" />
              Head-to-Head (H2H)
            </h2>

            <Bar
              data={{
                labels: winnerPrediction.h2h.map((match) =>
                  new Date(match.fixture.date).toLocaleDateString()
                ),
                datasets: [
                  {
                    label: `${winnerPrediction.teams.home.name} Goals (Home)`,
                    data: winnerPrediction.h2h.map((match) => match.goals.home),
                    backgroundColor: "#4CAF50",
                    borderColor: "#388E3C",
                    borderWidth: 1,
                  },
                  {
                    label: `${winnerPrediction.teams.away.name} Goals (Away)`,
                    data: winnerPrediction.h2h.map((match) => match.goals.away),
                    backgroundColor: "#F44336",
                    borderColor: "#D32F2F",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Goals",
                    },
                  },
                  // x: {
                  //   title: {
                  //     display: true,
                  //     text: "Match Date",
                  //   },
                  // },
                },
              }}
            />
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No Head-to-Head data available.</p>
        )}

        <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Players</h2>
          <input
            type="text"
            placeholder="Search players..."
            className="mb-4 p-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {Object.entries(groupedPlayers).map(([position, players]) => (
            <div key={position} className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                {position === "Goalkeepers" && <FaFutbol className="text-blue-500 w-5 h-5 mr-2" />}
                {position === "Defenders" && <FaShieldAlt className="text-green-500 w-5 h-5 mr-2" />}
                {position === "Midfielders" && <FaRunning className="text-yellow-500 w-5 h-5 mr-2" />}
                {position === "Attackers" && <FaBullseye className="text-red-500 w-5 h-5 mr-2" />}
                {position}
              </h3>
              {players.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No players in this category.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md"
                    >
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          {player.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Age: {player.age}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Number: {player.number || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};