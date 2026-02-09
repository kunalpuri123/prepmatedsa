import React from 'react';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/data/dsaProblems';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className }) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold';
  
  const difficultyClasses = {
    Easy: 'difficulty-easy',
    Medium: 'difficulty-medium',
    Hard: 'difficulty-hard',
  };

  return (
    <span className={cn(baseClasses, difficultyClasses[difficulty], className)}>
      {difficulty}
    </span>
  );
};
