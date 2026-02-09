import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface StreakCalendarProps {
  streakDates: string[];
  currentStreak: number;
  longestStreak: number;
}

const toISODate = (date: Date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return normalized.toISOString().split('T')[0];
};

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
  streakDates,
  currentStreak,
  longestStreak,
}) => {
  const [viewDate, setViewDate] = useState(() => new Date());
  const activeSet = useMemo(() => new Set(streakDates), [streakDates]);
  const todayIso = toISODate(new Date());

  const { days, monthLabel, yearLabel } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

    const calendarDays: Array<{ date: Date | null; iso?: string }> = [];
    for (let i = 0; i < totalCells; i += 1) {
      const dayNumber = i - startWeekday + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        calendarDays.push({ date: null });
      } else {
        const date = new Date(year, month, dayNumber);
        calendarDays.push({ date, iso: toISODate(date) });
      }
    }

    return {
      days: calendarDays,
      monthLabel: viewDate.toLocaleString('en-US', { month: 'long' }),
      yearLabel: viewDate.getFullYear(),
    };
  }, [viewDate]);

  return (
    <Card className="stat-card border-border">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flame className={`h-5 w-5 ${currentStreak > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
            Streak Calendar
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            Best: {longestStreak} days
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current streak</p>
            <p className="text-2xl font-bold">{currentStreak} days</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            >
              <ChevronLeft />
            </Button>
            <div className="text-sm font-medium">
              {monthLabel} {yearLabel}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((entry, index) => {
            if (!entry.date || !entry.iso) {
              return <div key={`empty-${index}`} className="h-8 w-8" />;
            }

            const isActive = activeSet.has(entry.iso);
            const isToday = entry.iso === todayIso;

            return (
              <div
                key={entry.iso}
                className={`h-8 w-8 rounded-full flex flex-col items-center justify-center text-sm ${
                  isToday ? 'ring-2 ring-primary' : ''
                }`}
              >
                <span className={`${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {entry.date.getDate()}
                </span>
                {isActive ? (
                  <Flame className="h-3 w-3 text-primary" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
