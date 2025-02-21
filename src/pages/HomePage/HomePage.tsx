import { useCallback, useEffect, useState } from "react";

import * as footballService from '../../services/getLiveGames';
import { CardTemplate } from "../../components/CardTemplate/CardTemplate";
import { HomePageInputSearchField } from "../../components/HomePageInputSearchField/HomePageInputSearchField";
import { FavoriteGame } from "../../components/FavoriteGame/FavoriteGame";

export const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [allGames, setAllGames] = useState([]);
  const [favorite, setFavorite] = useState([]);

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
    }

    const filteredArray = allGames.filter((game) =>
      // @ts-ignore
      game.teams.home.name.toLowerCase().includes(searchValue) ||
      // @ts-ignore
      game.teams.away.name.toLowerCase().includes(searchValue)
    );

    setGames(filteredArray);
  };

  const handleAddGameToFavorite = (game: unknown) => {
    setFavorite((oldValue) => [...oldValue, game])

    localStorage.setItem('favoriteGames', JSON.stringify(favorite));
  };

  useEffect(() => {
    console.log('added new item!');
  }, [favorite.length])

  return (
    <div className="flex flex-col gap-2">
      <HomePageInputSearchField handleInputChange={handleInputChange} searchTerm={searchTerm} />

      {favorite.length > 0 && <FavoriteGame favorite={favorite} />}

      {games.length ? (
        games.map((game, index) => (
          <CardTemplate key={index} data={game} handleAddGameToFavorite={() => handleAddGameToFavorite(game)} />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">No matches found for your search.</div>
      )}
    </div>
  );
};
