import { Choice } from "@/types/game";
import {ChoiceButtonProps}  from '../types/game'
  
  export function ChoiceButton({ choice, selected, onClick, size = 'medium', disabled }: ChoiceButtonProps) {
    const getEmoji = (choice: Choice) => {
      switch (choice) {
        case 'rock': return '🪨';
        case 'paper': return '📄';
        case 'scissors': return '✂️';
      }
    };
  
    const sizeClasses = {
      small: 'text-2xl p-3',
      medium: 'text-3xl p-4',
      large: 'text-4xl p-6'
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${sizeClasses[size]}
          rounded-full transition-all duration-300
          ${selected ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
          shadow-md
        `}
      >
        <span>{getEmoji(choice)}</span>
      </button>
    );
  }