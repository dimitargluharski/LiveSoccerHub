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
            title={`${elapsed}' ${detail || "No details"}`}
          />
        )
      }
      return (
        <IoFootball
          className="w-6 h-6 text-green-500"
          title={`${elapsed}' ${detail || "No details"}`}
        />
      );
    case "Card":
      if (detail === "Red Card") {
        return (
          <GiCardPlay
            className="w-6 h-6 text-red-500 rotate-180"
            title={`${elapsed}' Red Card`}
          />
        );
      } else if (detail === "Yellow Card") {
        return (
          <GiCardPlay
            className="w-6 h-6 text-yellow-500 rotate-180"
            title={`${elapsed}' Yellow Card`}
          />
        );
      }
      return <GiCardPlay className="w-5 h-5 rotate-180" title="Card" />;
    case "subst":
      return (
        <FaRotate
          className="w-6 h-6 text-blue-500"
          title={`${elapsed}' Substitution`}
        />
      );
    case "Var":
      if (detail === 'Goal cancelled') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
            title={`${elapsed}' ${detail || "No details"}`}
          />
        );
      } else if (detail === 'Penalty confirmed') {
        return (
          <IoFootball
            className="w-6 h-6 text-red-500"
            title={`${elapsed}' ${detail || "No details"}`}
          />
        )
      }
      return <PiVideoCameraFill className="w-6 h-6 dark:text-slate-500" title="VAR" />;
    default:
      return null;
  }
};