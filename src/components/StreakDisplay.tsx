import React from 'react';
import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ currentStreak, longestStreak }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-full bg-primary/20 ${currentStreak > 0 ? 'animate-pulse-glow' : ''}`}>
          <Flame className={`h-6 w-6 ${currentStreak > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
          <p className="text-xs text-muted-foreground">Current Streak</p>
        </div>
      </div>
      
      <div className="h-10 w-px bg-border" />
      
      <div>
        <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
        <p className="text-xs text-muted-foreground">Best Streak</p>
      </div>
    </div>
  );
};
