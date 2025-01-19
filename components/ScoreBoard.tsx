import {ScoreBoardProps} from '../types/game'
  
  export function ScoreBoard({ playerName, playerScore, computerScore }: ScoreBoardProps) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-2 shadow-lg flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-medium">{playerName}</span>
          <span className="text-2xl font-bold text-emerald-500">{playerScore}</span>
        </div>
        <span className="text-gray-400 font-medium">vs</span>
        <div className="flex items-center gap-2">
          <span className="text-rose-600 font-medium">Computer</span>
          <span className="text-2xl font-bold text-rose-500">{computerScore}</span>
        </div>
      </div>
    );
  }