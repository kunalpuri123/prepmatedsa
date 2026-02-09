import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DifficultyChartProps {
  byDifficulty: {
    easy: { total: number; completed: number };
    medium: { total: number; completed: number };
    hard: { total: number; completed: number };
  };
}

export const DifficultyChart: React.FC<DifficultyChartProps> = ({ byDifficulty }) => {
  const difficulties = [
    { key: 'easy', label: 'Easy', color: 'bg-easy', textColor: 'text-easy' },
    { key: 'medium', label: 'Medium', color: 'bg-medium', textColor: 'text-medium' },
    { key: 'hard', label: 'Hard', color: 'bg-hard', textColor: 'text-hard' },
  ] as const;

  return (
    <Card className="stat-card border-border">
      <CardHeader>
        <CardTitle>Progress by Difficulty</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {difficulties.map((diff) => {
          const data = byDifficulty[diff.key];
          const percentage = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
          
          return (
            <div key={diff.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${diff.textColor}`}>{diff.label}</span>
                <span className="text-sm text-muted-foreground">
                  {data.completed}/{data.total}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-bar-fill ${diff.color}`}
                  style={{ width: `${percentage}%`, background: undefined }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
