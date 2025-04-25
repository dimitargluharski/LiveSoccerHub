import { FaFutbol, FaExchangeAlt, FaCommentDots } from "react-icons/fa";
import { GiCardPlay } from "react-icons/gi";

export const getEventDetails = (
  detail: string,
) => {
  switch (detail) {
    case "Normal Goal":
      return {
        icon: <FaFutbol className="text-green-600 dark:text-green-400 w-6 h-6" />,
        text: "Normal Goal",
      };
    case "Own Goal":
      return {
        icon: <FaFutbol className="text-red-600 dark:text-red-400 w-6 h-6" />,
        text: "Own Goal",
      };
    case "Goal Disallowed":
    case "Goal Disallowed - Foul":
    case "Goal Disallowed - offside":
      return {
        icon: <FaFutbol className="text-red-600 dark:text-red-400 w-6 h-6" />,
        text: "Goal Disallowed",
      };
    case "Substitution 1":
    case "Substitution 2":
    case "Substitution 3":
    case "Substitution 4":
    case "Substitution 5":
      return {
        icon: <FaExchangeAlt className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
        text: `${detail}`,
      };
    case "Penalty":
      return {
        icon: <FaFutbol className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />,
        text: "Penalty",
      };
    case "Yellow Card":
      return {
        icon: <GiCardPlay className="text-yellow-600 dark:text-yellow-400 rotate-180 w-6 h-6" />,
        text: "Yellow Card",
      };
    case "Red Card":
      return {
        icon: <GiCardPlay className="text-red-600 dark:text-red-400 rotate-180 w-6 h-6" />,
        text: "Red Card",
      };
    default:
      return {
        icon: <FaCommentDots className="text-gray-600 dark:text-gray-400 w-6 h-6" />,
        text: detail || "Unknown Event",
      };
  }
};