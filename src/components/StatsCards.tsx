import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, BookOpen, Target, Flame } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    total: number;
    completed: number;
    revisions: number;
    percentage: number;
    byDifficulty: {
      easy: { total: number; completed: number };
      medium: { total: number; completed: number };
      hard: { total: number; completed: number };
    };
  };
  streak: {
    currentStreak: number;
    longestStreak: number;
  };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, streak }) => {
  const cards = [
    {
      label: 'Problems Solved',
      value: stats.completed,
      subtext: `of ${stats.total}`,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Current Streak',
      value: streak.currentStreak,
      subtext: 'days',
      icon: Flame,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'For Revision',
      value: stats.revisions,
      subtext: 'problems',
      icon: BookOpen,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'Completion',
      value: `${stats.percentage}%`,
      subtext: 'overall',
      icon: Target,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className="stat-card border-border card-hover">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.subtext}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
