import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface StreakHeatmapProps {
  streakDates: string[];
  currentStreak: number;
  longestStreak: number;
}

const toISODate = (date: Date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return normalized.toISOString().split('T')[0];
};

export const StreakHeatmap: React.FC<StreakHeatmapProps> = ({
  streakDates,
  currentStreak,
  longestStreak,
}) => {
  const activeSet = useMemo(() => new Set(streakDates), [streakDates]);
  const totalActiveDays = activeSet.size;

  const { weeks, monthLabels, todayIso, rangeStart, rangeEnd } = useMemo(() => {
    const end = new Date();
    const endIso = toISODate(end);
    const endDate = new Date(endIso);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);

    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const weeksCollection: Array<Array<Date | null>> = [];
    const monthLabelRow: string[] = [];

    let cursor = new Date(startOfWeek);
    while (cursor <= endDate) {
      const weekIndex = Math.floor((cursor.getTime() - startOfWeek.getTime()) / (1000 * 60 * 60 * 24 * 7));
      if (!weeksCollection[weekIndex]) {
        weeksCollection[weekIndex] = new Array(7).fill(null);
      }
      weeksCollection[weekIndex][cursor.getDay()] = new Date(cursor);
      cursor.setDate(cursor.getDate() + 1);
    }

    weeksCollection.forEach((week, index) => {
      const monthStart = week.find(day => day && day.getDate() === 1);
      if (monthStart) {
        monthLabelRow[index] = monthStart.toLocaleString('en-US', { month: 'short' });
      } else {
        monthLabelRow[index] = '';
      }
    });

    return {
      weeks: weeksCollection,
      monthLabels: monthLabelRow,
      todayIso: endIso,
      rangeStart: startDate,
      rangeEnd: endDate,
    };
  }, [streakDates]);

  return (
    <Card className="stat-card border-border">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="flex items-center gap-2">
          <Flame className={`h-5 w-5 ${currentStreak > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
          Streak Activity
        </CardTitle>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span>Total active days: {totalActiveDays}</span>
          <span>Current streak: {currentStreak}</span>
          <span>Max streak: {longestStreak}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="flex flex-col items-center gap-1">
              <div className="text-[10px] text-muted-foreground h-3">
                {monthLabels[weekIndex]}
              </div>
              <div className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-3 w-3 rounded-sm" />;
                  }

                  const dayIso = toISODate(day);
                  const inRange = day >= rangeStart && day <= rangeEnd;
                  const isActive = inRange && activeSet.has(dayIso);
                  const isToday = dayIso === todayIso;

                  return (
                    <div
                      key={`cell-${weekIndex}-${dayIndex}`}
                      className={`h-3 w-3 rounded-sm ${
                        inRange ? 'bg-muted/60' : 'bg-transparent'
                      } ${isActive ? 'bg-success/80' : ''} ${isToday ? 'ring-1 ring-primary' : ''}`}
                      title={dayIso}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{rangeStart.toLocaleString('en-US', { month: 'short' })}</span>
          <span>{rangeEnd.toLocaleString('en-US', { month: 'short' })}</span>
        </div>
      </CardContent>
    </Card>
  );
};
