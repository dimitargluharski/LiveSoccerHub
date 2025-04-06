import { useEffect, useState } from "react";
import * as predictionService from '../../services/getMatchPredictionWinner';

interface MatchPredictionWinner {
  predictions: {
    winner: {
      name: string;
    };
  };
}

export const MatchPredictionWinner = ({ gameId }: { gameId: number }) => {
  const [data, setData] = useState<MatchPredictionWinner[]>([]);

  // save to local storage



  const fetchPrediction = () => {
    predictionService
      .getLiveGames(gameId)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchPrediction();
  }, [gameId]);

  return (
    <div className="dark:text-slate-500 text-slate-700">
      {data.length ? data.map((game, index) => (
        <div key={index}>
          {game.predictions?.winner?.name || 'N/A'}
        </div>
      )) : null}
    </div>
  );
};