import { getEventCountString } from "../../utils/getEventCountString";

interface Event {
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
  events: []
}

export const GameEvents = ({ events }: Event) => {
  return (
    <div className="flex justify-end text-slate-500">
      {events.length ? (<div className={`flex items-center w-full p-2 ${events.length >= 10 ? 'dark:text-red-500/60 text-red-500/65  rounded-md' : ''}`}>
        {getEventCountString(events.length)}
      </div>) : 'N/A'}
    </div>
  )
}