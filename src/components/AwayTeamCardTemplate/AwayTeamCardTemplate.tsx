type AwayTeamCardTemplateProps = {
  id: number;
  teamName: string;
  goals: {
    halftime: {
      home: number;
      away: number;
    },
    fulltime: {
      home: number;
      away: number;
    },
    extratime: {
      home: number;
      away: number;
    },
    penalty: {
      home: number;
      away: number;
    }
  },
  winner: boolean;
  totalGoals: {
    home: number;
    away: number;
  }
}

export const AwayTeamCardTemplate = ({ teamName, id, winner, totalGoals }: AwayTeamCardTemplateProps) => {
  return (
    <div key={id} className={`flex gap-2 ${winner ? 'dark:text-slate-200 text-slate-600' : 'dark:text-slate-500 text-slate-400'}`}>
      <div>
        {totalGoals.away}
      </div>

      <div>
        {teamName}
      </div>
    </div>
  )
}