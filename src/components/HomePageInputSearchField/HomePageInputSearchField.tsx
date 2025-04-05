type HomePageInputSearchField = {
  handleInputChange: (event: any) => void;
  searchTerm: string;
}

export const HomePageInputSearchField = ({ handleInputChange, searchTerm }: HomePageInputSearchField) => {
  return (
    <div className="w-full rounded-md">
      <input type="text" placeholder="Search..." className="w-full p-2 rounded-md shadow-md focus:shadow-2xl" onChange={handleInputChange} value={searchTerm} />
    </div>
  )
}