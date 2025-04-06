import { useState } from "react";
import { GameEvents } from "../GameEvents/GameEvents";
// import { MatchPredictionWinner } from "../MatchPredictionWinner/MatchPredictionWinner";
import { TimeCardTemplate } from "../TimeCardTemplate/TimeCardTemplate";
import { HomeTeamCardTemplate } from "../HomeTeamCardTemplate/HomeTeamCardTemplate";
import { AwayTeamCardTemplate } from "../AwayTeamCardTemplate/AwayTeamCardTemplate";
import { InGameEvents } from "../InGameEvents/InGameEvents";
import { Data } from "../../pages/HomePage";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type CardTemplateType = {
  data: Data;
};


export const CardTemplate = ({ data }: CardTemplateType) => {
  // const [hidePrediction, setHidePrediction] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // const toggleShowWinnerPrediction = () => {
  //   setHidePrediction((prevState) => !prevState);
  // };

  const maxVisibleEvents = 5;

  const handlePrevEvents = () => {
    setCurrentEventIndex((prevIndex) =>
      Math.max(prevIndex - maxVisibleEvents, 0)
    );
  };

  const handleNextEvents = () => {
    setCurrentEventIndex((prevIndex) =>
      Math.min(prevIndex + maxVisibleEvents, data.events.length - maxVisibleEvents)
    );
  };

  const visibleEvents = data.events.slice(
    currentEventIndex,
    currentEventIndex + maxVisibleEvents
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 rounded-md p-4 hover:shadow-md shadow-sm dark:bg-slate-800 bg-slate-100">
      <div className="flex-shrink-0 w-full md:w-auto text-center">
        <TimeCardTemplate time={data.fixture.status} />
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full">
        <div className="flex-1 text-center md:text-left">
          <HomeTeamCardTemplate
            teamName={data.teams.home.name}
            id={data.teams.home.id}
            goals={data.score}
            totalGoals={data.goals}
            winner={data.teams.home.winner}
          />
          <AwayTeamCardTemplate
            teamName={data.teams.away.name}
            id={data.teams.away.id}
            goals={data.score}
            totalGoals={data.goals}
            winner={data.teams.away.winner}
          />
        </div>

        {data.events.length > 0 ? (
          <div className="flex-1 max-w-full">
            <div className="flex items-center justify-between gap-2">
              {data.events.length > maxVisibleEvents && (
                <button
                  onClick={handlePrevEvents}
                  disabled={currentEventIndex === 0}
                  className={`px-2 py-1 rounded-md ${currentEventIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                  <FaArrowUp />
                </button>
              )}

              <InGameEvents events={visibleEvents} />

              {data.events.length > maxVisibleEvents && (
                <button
                  onClick={handleNextEvents}
                  disabled={currentEventIndex + maxVisibleEvents >= data.events.length}
                  className={`px-2 py-1 rounded-md ${currentEventIndex + maxVisibleEvents >= data.events.length
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                  <FaArrowDown />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 text-center text-gray-500">
            No in-game events
          </div>
        )}
      </div>

      {/* <div className="w-full md:w-auto text-center">
        <button
          onClick={toggleShowWinnerPrediction}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {hidePrediction ? "Hide Prediction" : "Show Prediction"}
        </button>
        {hidePrediction && (
          <div className="mt-4 p-4 border rounded-md dark:bg-slate-700 bg-slate-200">
            <MatchPredictionWinner gameId={data.fixture.id} />
          </div>
        )}
      </div> */}

      <div className="flex justify-end w-full md:w-auto">
        {data.events.length > 0 && (
          // @ts-ignore
          <GameEvents events={data.events} />
        )}
      </div>
    </div>
  );
};