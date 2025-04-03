interface GamesCardProp {
  counter: number;
  text?: string;
  icon?: React.ReactElement;
}

export const GamesCard = ({ counter, text }: GamesCardProp) => {
  return (
    <div className="flex gap-1 items-center px-2 py-1 text-slate-400">
      <span>
        {counter}
      </span>

      <span>
        {text}
      </span>
    </div>
  )
}