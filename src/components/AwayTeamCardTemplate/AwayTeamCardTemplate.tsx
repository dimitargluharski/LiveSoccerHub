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
    <div key={id} className={`flex gap-2 font-bold ${winner ? 'text-slate-800' : 'text-slate-400'}`}>
      <div>
        {totalGoals.away}
      </div>

      {/* <div title="Half Time" className={`${goals.halftime.away ? 'text-slate-400' : 'text-slate-800'}`}>
        {goals.halftime.away}
      </div> */}

      <div>
        {teamName}
      </div>
    </div>
  )
}