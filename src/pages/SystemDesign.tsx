import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CoinHUD } from '@/components/CoinHUD';
import { awardCoins, fetchCompletedEvents } from '@/lib/rewards';

type EntryMap = Record<string, string>;

const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getCalendarDays = (viewDate: Date) => {
  const start = startOfMonth(viewDate);
  const end = endOfMonth(viewDate);
  const startOffset = start.getDay();
  const totalDays = end.getDate();
  const days: Date[] = [];

  for (let i = startOffset; i > 0; i -= 1) {
    days.push(addDays(start, -i));
  }

  for (let i = 0; i < totalDays; i += 1) {
    days.push(addDays(start, i));
  }

  while (days.length % 7 !== 0) {
    days.push(addDays(end, days.length - (startOffset + totalDays) + 1));
  }

  return days;
};

const SystemDesign = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedAt, setPausedAt] = useState<string | null>(null);
  const [stoppedAt, setStoppedAt] = useState<string | null>(null);
  const [rewardedEntries, setRewardedEntries] = useState<Set<string>>(new Set());
  const [entries, setEntries] = useState<EntryMap>({});
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      const { data: settingsRow } = await supabase
        .from('user_system_design_settings')
        .select('start_date, is_paused, paused_at, stopped_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (settingsRow?.start_date) {
        setStartDate(settingsRow.start_date);
      }
      setIsPaused(Boolean(settingsRow?.is_paused));
      setPausedAt(settingsRow?.paused_at ?? null);
      setStoppedAt(settingsRow?.stopped_at ?? null);

      const { data: rows } = await supabase
        .from('user_system_design_entries')
        .select('entry_date, content')
        .eq('user_id', user.id);

      const map: EntryMap = {};
      (rows || []).forEach((row) => {
        map[row.entry_date] = row.content;
      });
      setEntries(map);
    };

    loadData();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchCompletedEvents(user.id, 'system-design')
      .then(setRewardedEntries)
      .catch(() => setRewardedEntries(new Set()));
  }, [user]);

  useEffect(() => {
    const iso = toISODate(selectedDate);
    setNote(entries[iso] || '');
  }, [selectedDate, entries]);

  const todayIso = toISODate(new Date());
  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  const stats = useMemo(() => {
    if (!startDate) {
      return { learned: 0, missed: 0, total: 0 };
    }
    const start = new Date(startDate);
    const today = new Date();
    const endIso = stoppedAt || (isPaused ? pausedAt : null) || toISODate(today);
    const endDate = endIso ? new Date(endIso) : today;
    const total = Math.max(0, Math.floor((endDate.getTime() - start.getTime()) / 86400000) + 1);
    let learned = 0;
    for (let i = 0; i < total; i += 1) {
      const iso = toISODate(addDays(start, i));
      if (entries[iso]) learned += 1;
    }
    const daysEligible = Math.max(0, total - 1);
    const missed = Math.max(0, daysEligible - learned);
    return { learned, missed, total };
  }, [startDate, entries, isPaused, pausedAt, stoppedAt]);

  const handleStart = async () => {
    if (!user) return;
    const today = toISODate(new Date());
    const { error } = await supabase
      .from('user_system_design_settings')
      .upsert({ user_id: user.id, start_date: today, is_paused: false, paused_at: null, stopped_at: null }, { onConflict: 'user_id' });
    if (!error) {
      setStartDate(today);
      setIsPaused(false);
      setPausedAt(null);
      setStoppedAt(null);
    }
  };

  const handlePauseToggle = async () => {
    if (!user || !startDate || stoppedAt) return;
    const nextPaused = !isPaused;
    const nextPausedAt = nextPaused ? toISODate(new Date()) : null;
    const { error } = await supabase
      .from('user_system_design_settings')
      .update({ is_paused: nextPaused, paused_at: nextPausedAt })
      .eq('user_id', user.id);
    if (!error) {
      setIsPaused(nextPaused);
      setPausedAt(nextPausedAt);
    }
  };

  const handleStop = async () => {
    if (!user || !startDate || stoppedAt) return;
    const stopDate = toISODate(new Date());
    const { error } = await supabase
      .from('user_system_design_settings')
      .update({ stopped_at: stopDate, is_paused: false, paused_at: null })
      .eq('user_id', user.id);
    if (!error) {
      setStoppedAt(stopDate);
      setIsPaused(false);
      setPausedAt(null);
    }
  };

  const handleReset = async () => {
    if (!user) return;
    await supabase.from('user_system_design_entries').delete().eq('user_id', user.id);
    await supabase.from('user_system_design_settings').delete().eq('user_id', user.id);
    setEntries({});
    setStartDate(null);
    setIsPaused(false);
    setPausedAt(null);
    setStoppedAt(null);
    setNote('');
    setSelectedDate(new Date());
    setViewDate(new Date());
  };

  const handleSave = async () => {
    if (!user) return;
    const iso = toISODate(selectedDate);
    if (!note.trim()) return;
    setSaving(true);
    const nextContent = note.trim();
    setEntries((prev) => ({ ...prev, [iso]: nextContent }));
    const { error } = await supabase
      .from('user_system_design_entries')
      .upsert({
        user_id: user.id,
        entry_date: iso,
        content: nextContent,
      }, { onConflict: 'user_id,entry_date' });
    setSaving(false);
    if (error) {
      setEntries((prev) => {
        const copy = { ...prev };
        delete copy[iso];
        return copy;
      });
      return;
    }

    if (!rewardedEntries.has(iso)) {
      const result = await awardCoins({
        userId: user.id,
        eventType: 'system-design',
        eventId: iso,
        coins: 1,
      });
      if (result.awarded) {
        setRewardedEntries(prev => new Set([...prev, iso]));
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={() => supabase.auth.signOut()} userName={user.email} />
      <CoinHUD />
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">System Design Tracker</h1>
            <p className="text-muted-foreground">
              Track what you learn daily. Missed days are auto-counted from your start date.
            </p>
          </div>

          {!startDate ? (
            <Card className="stat-card border-border">
              <CardContent className="py-10 flex flex-col items-center gap-4">
                <Calendar className="h-10 w-10 text-primary" />
                <div className="text-center space-y-2">
                  <h2 className="text-lg font-semibold">Start your system design streak</h2>
                  <p className="text-sm text-muted-foreground">
                    Click start to begin tracking and missed days will be counted from today.
                  </p>
                </div>
                <Button onClick={handleStart}>Start</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="stat-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Learned Days</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-2xl font-semibold">{stats.learned}</span>
                </CardContent>
              </Card>
              <Card className="stat-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Missed Days</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="text-2xl font-semibold">{stats.missed}</span>
                </CardContent>
              </Card>
              <Card className="stat-card border-border">
                <CardHeader>
                  <CardTitle className="text-base">Total Tracked Days</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-semibold">{stats.total}</span>
                </CardContent>
              </Card>
            </div>
          )}

          {startDate && (
            <Card className="stat-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Controls</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={handlePauseToggle}
                  disabled={Boolean(stoppedAt)}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleStop}
                  disabled={Boolean(stoppedAt)}
                >
                  {stoppedAt ? 'Stopped' : 'Stop'}
                </Button>
                <Button variant="destructive" onClick={handleReset}>
                  Reset
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <Card className="stat-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setViewDate(addDays(viewDate, -30))}>Prev</Button>
                  <Button variant="outline" size="sm" onClick={() => setViewDate(new Date())}>Today</Button>
                  <Button variant="outline" size="sm" onClick={() => setViewDate(addDays(viewDate, 30))}>Next</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 text-xs text-muted-foreground mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day) => {
                    const iso = toISODate(day);
                    const inMonth = day.getMonth() === viewDate.getMonth();
                    const isSelected = iso === toISODate(selectedDate);
                    const isCompleted = Boolean(entries[iso]);
                    const isStartTracked = startDate ? iso >= startDate : false;
                    const endIso = stoppedAt || (isPaused ? pausedAt : null) || todayIso;
                    const isMissed = Boolean(
                      startDate &&
                      iso <= endIso &&
                      isStartTracked &&
                      iso !== startDate &&
                      !isCompleted
                    );
                    const streakCount = startDate && iso <= endIso
                      ? (() => {
                          let count = 0;
                          let cursor = new Date(day);
                          while (true) {
                            const cursorIso = toISODate(cursor);
                            if (cursorIso < startDate || !entries[cursorIso]) break;
                            count += 1;
                            cursor = addDays(cursor, -1);
                          }
                          return count;
                        })()
                      : 0;

                    const label = isCompleted
                      ? `Completed: ${entries[iso].slice(0, 120)}`
                      : isMissed
                        ? 'Missed'
                        : 'No entry';

                    return (
                      <Tooltip key={iso}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => setSelectedDate(day)}
                            className={cn(
                              'h-12 rounded-md border border-border flex flex-col items-center justify-center text-xs transition-colors',
                              isSelected && 'border-primary/60 bg-primary/10',
                              inMonth ? 'text-foreground' : 'text-muted-foreground',
                              isCompleted && 'bg-success/10 border-success/40',
                              isMissed && 'bg-destructive/10 border-destructive/40'
                            )}
                          >
                            <span>{day.getDate()}</span>
                            {isCompleted && streakCount > 0 && (
                              <span className="text-[10px] text-warning leading-none">🔥</span>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">{label}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="stat-card border-border">
              <CardHeader>
                <CardTitle>Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={8}
                  className="w-full rounded-md border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  placeholder="Write what you studied: topic, article, summary, insights..."
                />
                <Button onClick={handleSave} disabled={!note.trim() || saving || !startDate || Boolean(stoppedAt) || isPaused}>
                  {saving ? 'Saving...' : 'Save Entry'}
                </Button>
                {isPaused && (
                  <p className="text-xs text-muted-foreground">Tracking is paused. Resume to add entries.</p>
                )}
                {stoppedAt && (
                  <p className="text-xs text-muted-foreground">Tracking is stopped. Reset to start again.</p>
                )}
                {entries[toISODate(selectedDate)] && (
                  <div className="rounded-md border border-border p-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <FileText className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                    <p className="whitespace-pre-wrap">{entries[toISODate(selectedDate)]}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemDesign;
