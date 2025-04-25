import { HoverCard } from "radix-ui";
import { getEventDetails } from "@/utils/getEventsDetails";
import { FaArrowDown, FaArrowUp, FaHandsHelping, FaUser } from "react-icons/fa";
import { GiCardPlay } from "react-icons/gi";

interface HoverCardComponentProps {
  data: {
    assist: { id: number | null; name: string | null };
    comments: string | null;
    detail: string;
    player: { id: number | null; name: string | null };
    team: { id: number; logo: string; name: string };
    time: { elapsed: number; extra: number | null };
    type: string;
  };
}

export const HoverCardComponent = ({ data }: HoverCardComponentProps) => {
  const { icon, text } = getEventDetails(data.detail);
  const isGoalEvent = ["Normal Goal", "Own Goal", "Penalty"].includes(data.detail);
  const isYellowCardEvent = data.detail === "Yellow Card";
  const isRedCardEvent = data.detail === "Red Card";

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="cursor-pointer text-blue-600 font-semibold">
          {icon}
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-[350px] rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 shadow-lg border border-blue-200 dark:border-gray-600"
          sideOffset={5}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={data.team.logo}
                alt={data.team.name}
                className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-500"
              />
              <div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-300">
                  {data.team.name}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  Time: {data.time.elapsed}'
                  {data.time.extra ? ` +${data.time.extra}` : ""}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {icon}
              <div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-400">
                  Event:
                </div>
                <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  {text}
                </div>
              </div>
            </div>

            {isGoalEvent && data.player?.name && (
              <div className="flex items-center gap-2">
                <FaUser className="text-green-600 dark:text-green-400 w-5 h-5" />
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    Goal Scorer:
                  </div>
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {data.player.name ?? "N/A"}
                  </div>
                </div>
              </div>
            )}

            {isGoalEvent && data.assist?.name && (
              <div className="flex items-center gap-2">
                <FaHandsHelping className="text-yellow-400 w-5 h-5" />
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    Assist:
                  </div>
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {data.assist.name ?? "N/A"}
                  </div>
                </div>
              </div>
            )}

            {isYellowCardEvent && data.player?.name && (
              <div className="flex items-center gap-2">
                <FaUser className="text-yellow-400 w-5 h-5" />
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    Player:
                  </div>
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {data.player.name ?? "N/A"}
                  </div>
                </div>
              </div>
            )}

            {isRedCardEvent && data.player?.name && (
              <div className="flex items-center gap-2">
                <GiCardPlay className="text-red-400 w-5 h-5 rotate-180" />
                <div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    Player:
                  </div>
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {data.player.name ?? "N/A"}
                  </div>
                </div>
              </div>
            )}

            {data.detail.includes("Substitution") && (
              <div className="flex flex-col gap-2">
                {data.player?.name && (
                  <div className="flex items-center gap-2">
                    <FaArrowUp className="text-red-400 w-5 h-5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Player Out:
                      </div>
                      <div className="text-base font-semibold text-red-400 dark:text-red-400">
                        {data.player.name ?? "N/A"}
                      </div>
                    </div>
                  </div>
                )}
                {data.assist?.name && (
                  <div className="flex items-center gap-2">
                    <FaArrowDown className="text-green-600 w-5 h-5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Player In:
                      </div>
                      <div className="text-base font-semibold text-green-800 dark:text-green-400">
                        {data.assist.name ?? "N/A"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {data.comments && (
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comments:
                </div>
                <div className="text-base font-semibold text-purple-800 dark:text-purple-400">
                  {data.comments}
                </div>
              </div>
            )}
          </div>
          <HoverCard.Arrow className="fill-blue-100 dark:fill-gray-700" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};