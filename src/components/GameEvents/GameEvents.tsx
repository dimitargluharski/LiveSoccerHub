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
      {events.length ? (<div className={`flex items-center w-full p-2 ${events.length >= 10 ? 'dark:bg-red-500/60 bg-red-500/65 text-white rounded-md' : ''}`}>
        {`${events.length} events`}
      </div>) : 'N/A'}
    </div>
  )
}