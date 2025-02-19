type TimeCardTemplateType = {
  time: {
    long: string;
    short: string;
    elapsed: number;
    extra: number;
  }
}

export const TimeCardTemplate = ({ time }: TimeCardTemplateType) => {
  return (
    <div className="flex">
      <span>
        {time.elapsed}
      </span>

      <span className="animate-pulse text-lg">
        '
      </span>
    </div>
  )
}