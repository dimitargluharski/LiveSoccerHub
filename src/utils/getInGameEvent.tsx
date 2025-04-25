import { IoFootball } from "react-icons/io5";
import { GiCardPlay } from "react-icons/gi";
import { FaRotate } from "react-icons/fa6";
import { PiVideoCameraFill } from "react-icons/pi";

// TODO: Fix VAR events

export const getInGameEvent = (gameEvent: any) => {
  const { type, detail, time: { elapsed } } = gameEvent;

  switch (type) {
    case "Goal":
      if (detail === 'Missed Penalty') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
          />
        )
      }
      return (
        <IoFootball
          className="w-6 h-6 text-green-500"
        />
      );
    case "Card":
      if (detail === "Red Card") {
        return (
          <GiCardPlay
            className="w-6 h-6 text-red-500 rotate-180"
          />
        );
      } else if (detail === "Yellow Card") {
        return (
          <GiCardPlay
            className="w-6 h-6 text-yellow-500 rotate-180"
          />
        );
      }
      return <GiCardPlay className="w-5 h-5 rotate-180" />;
    case "subst":
      return (
        <FaRotate
          className="w-6 h-6 text-blue-500"
        />
      );
    case "Var":
      if (detail === 'Goal Disallowed - Foul') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
          />
        );
      } else if (detail === 'Goal cancelled') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
          />
        );
      } else if (detail === 'Penalty confirmed') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
          />
        );
      } else if (detail === 'Goal Disallowed - offside') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
          />
        );
      } else if (detail === 'Goal Disallowed') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
          />
        );
      }
      return <PiVideoCameraFill className="w-6 h-6 dark:text-slate-500" />;
    default:
      return null;
  }
};