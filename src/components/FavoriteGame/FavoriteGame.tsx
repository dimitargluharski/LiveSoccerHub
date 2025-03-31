import { IoMdCloseCircleOutline } from "react-icons/io";

import { Data } from "../../pages/HomePage";
import { AwayTeamCardTemplate } from "../AwayTeamCardTemplate/AwayTeamCardTemplate";
import { HomeTeamCardTemplate } from "../HomeTeamCardTemplate/HomeTeamCardTemplate";
import { TimeCardTemplate } from "../TimeCardTemplate/TimeCardTemplate";

type FavoriteGameTypes = {
  data: {
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
  },
  handleRemoveFromFavorite: (game: Data) => void;
};

export const FavoriteGame = ({ data, handleRemoveFromFavorite }: FavoriteGameTypes) => {
  return (
    <div className="flex items-center gap-2 rounded-md p-2 hover:shadow-md shadow-sm">
      <div>
        <TimeCardTemplate time={data.fixture.status} />
      </div>

      <div className="w-full">
        <HomeTeamCardTemplate teamName={data.teams.home.name} id={data.teams.home.id} goals={data.score} totalGoals={data.goals} winner={data.teams.home.winner} />
        <AwayTeamCardTemplate teamName={data.teams.away.name} id={data.teams.away.id} goals={data.score} totalGoals={data.goals} winner={data.teams.away.winner} />
      </div>

      <div onClick={() => handleRemoveFromFavorite(data)}>
        <IoMdCloseCircleOutline className="w-5 h-5 cursor-pointer text-red-500" />
      </div>
    </div>
  )
}