import { useEffect, useState } from "react";
import * as footballService from '../../services/getLiveGames';
import { CardTemplate } from "../../components/CardTemplate/CardTemplate";
import { HomePageInputSearchField } from "../../components/HomePageInputSearchField/HomePageInputSearchField";
import { FavoriteGame } from "../../components/FavoriteGame/FavoriteGame";
import Swal from "sweetalert2";

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
}

export const HomePage = () => {
  const [games, setGames] = useState<Data[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allGames, setAllGames] = useState<Data[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Data[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const savedState = localStorage.getItem('favoriteView');

    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    footballService.getLiveGames()
      .then(response => {
        setGames(response);
        setAllGames(response);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteGames');

    if (storedFavorites) {
      setFavoriteGames(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    if (favoriteGames.length > 0) {
      localStorage.setItem('favoriteGames', JSON.stringify(favoriteGames));
    }
  }, [favoriteGames]);

  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem('games', JSON.stringify(games));
    }
  }, [games]);

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


  const handleAddGameToFavorite = (game: Data) => {
    setFavoriteGames((oldValue) => {
      const gameExists = oldValue.some((singleGame) => singleGame.fixture.id === game.fixture.id);

      if (gameExists) {
        Swal.fire({
          text: 'This game is already in your favorites!',
          icon: 'info',
          backdrop: false,
          position: 'bottom-right',
          timer: 2500,
          showConfirmButton: false
        });

        return oldValue;
      } else {
        const updatedFavorites = [...oldValue, game];

        localStorage.setItem('favoriteGames', JSON.stringify(updatedFavorites));

        Swal.fire({
          text: 'The game has been successfully added to your favorites!',
          icon: 'success',
          backdrop: false,
          position: 'bottom-right',
          timer: 2500,
          showConfirmButton: false
        });

        return updatedFavorites;
      }
    });
  };

  const handleRemoveFromFavorite = (game: Data) => {
    const filteredArray = favoriteGames.filter((singleGame) => singleGame.fixture.id !== game.fixture.id);

    setFavoriteGames(filteredArray);
    localStorage.setItem('favoriteGames', JSON.stringify(filteredArray));

    Swal.fire({
      text: 'The game has been successfully removed from your favorites!',
      icon: 'error',
      backdrop: false,
      timer: 2500,
      position: 'bottom-right',
      showConfirmButton: false
    });
  };

  const handleCollapseSection = () => {
    setIsCollapsed((prevValue) => {
      const newValue = !prevValue;
      localStorage.setItem('favoriteView', JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <HomePageInputSearchField handleInputChange={handleInputChange} searchTerm={searchTerm} />

      <section className="my-5 shadow-lg rounded-md">
        <div className="p-2 text-lg cursor-pointer hover:bg-slate-200" onClick={handleCollapseSection}>
          {`${favoriteGames.length === 1 ? `${favoriteGames.length} game saved` : `${favoriteGames.length} games saved`}`}
        </div>

        <div className={`${isCollapsed ? 'block' : 'hidden'} flex flex-col gap-2`}>
          {favoriteGames.length > 0 && favoriteGames.map((game, index) => (
            <FavoriteGame key={index} data={game} handleRemoveFromFavorite={handleRemoveFromFavorite} />
          ))}
        </div>
      </section>

      {games.length ? (
        <>
          <div className="p-2 text-lg">{games.length} games</div>
          {games.map((game, index) => (
            <CardTemplate key={index} data={game} handleAddGameToFavorite={handleAddGameToFavorite} />
          ))}
        </>
      ) : (
        <div className="text-center text-gray-500 mt-4">No matches found for your search.</div>
      )}
    </div>
  );
};
