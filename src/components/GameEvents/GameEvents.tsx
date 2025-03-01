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
  type: string
}

export const GameEvents = ({ events }: Event) => {
  console.log(events);
  return (
    <div className="flex justify-end">
      {events.length ? (<div className="flex items-center w-full">
        {`[${events.length} events]`}
      </div>) : 'N/A'}
    </div>
  )
}