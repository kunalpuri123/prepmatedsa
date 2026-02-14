import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopicAccordion } from '@/components/TopicAccordion';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { neetcode250Topics, getNeetcode250AllProblems, getNeetcode250CompletedCount, getNeetcode250CountByDifficulty } from '@/data/neetcode250';

const Neetcode250 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const { progress, toggleProblemComplete, toggleRevision } = useDSAProgress(user?.id);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const allProblems = useMemo(() => getNeetcode250AllProblems(), []);
  const total = allProblems.length;
  const completed = useMemo(() => getNeetcode250CompletedCount(progress), [progress]);
  const counts = useMemo(() => getNeetcode250CountByDifficulty(), []);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />

      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">NeetCode 250</h1>
            <p className="text-muted-foreground mt-1">
              {total} problems • {completed} completed
            </p>
          </div>

          <div className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-lg font-semibold">{percentage}%</p>
              </div>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>

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
          </div>

          {total === 0 && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>NeetCode 250 Sheet Not Yet Populated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The page is wired up and uses the same UI as All Problems, but the NeetCode 250 problem list
                  still needs to be filled into <code className="font-mono">src/data/neetcode250.ts</code>.
                  Once you paste the 250 LeetCode links into that file, this page will render the full sheet.
                </p>
              </CardContent>
            </Card>
          )}

          <TopicAccordion
            topics={neetcode250Topics}
            progress={progress}
            onToggleComplete={toggleProblemComplete}
            onToggleRevision={toggleRevision}
            userId={user.id}
          />
        </div>
      </main>
    </div>
  );
};

export default Neetcode250;

