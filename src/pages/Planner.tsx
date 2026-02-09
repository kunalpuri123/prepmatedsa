import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DayPlanner } from '@/components/DayPlanner';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

const Planner = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  const {
    planner,
    progress,
    generatePlan,
    pausePlan,
    resumePlan,
    resetPlan,
    adjustPlanForMissed,
    reallocateMissedFromDate,
    toggleProblemComplete,
    toggleRevision,
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Day Planner
            </h1>
            <p className="text-muted-foreground mt-1">
              Create a personalized study schedule to complete all problems
            </p>
          </div>

          {/* Day Planner Component */}
          <DayPlanner
            planner={planner}
            progress={progress}
            onGeneratePlan={generatePlan}
            onPausePlan={pausePlan}
            onResumePlan={resumePlan}
            onResetPlan={resetPlan}
            onAdjustForMissed={adjustPlanForMissed}
            onReallocateMissed={reallocateMissedFromDate}
            onToggleComplete={toggleProblemComplete}
            onToggleRevision={toggleRevision}
            userId={user.id}
          />
        </div>
      </main>
    </div>
  );
};

export default Planner;
