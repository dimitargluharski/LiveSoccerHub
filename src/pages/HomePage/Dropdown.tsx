import { Data } from "../HomePage";

interface DropdownProps {
  sortByTime: (data: Data[]) => void;
  sortByEventsCount: (data: Data[]) => void;
  data: Data[];
}

export const dropdownOptions = [
  { id: 1, name: 'time', action: 'sortByTime' },
  { id: 2, name: 'events', action: 'sortByEventsCount' }
];

export const Dropdown = ({ sortByTime, sortByEventsCount, data }: DropdownProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    if (selectedOption === 'time') {
      sortByTime(data);
    } else if (selectedOption === 'events') {
      sortByEventsCount(data);
    }
  };

  return (
    <select name="dropdown" id="dropdown" className="p-2" onChange={handleChange}>
      {dropdownOptions.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};