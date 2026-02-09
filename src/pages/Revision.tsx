import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { RevisionSheet } from '@/components/RevisionSheet';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { CoinHUD } from '@/components/CoinHUD';
import { awardCoins, fetchCompletedEvents } from '@/lib/rewards';

const Revision = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [revisedSet, setRevisedSet] = useState<Set<string>>(new Set());
  
  const {
    progress,
    toggleProblemComplete,
    toggleRevision,
    getRevisionProblems,
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
    fetchCompletedEvents(user.id, 'revision')
      .then(setRevisedSet)
      .catch(() => setRevisedSet(new Set()));
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const revisionData = getRevisionProblems();

  if (!user) {
    return null;
  }

  const handleMarkRevised = async (problemId: string, origin?: { x: number; y: number }) => {
    if (!user || revisedSet.has(problemId)) return;
    const result = await awardCoins({
      userId: user.id,
      eventType: 'revision',
      eventId: problemId,
      coins: 1,
      origin,
    });
    if (result.awarded) {
      setRevisedSet(prev => new Set([...prev, problemId]));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      <CoinHUD />
      
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Revision Sheet
            </h1>
            <p className="text-muted-foreground mt-1">
              Problems marked for revision, organized by topic and pattern
            </p>
          </div>

          {/* Revision Sheet Component */}
          <RevisionSheet
            revisionData={revisionData}
            progress={progress}
            onToggleComplete={toggleProblemComplete}
            onToggleRevision={toggleRevision}
            userId={user.id}
            revisedSet={revisedSet}
            onMarkRevised={handleMarkRevised}
          />
        </div>
      </main>
    </div>
  );
};

export default Revision;
