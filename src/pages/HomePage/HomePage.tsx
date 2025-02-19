import { useEffect, useState } from "react";

import * as footballService from '../../services/getLiveGames';
import { CardTemplate } from "../../components/CardTemplate/CardTemplate";
import { HomePageInputSearchField } from "../../components/HomePageInputSearchField/HomePageInputSearchField";

export const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (!searchTerm) {
      footballService.getLiveGames().then(response => setGames(response)).catch((err) => console.log(err));
    }
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();

    setSearchTerm(searchValue);

    const filteredArray = games.filter((game) =>
      // @ts-ignore
      game.teams.home.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      // @ts-ignore
      game.teams.away.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setGames(filteredArray);
  };

  console.log(games);

  if (games.length === 0) {
    return (
      <div className="text-3xl text-center text-slate-400">
        Sorry, but there is no data to display.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <HomePageInputSearchField handleInputChange={handleInputChange} searchTerm={searchTerm} />

      {games.map((game, index) => (
        <CardTemplate key={index} data={game} />
      ))}
    </div>
  )
}