import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { getAllProblems } from '@/data/dsaProblems';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ExternalLink, Trophy, Flame, CalendarPlus, Star, StarOff } from 'lucide-react';
import { fetchLeetCodePotd } from '@/lib/leetcode';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { awardCoins, fetchCompletedEvents } from '@/lib/rewards';


const toISODate = (date: Date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return normalized.toISOString().split('T')[0];
};

const startOfWeek = (date: Date) => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
};

const endOfWeek = (date: Date) => {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  return d;
};

const CONTEST_ENDPOINTS = [
  { key: 'codechef', label: 'CodeChef', url: 'https://contest-hive.vercel.app/api/codechef' },
  { key: 'leetcode', label: 'LeetCode', url: 'https://contest-hive.vercel.app/api/leetcode' },
  { key: 'codeforces', label: 'Codeforces', url: 'https://contest-hive.vercel.app/api/codeforces' },
];

type ContestItem = {
  title: string;
  url: string;
  startTime: string;
  endTime: string;
  duration: number;
  platform: string;
};

const buildGoogleCalendarLink = (contest: ContestItem) => {
  const start = new Date(contest.startTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(contest.endTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const details = `Contest link: ${contest.url}`;
  const location = contest.platform;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: contest.title,
    dates: `${start}/${end}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

type PotdItem = {
  date: string;
  title: string;
  difficulty: string;
  link: string;
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [contests, setContests] = useState<ContestItem[]>([]);
  const [potd, setPotd] = useState<PotdItem | null>(null);
  const [completedContests, setCompletedContests] = useState<Set<string>>(new Set());
  const [potdCompleted, setPotdCompleted] = useState(false);
  const contestOriginRef = useRef<{ x: number; y: number } | null>(null);
  const potdOriginRef = useRef<{ x: number; y: number } | null>(null);
  const problemOriginRef = useRef<{ x: number; y: number } | null>(null);
  const problemRevisionOriginRef = useRef<{ x: number; y: number } | null>(null);

  const { planner, progress, toggleProblemComplete, toggleRevision } = useDSAProgress(user?.id);
  const problemsMap = useMemo(() => {
    const all = getAllProblems();
    return all.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<string, typeof all[number]>);
  }, []);

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
    let isMounted = true;
    const loadContests = async () => {
      try {
        const responses = await Promise.all(
          CONTEST_ENDPOINTS.map(async (platform) => {
            const response = await fetch(platform.url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${platform.label}`);
            }
            const data = await response.json();
            return data?.data || [];
          }),
        );
        const merged = responses.flat() as ContestItem[];
        const upcoming = merged
          .filter((contest) => new Date(contest.startTime).toString() !== 'Invalid Date')
          .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        if (isMounted) setContests(upcoming);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };

    loadContests();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchCompletedEvents(user.id, 'contest')
      .then(setCompletedContests)
      .catch(() => setCompletedContests(new Set()));
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    const loadPotd = async () => {
      try {
        const data = await fetchLeetCodePotd();
        if (isMounted) {
          setPotd({
            date: data.date,
            title: data.title,
            difficulty: data.difficulty,
            link: data.link,
          });
        }
      } catch (error) {
        console.error('Failed to load POTD', error);
      }
    };
    loadPotd();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user || !potd?.date) return;
    fetchCompletedEvents(user.id, 'potd')
      .then((completed) => setPotdCompleted(completed.has(`potd-${potd.date}`)))
      .catch(() => setPotdCompleted(false));
  }, [user, potd?.date]);


  const monthDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7;

    const cells: Array<Date | null> = [];
    for (let i = 0; i < totalCells; i += 1) {
      const dayNumber = i - startWeekday + 1;
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        cells.push(null);
      } else {
        cells.push(new Date(year, month, dayNumber));
      }
    }
    return cells;
  }, [viewDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, idx) => {
      const d = new Date(start);
      d.setDate(d.getDate() + idx);
      return d;
    });
  }, [selectedDate]);

  const selectedIso = toISODate(selectedDate);
  const todayIso = toISODate(new Date());
  const selectedDayPlan = planner.dayPlans.find(p => p.date === selectedIso);
  const selectedProblems = selectedDayPlan?.problems.map(id => problemsMap[id]).filter(Boolean) || [];
  const potdDate = potd?.date ? toISODate(new Date(potd.date)) : null;
  const contestsByDate = useMemo(() => {
    return contests.reduce((acc, contest) => {
      const iso = toISODate(new Date(contest.startTime));
      acc[iso] = acc[iso] ? [...acc[iso], contest] : [contest];
      return acc;
    }, {} as Record<string, ContestItem[]>);
  }, [contests]);
  const selectedContests = contestsByDate[selectedIso] || [];
  const getContestEventId = (contest: ContestItem) => `contest-${contest.platform}-${contest.title}-${contest.startTime}`;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={() => supabase.auth.signOut()} userName={user.email} />

      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <CalendarIcon className="h-7 w-7 text-primary" />
                Calendar
              </h1>
              <p className="text-muted-foreground mt-1">Plan and track problems by date</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
                Today
              </Button>
              <Select value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
                <SelectTrigger className="w-28 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="stat-card border-border lg:col-span-2">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>
                  {viewDate.toLocaleString('en-US', { month: 'long' })} {viewDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-xs text-muted-foreground mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="text-center">{day}</div>
                  ))}
                </div>
                {viewMode === 'month' ? (
                  <div className="grid grid-cols-7 gap-2">
                    {monthDays.map((date, index) => {
                      if (!date) return <div key={`empty-${index}`} className="h-12" />;
                      const iso = toISODate(date);
                      const isSelected = iso === selectedIso;
                      const isToday = iso === todayIso;
                      const hasPlan = planner.dayPlans.some(p => p.date === iso);
                      const hasContest = Boolean(contestsByDate[iso]?.length);
                      const hasPotd = potdDate === iso;
                      return (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`h-12 rounded-lg border text-sm font-medium flex flex-col items-center justify-center transition ${
                            isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/60'
                          } ${isToday ? 'ring-2 ring-primary/50' : ''}`}
                        >
                          <span>{date.getDate()}</span>
                          <div className="flex items-center gap-1 mt-1">
                            {hasPlan && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
                            {hasContest && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                            {hasPotd && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((date) => {
                      const iso = toISODate(date);
                      const isSelected = iso === selectedIso;
                      const isToday = iso === todayIso;
                      const hasPlan = planner.dayPlans.some(p => p.date === iso);
                      const hasContest = Boolean(contestsByDate[iso]?.length);
                      const hasPotd = potdDate === iso;
                      return (
                        <button
                          key={iso}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`h-16 rounded-lg border text-sm font-medium flex flex-col items-center justify-center transition ${
                            isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/60'
                          } ${isToday ? 'ring-2 ring-primary/50' : ''}`}
                        >
                          <span>{date.getDate()}</span>
                          <span className="text-xs text-muted-foreground">
                            {date.toLocaleString('en-US', { weekday: 'short' })}
                          </span>
                          <div className="flex items-center gap-1 mt-1">
                            {hasPlan && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
                            {hasContest && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                            {hasPotd && <span className="h-1.5 w-1.5 rounded-full bg-warning" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="stat-card border-border">
                <CardHeader>
                  <CardTitle>
                    {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {selectedProblems.length > 0 ? 'Today’s Problems' : 'No problems scheduled'}
                  </div>
                  {selectedProblems.length > 0 && (
                    <div className="space-y-2">
                      {selectedProblems.map(problem => (
                        <div
                          key={problem.id}
                          className={`rounded-md border px-3 py-2 text-sm flex items-center gap-3 ${
                            progress[problem.id]?.completed ? 'border-success/40 bg-success/5' : 'border-border'
                          }`}
                        >
                          <Checkbox
                            checked={!!progress[problem.id]?.completed}
                            onPointerDown={(event) => {
                              problemOriginRef.current = { x: event.clientX, y: event.clientY };
                            }}
                            onCheckedChange={() => {
                              toggleProblemComplete(problem.id, problemOriginRef.current ?? undefined);
                              problemOriginRef.current = null;
                            }}
                            className="h-4 w-4 border-2 data-[state=checked]:bg-success data-[state=checked]:border-success"
                          />
                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:text-primary transition-colors ${
                              progress[problem.id]?.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                            }`}
                          >
                            {problem.title}
                          </a>
                          <button
                            type="button"
                            onPointerDown={(event) => {
                              problemRevisionOriginRef.current = { x: event.clientX, y: event.clientY };
                            }}
                            onClick={() => {
                              toggleRevision(problem.id, problemRevisionOriginRef.current ?? undefined);
                              problemRevisionOriginRef.current = null;
                            }}
                            className={`ml-auto h-7 w-7 inline-flex items-center justify-center rounded-md border border-border ${
                              progress[problem.id]?.revision
                                ? 'text-warning border-warning/40 bg-warning/10'
                                : 'text-muted-foreground hover:text-warning'
                            }`}
                            aria-label="Mark revision"
                          >
                            {progress[problem.id]?.revision ? (
                              <Star className="h-3.5 w-3.5 fill-current" />
                            ) : (
                              <StarOff className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedContests.length > 0 && (
                    <div className="pt-3 border-t border-border">
                      <div className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        Contests
                      </div>
                      <div className="space-y-2">
                        {selectedContests.map(contest => (
                          <div key={`${contest.platform}-${contest.title}`} className="rounded-md border border-border px-3 py-2 text-xs flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium">{contest.title}</div>
                              <div className="text-muted-foreground">{contest.platform} · {new Date(contest.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2 text-xs">
                                <Checkbox
                                  checked={completedContests.has(getContestEventId(contest))}
                                  onPointerDown={(event) => {
                                    contestOriginRef.current = { x: event.clientX, y: event.clientY };
                                  }}
                                  onCheckedChange={async (value) => {
                                    if (!user) return;
                                    const checked = Boolean(value);
                                    if (!checked) return;
                                    const eventId = getContestEventId(contest);
                                    const result = await awardCoins({
                                      userId: user.id,
                                      eventType: 'contest',
                                      eventId,
                                      coins: 5,
                                      origin: contestOriginRef.current ?? undefined,
                                    });
                                    contestOriginRef.current = null;
                                    if (result.awarded) {
                                      setCompletedContests(prev => new Set([...prev, eventId]));
                                      await supabase.from('user_submissions').insert({
                                        user_id: user.id,
                                        problem_id: eventId,
                                        status: 'accepted',
                                      });
                                      window.dispatchEvent(new CustomEvent('submission-created', {
                                        detail: { createdAt: new Date().toISOString() },
                                      }));
                                    }
                                  }}
                                />
                                <span>Done</span>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={buildGoogleCalendarLink(contest)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-md border border-border p-1 text-primary hover:bg-primary/10"
                                  >
                                    <CalendarPlus className="h-4 w-4" />
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>Add to Google Calendar</TooltipContent>
                              </Tooltip>
                              <a
                                href={contest.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                Open <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {potd && potdDate === selectedIso && (
                    <div className="pt-3 border-t border-border">
                      <div className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Flame className="h-4 w-4 text-warning" />
                        LeetCode Problem of the Day
                      </div>
                      <div className="rounded-md border border-border px-3 py-2 text-xs flex items-center justify-between gap-3">
                        <div>
                          <div className="font-medium">{potd.title}</div>
                          <div className="text-muted-foreground">{potd.difficulty}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <Checkbox
                              checked={potdCompleted}
                              onPointerDown={(event) => {
                                potdOriginRef.current = { x: event.clientX, y: event.clientY };
                              }}
                              onCheckedChange={async (value) => {
                                if (!user || !potd?.date) return;
                                const checked = Boolean(value);
                                if (!checked) return;
                                const eventId = `potd-${potd.date}`;
                                const result = await awardCoins({
                                  userId: user.id,
                                  eventType: 'potd',
                                  eventId,
                                  coins: 1,
                                  origin: potdOriginRef.current ?? undefined,
                                });
                                potdOriginRef.current = null;
                                if (result.awarded) {
                                  setPotdCompleted(true);
                                  await supabase.from('user_submissions').insert({
                                    user_id: user.id,
                                    problem_id: eventId,
                                    status: 'accepted',
                                  });
                                  window.dispatchEvent(new CustomEvent('submission-created', {
                                    detail: { createdAt: new Date().toISOString() },
                                  }));
                                }
                              }}
                            />
                            <span>Done</span>
                          </div>
                          <a
                            href={potd.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            Open <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
