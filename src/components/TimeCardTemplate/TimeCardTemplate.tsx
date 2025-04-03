type TimeCardTemplateType = {
  time: {
    long: string;
    short: string;
    elapsed: number;
    extra: number;
  },
}


export const TimeCardTemplate = ({ time }: TimeCardTemplateType) => {
  return (
    <div className="flex text-slate-500">
      <span>
        {time.elapsed === 90 ? (<div>{time.elapsed}+{time.extra}</div>) : time.elapsed}
      </span>

      <span className="animate-pulse text-lg">
        '
      </span>
    </div>
  )
}