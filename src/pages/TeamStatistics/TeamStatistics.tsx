import { useEffect, useState } from "react";
import { FaUserLock } from "react-icons/fa6";

import * as consumeGameData from "../../utils/consume";

interface TeamStatistics {
  isRegisteredUser: boolean;
}

export const TeamStatistics = ({ isRegisteredUser }: TeamStatistics) => {
  interface GameData {
    homeTeam: {
      teamId: any;
      stats: any;
    };
    awayTeam: {
      teamId: any;
      stats: any;
    };
  }

  const [game, setGame] = useState<GameData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    consumeGameData.consumeLiveGamesData()
      .then((data) => {
        setGame(data)
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  const hasRegistration = isRegisteredUser ? `${game.length}` : (<div title="You have to be registered used to use this funtionality"><FaUserLock /></div>)

  if (isRegisteredUser) {
    return (
      <div title="You have to be registered.">
        <FaUserLock />
      </div>
    )
  }

  return (
    <div>
      {hasRegistration}
    </div>
  );
};