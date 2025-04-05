import { useContext, useEffect, useRef, useState } from "react";

import * as footballService from '../services/getLiveGames';
import { CardTemplate } from "../components/CardTemplate/CardTemplate";
import { HomePageInputSearchField } from "../components/HomePageInputSearchField/HomePageInputSearchField";
import { GamesCard } from "./HomePage/GamesCard";
import { Filters } from "./HomePage/Filters";
import { ThemeContext } from "../context/ThemeContext";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

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
  const totalGamesCount = games.length;
  const mapAllCountries = games.map((game) => game.league.country);
  const setOfUniqueCountries = [...new Set(mapAllCountries)];
  const totalUniqueCountriesCount = setOfUniqueCountries.length;
  const stickyInputRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext is not provided.");
  }

  const { theme, toggleTheme } = themeContext;

  const countEvents = games
    .map((game) => game.events)
    .flat()
    .filter((event) => event)
    .length;

  const sortByTime = (data: any) => {
    const sortedByTime = [...data].sort((a, b) => a.fixture.status.elapsed - b.fixture.status.elapsed);
    setGames(sortedByTime);
  }

  const sortByEventsCount = (data: any) => {
    const sortedByEvents = [...data].sort((a, b) => b.events.length - a.events.length);
    setGames(sortedByEvents);
  }

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

  useEffect(() => {
    if (!stickyInputRef.current) return;

    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col p-2 gap-2 relative">
      <div className="flex justify-between items-center">

        <div className="flex">
          <GamesCard counter={totalGamesCount} text="games" />
          <GamesCard counter={countEvents} text="in-game events" />
          <GamesCard counter={totalUniqueCountriesCount} text="countires" />
        </div>

        <div className="flex hover:cursor-pointer" onClick={toggleTheme}>
          {theme === 'light' ? (
            <IoMoon className="dark:text-yellow-500 text-slate-400" />
          ) : (
            <IoSunny className="dark:text-yellow-500 text-slate-400" />
          )}
        </div>
      </div>

      <div ref={stickyInputRef}
        className={`${isScrolling ? 'sticky top-0 z-10' : ''} bg-white py-1`}
      >
        <HomePageInputSearchField handleInputChange={handleInputChange} searchTerm={searchTerm} />
      </div>

      {games.length ? (
        <>
          <div className="w-full flex">
            <Filters
              data={games}
              sortByTime={sortByTime}
              sortByEventsCount={sortByEventsCount}
            />
          </div>

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
