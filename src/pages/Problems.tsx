import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopicAccordion } from '@/components/TopicAccordion';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { dsaTopics, getTotalProblemCount, getCountByDifficulty } from '@/data/dsaProblems';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchLeetCodePotd } from '@/lib/leetcode';
import { Checkbox } from '@/components/ui/checkbox';
import { awardCoins, fetchCompletedEvents } from '@/lib/rewards';
import { CoinHUD } from '@/components/CoinHUD';

const Problems = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [potd, setPotd] = useState<{
    date: string;
    title: string;
    titleSlug: string;
    difficulty: string;
    link: string;
  } | null>(null);
  const [potdError, setPotdError] = useState('');
  const [potdCompleted, setPotdCompleted] = useState(false);
  const [timeTotals, setTimeTotals] = useState<Record<string, number>>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const openNotesId = searchParams.get('openNotes');
  const potdOriginRef = useRef<{ x: number; y: number } | null>(null);
  
  const {
    planner,
    progress,
    toggleProblemComplete,
    toggleRevision,
    getStats,
  } = useDSAProgress(user?.id);

  const [showTodayOnly, setShowTodayOnly] = useState(false);

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
    const loadLatestTimes = async () => {
      try {
        const { data, error } = await supabase
          .from('user_problem_sessions')
          .select('problem_id, duration_seconds, ended_at')
          .eq('user_id', user.id)
          .order('ended_at', { ascending: false });
        if (error) throw error;
        const latest: Record<string, number> = {};
        (data || []).forEach((row) => {
          if (!(row.problem_id in latest)) {
            latest[row.problem_id] = row.duration_seconds || 0;
          }
        });
        setTimeTotals(latest);
      } catch (error) {
        console.error('Failed to load time totals', error);
      }
    };

    loadLatestTimes();
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    const loadPotd = async () => {
      try {
        const data = await fetchLeetCodePotd();
        if (isMounted) {
          setPotd(data);
          setPotdError('');
        }
      } catch (error) {
        console.error('Failed to load POTD', error);
        if (isMounted) {
          setPotdError('Unable to load LeetCode POTD right now.');
        }
      }
    };
    loadPotd();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user || !potd?.date) return;
    const loadPotdCompletion = async () => {
      const completed = await fetchCompletedEvents(user.id, 'potd');
      setPotdCompleted(completed.has(`potd-${potd.date}`));
    };
    loadPotdCompletion();
  }, [user, potd?.date]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const stats = getStats();
  const counts = getCountByDifficulty();
  const today = new Date().toISOString().split('T')[0];
  const todayPlan = planner.dayPlans.find(p => p.date === today);
  const todayIds = new Set(todayPlan?.problems || []);
  const plannerStart = planner.startDate ? new Date(planner.startDate) : null;
  const plannerEnd = planner.dayPlans.length > 0
    ? new Date(planner.dayPlans[planner.dayPlans.length - 1].date)
    : (plannerStart ? new Date(new Date(planner.startDate).getTime() + (planner.totalDays - 1) * 86400000) : null);
  const expectedCompletion = plannerEnd
    ? plannerEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Not planned';
  const plannerProgress = planner.dayPlans.length > 0
    ? Math.round((stats.completed / Math.max(getTotalProblemCount(), 1)) * 100)
    : 0;
  const filteredTopics = useMemo(() => {
    if (!showTodayOnly) return dsaTopics;
    return dsaTopics
      .map(topic => {
        const patterns = topic.patterns
          .map(pattern => ({
            ...pattern,
            problems: pattern.problems.filter(p => todayIds.has(p.id)),
          }))
          .filter(pattern => pattern.problems.length > 0);
        return { ...topic, patterns };
      })
      .filter(topic => topic.patterns.length > 0);
  }, [showTodayOnly, todayIds]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      <CoinHUD />
      
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              All Problems
            </h1>
            <p className="text-muted-foreground mt-1">
              {getTotalProblemCount()} problems • {stats.completed} completed
            </p>
          </div>

          {/* Problem of the Day */}
          <Card className="border-border bg-card">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-warning" />
                LeetCode Problem of the Day
              </CardTitle>
              {potd?.date && (
                <span className="text-xs text-muted-foreground">{potd.date}</span>
              )}
            </CardHeader>
            <CardContent>
              {potd ? (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{potd.title}</p>
                    <p className="text-sm text-muted-foreground">Difficulty: {potd.difficulty}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={potdCompleted}
                        onPointerDown={(event) => {
                          potdOriginRef.current = { x: event.clientX, y: event.clientY };
                        }}
                        onCheckedChange={async (value) => {
                          if (!user || !potd?.date) return;
                          const isChecked = Boolean(value);
                          setPotdCompleted(isChecked);
                          if (!isChecked) return;
                          const eventId = `potd-${potd.date}`;
                          await awardCoins({
                            userId: user.id,
                            eventType: 'potd',
                            eventId,
                            coins: 1,
                            origin: potdOriginRef.current ?? undefined,
                          });
                          potdOriginRef.current = null;
                          await supabase.from('user_submissions').insert({
                            user_id: user.id,
                            problem_id: eventId,
                            status: 'accepted',
                          });
                          window.dispatchEvent(new CustomEvent('submission-created', {
                            detail: { createdAt: new Date().toISOString() },
                          }));
                        }}
                      />
                      <span>Mark solved</span>
                    </div>
                    <a
                      href={potd.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      Open on LeetCode <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{potdError || 'Loading...'}</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="flex items-center justify-between gap-6 p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-easy" />
              <span className="text-sm">Easy: {counts.easy}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-medium" />
              <span className="text-sm">Medium: {counts.medium}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-hard" />
              <span className="text-sm">Hard: {counts.hard}</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="today-only"
                checked={showTodayOnly}
                onCheckedChange={setShowTodayOnly}
              />
              <Label htmlFor="today-only" className="text-sm">
                Show Today’s Problems
              </Label>
            </div>
          </div>

          {/* Plan Progress */}
          <div className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Plan Progress</p>
                <p className="text-lg font-semibold">
                  {planner.totalDays} days • Expected completion: {expectedCompletion}
                </p>
              </div>
              <Trophy className="h-6 w-6 text-warning" />
            </div>
            <Progress value={plannerProgress} className="h-2" />
          </div>

          {/* All Topics */}
          <TopicAccordion
            topics={filteredTopics}
            progress={progress}
            onToggleComplete={toggleProblemComplete}
            onToggleRevision={toggleRevision}
            userId={user.id}
            timeTotals={timeTotals}
            openNotesProblemId={openNotesId}
            onNotesOpened={() => {
              if (!openNotesId) return;
              const next = new URLSearchParams(searchParams);
              next.delete('openNotes');
              setSearchParams(next, { replace: true });
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Problems;
