interface GamesCardProp {
  counter: number;
  text?: string;
  icon?: React.ReactElement;
}

export const GamesCard = ({ counter, text }: GamesCardProp) => {
  return (
    // <div className="w-full flex rounded-md bg-white-500 bg-slate-200 p-2 shadow-md">
    <div className="flex p-2 bg-slate-200 rounded-md">
      {counter} {text}
    </div>
    // </div>
  )
}