import { AwayTeamCardTemplate } from "../AwayTeamCardTemplate/AwayTeamCardTemplate";
import { HomeTeamCardTemplate } from "../HomeTeamCardTemplate/HomeTeamCardTemplate";
import { TimeCardTemplate } from "../TimeCardTemplate/TimeCardTemplate";
import { Data } from "../../pages/HomePage";
import { GameEvents } from "../GameEvents/GameEvents";

type CardTemplateType = {
  data: Data;
};

export const CardTemplate = ({ data }: CardTemplateType) => {
  return (
    <div className="flex items-center gap-2 rounded-md p-2 hover:shadow-md shadow-sm dark:bg-slate-800 bg-slate-100">
      <div>
        <TimeCardTemplate time={data.fixture.status} />
      </div>

      <div className="w-full">
        <HomeTeamCardTemplate teamName={data.teams.home.name} id={data.teams.home.id} goals={data.score} totalGoals={data.goals} winner={data.teams.home.winner} />
        <AwayTeamCardTemplate teamName={data.teams.away.name} id={data.teams.away.id} goals={data.score} totalGoals={data.goals} winner={data.teams.away.winner} />
      </div>

      <div className="flex justify-end w-xs">
        {/* @ts-ignore */}
        <GameEvents events={data.events} />
      </div>
    </div>
  )
}