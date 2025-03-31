import { useEffect, useState } from "react";

import * as footballService from '../services/getLiveGames';
import { CardTemplate } from "../components/CardTemplate/CardTemplate";
import { HomePageInputSearchField } from "../components/HomePageInputSearchField/HomePageInputSearchField";
import { GamesCard } from "./HomePage/GamesCard";

export interface Event {
  assist: {
    id: number | null;
    name: string | null;
  };
  comments: string | null;
  detail: string;
  player: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  time: {
    elapsed: number;
    extra: number | null;
  };
  type: string
}

export interface Data {
  fixture: {
    id: number;
    status: {
      elapsed: number;
      extra: number;
      long: string;
      short: string;
    }
  },
  teams: {
    home: {
      id: number;
      name: string;
      winner: boolean;
      logo: string;
    },
    away: {
      id: number;
      name: string;
      winner: boolean;
      logo: string;
    }
  },
  score: {
    halftime: {
      home: number;
      away: number;
    },
    fulltime: {
      home: number;
      away: number;
    },
    penalty: {
      home: number;
      away: number;
    },
    extratime: {
      home: number;
      away: number;
    }
  },
  league: {
    name: string;
    flag: string;
    country: string;
    season: number;
  },
  goals: {
    home: number;
    away: number;
  },
  events: Event[];
}

export const HomePage = () => {
  const [games, setGames] = useState<Data[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allGames, setAllGames] = useState<Data[]>([]);

  useEffect(() => {
    footballService.getLiveGames()
      .then(response => {
        setGames(response);
        setAllGames(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (!searchValue) {
      setGames(allGames);
    } else {
      const filteredArray = allGames.filter((game) =>
        game.teams.home.name.toLowerCase().includes(searchValue) ||
        game.teams.away.name.toLowerCase().includes(searchValue)
      );

      setGames(filteredArray);
    }
  };

  const totalGamesCount = games.length;

  const mapAllCountries = games.map((game) => game.league.country);
  const setOfUniqueCountries = [...new Set(mapAllCountries)];
  const totalUniqueCountriesCount = setOfUniqueCountries.length;

  const countEvents = games
    .map((game) => game.events)
    .flat()
    .filter((event) => event)
    .length;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-5">
        <GamesCard counter={totalGamesCount} text="games" />
        <GamesCard counter={totalUniqueCountriesCount} text="countires" />
        <GamesCard counter={countEvents} text="events" />
      </div>

      <HomePageInputSearchField handleInputChange={handleInputChange} searchTerm={searchTerm} />

      {games.length ? (
        <>
          {games.map((game, index) => (
            <CardTemplate key={index} data={game} />
          ))}
        </>
      ) : (
        <div className="text-center text-gray-500 mt-4">No matches found for your search.</div>
      )}
    </div>
  );
};
