import { CiStar } from "react-icons/ci";

import { AwayTeamCardTemplate } from "../AwayTeamCardTemplate/AwayTeamCardTemplate";
import { HomeTeamCardTemplate } from "../HomeTeamCardTemplate/HomeTeamCardTemplate";
import { TimeCardTemplate } from "../TimeCardTemplate/TimeCardTemplate";
import { Data } from "../../pages/HomePage/HomePage";

type CardTemplateType = {
  data: Data;
  handleAddGameToFavorite: (game: Data) => void;
};

export const CardTemplate = ({ data, handleAddGameToFavorite }: CardTemplateType) => {

  const onAddToFavoriteClick = () => {
    const game: Data = {
      fixture: data.fixture,
      teams: data.teams,
      score: data.score,
      league: data.league,
      goals: data.goals,
    };

    handleAddGameToFavorite(game);
  };

  return (
    <div className="flex items-center gap-2 rounded-md p-2 hover:shadow-md shadow-sm">
      <div>
        <TimeCardTemplate time={data.fixture.status} />
      </div>

      <div className="w-full">
        <HomeTeamCardTemplate teamName={data.teams.home.name} id={data.teams.home.id} goals={data.score} totalGoals={data.goals} winner={data.teams.home.winner} />
        <AwayTeamCardTemplate teamName={data.teams.away.name} id={data.teams.away.id} goals={data.score} totalGoals={data.goals} winner={data.teams.away.winner} />
      </div>
    </div>
  )
}