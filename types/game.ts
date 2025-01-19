// types/game.ts
export type Choice = 'rock' | 'paper' | 'scissors';
export type GameStage = 'name' | 'rules' | 'selection' | 'computerShow' | 'removal' | 'result';

export interface ScoreBoardProps {
    playerName: string;
    playerScore: number;
    computerScore: number;
}

export interface ChoiceButtonProps {
  choice: Choice;
  selected?: boolean;
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}
