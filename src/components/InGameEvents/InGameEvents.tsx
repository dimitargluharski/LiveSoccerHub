import { HoverCardComponent } from "@/pages/LiveGamesPage/HoverCard";

export interface Event {
  assist: {
    id: number | null;
    name: string | null;
  };
  comments: string | null;
  detail: string;
  player: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  time: {
    elapsed: number;
    extra: number | null;
  };
  type: string;
}

export const InGameEvents = ({ events }: { events: Event[] }) => {
  return (
    <div className="flex gap-2">
      {events.map((game, index) => (
        <HoverCardComponent key={index} data={game} />
      ))}
    </div>
  )
}