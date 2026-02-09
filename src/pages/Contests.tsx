import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { CalendarClock, ExternalLink, Bell, CalendarPlus } from 'lucide-react';
import { format, isAfter, isBefore, addMinutes, isSameDay, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { awardCoins, fetchCompletedEvents } from '@/lib/rewards';
import { CoinHUD } from '@/components/CoinHUD';

const PLATFORM_ENDPOINTS = [
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

const REMINDER_KEY = 'contest_reminders';

const Contests = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [contests, setContests] = useState<ContestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState<Record<string, boolean>>({
    codechef: true,
    leetcode: true,
    codeforces: false,
  });
  const [rangeFilter, setRangeFilter] = useState<'all' | 'today' | 'week'>('all');
  const [completedContests, setCompletedContests] = useState<Set<string>>(new Set());
  const contestOriginRef = useRef<{ x: number; y: number } | null>(null);

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
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          PLATFORM_ENDPOINTS.map(async (platform) => {
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

        if (isMounted) {
          setContests(upcoming);
        }
      } catch (error) {
        console.error('Error fetching contests:', error);
        toast.error('Failed to load contests');
      } finally {
        if (isMounted) setIsLoading(false);
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
    const interval = setInterval(() => {
      const reminders = JSON.parse(localStorage.getItem(REMINDER_KEY) || '[]') as string[];
      if (reminders.length === 0) return;

      const now = new Date();
      const upcomingReminder = contests.find((contest) => {
        if (!reminders.includes(contest.title)) return false;
        const start = new Date(contest.startTime);
        return isAfter(start, now) && isBefore(start, addMinutes(now, 60));
      });

      if (upcomingReminder) {
        toast.message(`Contest starting soon: ${upcomingReminder.title}`);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [contests]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const toggleReminder = (contest: ContestItem) => {
    const reminders = new Set<string>(JSON.parse(localStorage.getItem(REMINDER_KEY) || '[]'));
    if (reminders.has(contest.title)) {
      reminders.delete(contest.title);
      toast.info('Reminder removed');
    } else {
      reminders.add(contest.title);
      toast.success('Reminder set (1 hour before)');
    }
    localStorage.setItem(REMINDER_KEY, JSON.stringify(Array.from(reminders)));
  };

  const getContestEventId = (contest: ContestItem) => {
    return `contest-${contest.platform}-${contest.title}-${contest.startTime}`;
  };


  const activeReminders = useMemo(() => {
    return new Set<string>(JSON.parse(localStorage.getItem(REMINDER_KEY) || '[]'));
  }, [contests]);

  const filtered = contests.filter((contest) => {
    const platformKey = contest.platform?.toLowerCase();
    const platformOk = platformFilter[platformKey] ?? true;
    if (!platformOk) return false;

    const start = new Date(contest.startTime);
    if (Number.isNaN(start.getTime())) return false;

    if (rangeFilter === 'today') {
      return isSameDay(start, new Date());
    }

    if (rangeFilter === 'week') {
      const interval = { start: startOfWeek(new Date()), end: endOfWeek(new Date()) };
      return isWithinInterval(start, interval);
    }

    return true;
  });

  const nextContest = filtered[0];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      <CoinHUD />

      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Contest Alerts</h1>
            <p className="text-muted-foreground">Upcoming contests from CodeChef, LeetCode, and Codeforces.</p>
          </div>

          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Next Contest</CardTitle>
                <p className="text-sm text-muted-foreground">Auto-refreshes when you revisit the page.</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {PLATFORM_ENDPOINTS.map((platform) => (
                  <div key={platform.key} className="flex items-center gap-2">
                    <Switch
                      checked={platformFilter[platform.key]}
                      onCheckedChange={(checked) =>
                        setPlatformFilter((prev) => ({ ...prev, [platform.key]: checked }))
                      }
                    />
                    <span className="text-sm">{platform.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={rangeFilter === 'today' ? 'default' : 'outline'}
                    onClick={() => setRangeFilter('today')}
                  >
                    Today
                  </Button>
                  <Button
                    size="sm"
                    variant={rangeFilter === 'week' ? 'default' : 'outline'}
                    onClick={() => setRangeFilter('week')}
                  >
                    This Week
                  </Button>
                  <Button
                    size="sm"
                    variant={rangeFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setRangeFilter('all')}
                  >
                    All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {nextContest ? (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{nextContest.title}</h3>
                        <Badge>{nextContest.platform}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Starts {format(new Date(nextContest.startTime), 'PPP p')}
                    </p>
                  </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Checkbox
                          checked={completedContests.has(getContestEventId(nextContest))}
                          onPointerDown={(event) => {
                            contestOriginRef.current = { x: event.clientX, y: event.clientY };
                          }}
                          onCheckedChange={async (value) => {
                            if (!user) return;
                            const checked = Boolean(value);
                            if (!checked) return;
                            const eventId = getContestEventId(nextContest);
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
                        <span>Mark solved</span>
                      </div>
                      <Button
                        variant="secondary"
                        onClick={() => toggleReminder(nextContest)}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      {activeReminders.has(nextContest.title) ? 'Remove Reminder' : 'Set Reminder'}
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon" asChild>
                          <a href={buildGoogleCalendarLink(nextContest)} target="_blank" rel="noreferrer">
                            <CalendarPlus className="h-4 w-4" />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Add to Google Calendar</TooltipContent>
                    </Tooltip>
                    <Button asChild>
                      <a href={nextContest.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open
                      </a>
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No upcoming contests found.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Contests</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-muted-foreground">Loading contests...</p>
              ) : filtered.length === 0 ? (
                <p className="text-muted-foreground">No contests match the selected platforms.</p>
              ) : (
                <div className="space-y-3">
                  {filtered.map((contest) => (
                    <div
                      key={`${contest.platform}-${contest.title}-${contest.startTime}`}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-lg border border-border bg-card p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{contest.title}</h4>
                          <Badge variant="secondary">{contest.platform}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(contest.startTime), 'PPP p')} · {Math.round(contest.duration / 3600)}h
                        </p>
                      </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm">
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
                        <span>Mark solved</span>
                      </div>
                      <Button variant="ghost" onClick={() => toggleReminder(contest)}>
                        <Bell className="h-4 w-4 mr-1" />
                        {activeReminders.has(contest.title) ? 'Remove' : 'Reminder'}
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="secondary" size="icon" asChild>
                              <a href={buildGoogleCalendarLink(contest)} target="_blank" rel="noreferrer">
                                <CalendarPlus className="h-4 w-4" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add to Google Calendar</TooltipContent>
                        </Tooltip>
                        <Button asChild>
                          <a href={contest.url} target="_blank" rel="noreferrer">
                            <CalendarClock className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Contests;
