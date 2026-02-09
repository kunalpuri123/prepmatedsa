import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ProblemProgress } from '@/hooks/useDSAProgress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SubmissionHeatmapProps {
  userId: string;
  progress?: Record<string, ProblemProgress>;
}

type DailyCounts = Record<string, number>;

const toISODate = (date: Date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return normalized.toISOString().split('T')[0];
};
const fromISODateLocal = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

const getIntensityClass = (count: number) => {
  if (count >= 6) return 'bg-success';
  if (count >= 3) return 'bg-success/70';
  if (count >= 1) return 'bg-success/40';
  return 'bg-muted/60';
};

export const SubmissionHeatmap: React.FC<SubmissionHeatmapProps> = ({ userId, progress }) => {
  const [dailyCounts, setDailyCounts] = useState<DailyCounts>({});
  const [submissionCounts, setSubmissionCounts] = useState<DailyCounts>({});
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const years = useMemo(() => {
    const result: number[] = [];
    for (let y = currentYear; y >= currentYear - 4; y -= 1) {
      result.push(y);
    }
    return result;
  }, [currentYear]);

  const progressCounts = useMemo(() => {
    if (!progress) return {};
    const counts: DailyCounts = {};
    Object.values(progress).forEach((entry) => {
      if (entry.completed && entry.completedAt) {
        const date = new Date(entry.completedAt);
        if (date.getFullYear() !== year) return;
        const iso = toISODate(date);
        counts[iso] = (counts[iso] || 0) + 1;
      }
    });
    return counts;
  }, [progress, year]);

  const load = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
    const { data, error } = await supabase
      .from('user_submissions')
      .select('created_at')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (error) {
      console.error('Error loading submissions:', error);
      if (isMounted) setIsLoading(false);
      return;
    }

    const counts: DailyCounts = {};
    (data || []).forEach((row) => {
      const iso = toISODate(new Date(row.created_at));
      counts[iso] = (counts[iso] || 0) + 1;
    });

    if (!isMounted) return;
    setSubmissionCounts(counts);
    setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, [userId, year, progressCounts]);

  useEffect(() => {
    let mounted = true;
    load();
    return () => {
      mounted = false;
    };
  }, [load]);

  useEffect(() => {
    const merged: DailyCounts = { ...submissionCounts };
    Object.entries(progressCounts).forEach(([date, count]) => {
      merged[date] = Math.max(merged[date] || 0, count);
    });
    setDailyCounts(merged);
  }, [progressCounts, submissionCounts]);

  useEffect(() => {
    const channel = supabase
      .channel(`user_submissions_${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'user_submissions', filter: `user_id=eq.${userId}` },
        (payload) => {
          const createdAt = (payload.new as { created_at: string }).created_at;
          const createdYear = new Date(createdAt).getFullYear();
          if (createdYear === year) {
            setSubmissionCounts(prev => {
              const iso = toISODate(new Date(createdAt));
              return { ...prev, [iso]: (prev[iso] || 0) + 1 };
            });
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId, year]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ createdAt: string }>).detail;
      if (!detail?.createdAt) return;
      const createdYear = new Date(detail.createdAt).getFullYear();
      if (createdYear !== year) return;
      const iso = toISODate(new Date(detail.createdAt));
      setSubmissionCounts(prev => ({ ...prev, [iso]: (prev[iso] || 0) + 1 }));
    };

    window.addEventListener('submission-created', handler);
    return () => {
      window.removeEventListener('submission-created', handler);
    };
  }, [year]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ completedAt: string; completed: boolean }>).detail;
      if (!detail?.completedAt || !detail.completed) return;
      const createdYear = new Date(detail.completedAt).getFullYear();
      if (createdYear !== year) return;
      const iso = toISODate(new Date(detail.completedAt));
      setDailyCounts(prev => ({ ...prev, [iso]: Math.max(prev[iso] || 0, 1) }));
    };

    window.addEventListener('progress-completed', handler);
    return () => {
      window.removeEventListener('progress-completed', handler);
    };
  }, [year]);

  const {
    weeks,
    monthLabels,
    totalSubmissions,
    activeDays,
    currentStreak,
    maxStreak,
    rangeStart,
    rangeEnd,
  } = useMemo(() => {
    const endDate = new Date(year, 11, 31);
    const startDate = new Date(year, 0, 1);
    const endIso = toISODate(endDate);

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
      monthLabelRow[index] = monthStart ? monthStart.toLocaleString('en-US', { month: 'short' }) : '';
    });

    const dailyEntries = Object.entries(dailyCounts);
    const total = dailyEntries.reduce((sum, [, count]) => sum + count, 0);
    const active = dailyEntries.filter(([, count]) => count > 0).length;

    const sortedDates = dailyEntries
      .filter(([, count]) => count > 0)
      .map(([date]) => date)
      .sort();

    let max = 0;
    let run = 0;
    let prev: string | null = null;
    sortedDates.forEach((date) => {
      if (!prev) {
        run = 1;
      } else {
        const diff = (new Date(date).getTime() - new Date(prev).getTime()) / (1000 * 60 * 60 * 24);
        run = diff === 1 ? run + 1 : 1;
      }
      max = Math.max(max, run);
      prev = date;
    });

    let current = 0;
    const streakStart = year === currentYear ? new Date() : fromISODateLocal(endIso);
    const streakCursor = new Date(streakStart.getFullYear(), streakStart.getMonth(), streakStart.getDate());
    while (true) {
      const iso = toISODate(streakCursor);
      if (dailyCounts[iso]) {
        current += 1;
        streakCursor.setDate(streakCursor.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      weeks: weeksCollection,
      monthLabels: monthLabelRow,
      totalSubmissions: total,
      activeDays: active,
      currentStreak: current,
      maxStreak: Math.max(max, current),
      rangeStart: startDate,
      rangeEnd: endDate,
    };
  }, [dailyCounts, year]);

  return (
    <Card className="stat-card border-border">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <CardTitle>Submissions Heatmap</CardTitle>
          <Select value={String(year)} onValueChange={(value) => setYear(parseInt(value, 10))}>
            <SelectTrigger className="h-8 w-24 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((yr) => (
                <SelectItem key={yr} value={String(yr)}>{yr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span>Total submissions: {totalSubmissions}</span>
          <span>Total active days: {activeDays}</span>
          <span>Current streak: {currentStreak}</span>
          <span>Max streak: {maxStreak}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading heatmap...</div>
        ) : (
          <div className="flex gap-1 overflow-x-auto pb-2">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="flex flex-col items-center gap-1">
                <div className="text-[10px] text-muted-foreground h-3">{monthLabels[weekIndex]}</div>
                <div className="grid grid-rows-7 gap-1">
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-3 w-3 rounded-sm" />;
                    }
                    const dayIso = toISODate(day);
                    const count = dailyCounts[dayIso] || 0;
                    return (
                      <div
                        key={`cell-${weekIndex}-${dayIndex}`}
                        title={`${count} submissions on ${day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                        className={`h-3 w-3 rounded-sm ${getIntensityClass(count)}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{rangeStart.toLocaleString('en-US', { month: 'short' })}</span>
          <span>{rangeEnd.toLocaleString('en-US', { month: 'short' })}</span>
        </div>
      </CardContent>
    </Card>
  );
};
