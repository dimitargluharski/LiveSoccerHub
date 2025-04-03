import { useState } from "react";
import { Data } from "../HomePage";

interface DropdownProps {
  sortByTime: (data: Data[]) => void;
  sortByEventsCount: (data: Data[]) => void;
  data: Data[];
}

export const filterOpsions = [
  { id: 1, name: 'time', action: 'sortByTime' },
  { id: 2, name: 'events', action: 'sortByEventsCount' }
];

export const Filters = ({ sortByTime, sortByEventsCount, data }: DropdownProps) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleChange = (string: string) => {
    setActiveFilter(string);

    if (activeFilter === string) {
      setActiveFilter(null);
    } else if (string === 'time') {
      sortByTime(data);
    } else if (string === 'events') {
      sortByEventsCount(data);
    }
  };

  return (
    <div className="flex gap-1">
      {filterOpsions.map((filter, index) => (
        <div
          key={index}
          className={`rounded-md border-1 px-2 py-1 hover:cursor-pointer ${activeFilter === filter.name ? 'text-green-400' : 'text-slate-400'}`}
          onClick={() => handleChange(filter.name)}>
          {filter.name}
        </div>
      ))}
    </div>
  );
};