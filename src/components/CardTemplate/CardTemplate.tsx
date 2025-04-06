import { AwayTeamCardTemplate } from "../AwayTeamCardTemplate/AwayTeamCardTemplate";
import { HomeTeamCardTemplate } from "../HomeTeamCardTemplate/HomeTeamCardTemplate";
import { TimeCardTemplate } from "../TimeCardTemplate/TimeCardTemplate";
import { Data } from "../../pages/HomePage";
import { GameEvents } from "../GameEvents/GameEvents";
import { MatchPredictionWinner } from "../MatchPredictionWinner/MatchPredictionWinner";
import { useState } from "react";

type CardTemplateType = {
  data: Data;
};

export const CardTemplate = ({ data }: CardTemplateType) => {
  const [hidePrediction, setHidePrediction] = useState(false);

  const toggleShowWinnerPrediction = () => {
    setHidePrediction((prevStata) => !prevStata);
  }

  return (
    <div className="flex items-center gap-2 rounded-md p-2 hover:shadow-md shadow-sm dark:bg-slate-800 bg-slate-100">
      <div>
        <TimeCardTemplate time={data.fixture.status} />
      </div>

      <div className="w-full flex items-center gap-2">
        <div>
          <HomeTeamCardTemplate teamName={data.teams.home.name} id={data.teams.home.id} goals={data.score} totalGoals={data.goals} winner={data.teams.home.winner} />
          <AwayTeamCardTemplate teamName={data.teams.away.name} id={data.teams.away.id} goals={data.score} totalGoals={data.goals} winner={data.teams.away.winner} />
        </div>

        {<span onClick={toggleShowWinnerPrediction} className="px-1 dark:bg-slate-400 rounded-md hover:cursor-pointer">
          {hidePrediction ? 'hide' : 'show'}
        </span>}

        {hidePrediction && <MatchPredictionWinner gameId={data.fixture.id} />}

      </div>

      <div className="flex justify-end w-xs">
        {/* @ts-ignore */}
        <GameEvents events={data.events} />
      </div>
    </div>
  )
}