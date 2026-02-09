import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StatsCards } from '@/components/StatsCards';
import { DifficultyChart } from '@/components/DifficultyChart';
import { ProgressRing } from '@/components/ProgressRing';
import { StreakDisplay } from '@/components/StreakDisplay';
import { StreakCalendar } from '@/components/StreakCalendar';
import { SubmissionHeatmap } from '@/components/SubmissionHeatmap';
import { TopicAccordion } from '@/components/TopicAccordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { dsaTopics, getTotalProblemCount } from '@/data/dsaProblems';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format, subDays } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [timeStats, setTimeStats] = useState({
    totalSeconds: 0,
    averageSeconds: 0,
    sessions: 0,
  });
  const [timeSeries, setTimeSeries] = useState<Array<{ date: string; minutes: number }>>([]);
  
  const {
    progress,
    streak,
    toggleProblemComplete,
    toggleRevision,
    getStats,
  } = useDSAProgress(user?.id);

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
    const loadTimeStats = async () => {
      try {
        const since = subDays(new Date(), 6);
        const { data, error } = await supabase
          .from('user_problem_sessions')
          .select('duration_seconds, started_at')
          .eq('user_id', user.id)
          .gte('started_at', since.toISOString());

        if (error) throw error;

        const sessions = data || [];
        const totalSeconds = sessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);
        const averageSeconds = sessions.length ? Math.round(totalSeconds / sessions.length) : 0;

        const dailyMap = new Map<string, number>();
        for (let i = 0; i < 7; i += 1) {
          const day = subDays(new Date(), i);
          dailyMap.set(format(day, 'yyyy-MM-dd'), 0);
        }
        sessions.forEach((session) => {
          const key = format(new Date(session.started_at), 'yyyy-MM-dd');
          dailyMap.set(key, (dailyMap.get(key) || 0) + session.duration_seconds / 60);
        });

        const series = Array.from(dailyMap.entries())
          .map(([date, minutes]) => ({ date, minutes: Math.round(minutes) }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setTimeStats({ totalSeconds, averageSeconds, sessions: sessions.length });
        setTimeSeries(series);
      } catch (error) {
        console.error('Failed to load time stats', error);
      }
    };

    loadTimeStats();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const stats = getStats();
  const recentTopics = dsaTopics.slice(0, 3);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                DSA Sheet Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your progress through {getTotalProblemCount()} problems
              </p>
            </div>
            <StreakDisplay 
              currentStreak={streak.currentStreak} 
              longestStreak={streak.longestStreak} 
            />
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} streak={streak} />

          {/* Streaks */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <SubmissionHeatmap userId={user.id} progress={progress} />
            </div>
            <StreakCalendar
              streakDates={streak.streakDates}
              currentStreak={streak.currentStreak}
              longestStreak={streak.longestStreak}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Ring */}
            <Card className="stat-card border-border">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-4">
                <ProgressRing progress={stats.percentage} size={180} strokeWidth={12} />
              </CardContent>
            </Card>

            {/* Difficulty Chart */}
            <div className="lg:col-span-2">
              <DifficultyChart byDifficulty={stats.byDifficulty} />
            </div>
          </div>

          {/* Time Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="stat-card border-border">
              <CardHeader>
                <CardTitle>Time Spent (7 days)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold">
                  {Math.round(timeStats.totalSeconds / 60)} min
                </div>
                <div className="text-sm text-muted-foreground">
                  {timeStats.sessions} sessions · Avg {Math.round(timeStats.averageSeconds / 60)} min
                </div>
              </CardContent>
            </Card>
            <Card className="stat-card border-border lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Focus</CardTitle>
              </CardHeader>
              <CardContent className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'EEE')} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Topics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
            <TopicAccordion
              topics={recentTopics}
              progress={progress}
              onToggleComplete={toggleProblemComplete}
              onToggleRevision={toggleRevision}
              userId={user.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
