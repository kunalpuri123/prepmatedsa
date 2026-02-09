import { useState, useEffect, useCallback } from 'react';
import { getAllProblems, dsaTopics, Problem } from '@/data/dsaProblems';
import { supabase } from '@/integrations/supabase/client';
import { awardCoins } from '@/lib/rewards';

export interface ProblemProgress {
  completed: boolean;
  completedAt?: string;
  revision: boolean;
  revisionAddedAt?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  problems: string[];
  completed: boolean;
}

export interface PlannerState {
  isActive: boolean;
  isPaused: boolean;
  startDate: string | null;
  pausedAt: string | null;
  totalDays: number;
  dayPlans: DayPlan[];
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakDates: string[];
}

const STORAGE_KEYS = {
  PROGRESS: 'dsa-progress',
  PLANNER: 'dsa-planner',
  STREAK: 'dsa-streak',
};

export const useDSAProgress = (userId?: string) => {
  const [progress, setProgress] = useState<Record<string, ProblemProgress>>({});
  const [planner, setPlanner] = useState<PlannerState>({
    isActive: false,
    isPaused: false,
    startDate: null,
    pausedAt: null,
    totalDays: 30,
    dayPlans: [],
  });
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    streakDates: [],
  });
  const problemById = getAllProblems().reduce((acc, problem) => {
    acc[problem.id] = problem;
    return acc;
  }, {} as Record<string, Problem>);

  const toISODateLocal = (date: Date) => {
    const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return normalized.toISOString().split('T')[0];
  };
  const fromISODateLocal = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };

  const computeStreakData = useCallback((progressMap: Record<string, ProblemProgress>): StreakData => {
    const dateSet = new Set<string>();
    Object.values(progressMap).forEach((entry) => {
      if (entry.completed && entry.completedAt) {
        const date = new Date(entry.completedAt);
        dateSet.add(toISODateLocal(date));
      }
    });

    const sortedDates = Array.from(dateSet).sort();
    const lastActiveDate = sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : null;

    const todayDate = new Date();
    const todayIso = toISODateLocal(todayDate);
    let currentStreak = 0;
    const cursor = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    while (dateSet.has(toISODateLocal(cursor))) {
      currentStreak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    let longestStreak = 0;
    let run = 0;
    let prevDate: string | null = null;
    sortedDates.forEach((date) => {
      if (!prevDate) {
        run = 1;
      } else {
        const diff = (fromISODateLocal(date).getTime() - fromISODateLocal(prevDate).getTime()) / (1000 * 60 * 60 * 24);
        run = diff === 1 ? run + 1 : 1;
      }
      longestStreak = Math.max(longestStreak, run);
      prevDate = date;
    });

    return {
      currentStreak,
      longestStreak: Math.max(longestStreak, currentStreak),
      lastActiveDate,
      streakDates: sortedDates,
    };
  }, []);

  // Load from localStorage (fallback)
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    const savedPlanner = localStorage.getItem(STORAGE_KEYS.PLANNER);
    const savedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedPlanner) setPlanner(JSON.parse(savedPlanner));
    if (savedStreak) setStreak(JSON.parse(savedStreak));
  }, []);

  // Load from Supabase if user is logged in
  useEffect(() => {
    if (!userId) return;
    let isMounted = true;

    const loadFromSupabase = async () => {
      const { data: progressRows, error: progressError } = await supabase
        .from('user_progress')
        .select('problem_id, completed, completed_at, revision, revision_added_at')
        .eq('user_id', userId);

      if (progressError) {
        console.error('Error loading progress:', progressError);
        return;
      }

      const hasRemoteData = (progressRows || []).length > 0;
      const localProgressRaw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      const localProgress = localProgressRaw ? JSON.parse(localProgressRaw) as Record<string, ProblemProgress> : {};
      const hasLocalData = Object.keys(localProgress).length > 0;

      const progressMap: Record<string, ProblemProgress> = {};
      if (hasRemoteData) {
        (progressRows || []).forEach((row) => {
          progressMap[row.problem_id] = {
            completed: row.completed,
            completedAt: row.completed_at || undefined,
            revision: row.revision,
            revisionAddedAt: row.revision_added_at || undefined,
          };
        });
      } else if (hasLocalData) {
        Object.assign(progressMap, localProgress);
        const upsertRows = Object.entries(localProgress).map(([problemId, entry]) => ({
          user_id: userId,
          problem_id: problemId,
          completed: entry.completed,
          completed_at: entry.completed ? entry.completedAt ?? null : null,
          revision: entry.revision,
          revision_added_at: entry.revision ? entry.revisionAddedAt ?? null : null,
        }));

        if (upsertRows.length > 0) {
          const { error: upsertError } = await supabase
            .from('user_progress')
            .upsert(upsertRows, { onConflict: 'user_id,problem_id' });
          if (upsertError) {
            console.error('Error syncing local progress to Supabase:', upsertError);
          }
        }
      }

      if (!isMounted) return;
      setProgress(progressMap);

      const streakData = computeStreakData(progressMap);
      setStreak(streakData);

      const { error: streakError } = await supabase
        .from('user_streak')
        .upsert({
          user_id: userId,
          current_streak: streakData.currentStreak,
          longest_streak: streakData.longestStreak,
          last_active_date: streakData.lastActiveDate,
          streak_dates: streakData.streakDates,
        }, { onConflict: 'user_id' });
      if (streakError) {
        console.error('Error updating streak:', streakError);
      }

      const { data: plannerRow, error: plannerError } = await supabase
        .from('user_planner')
        .select('is_active, is_paused, start_date, paused_at, total_days, day_plans')
        .eq('user_id', userId)
        .maybeSingle();

      if (plannerError) {
        console.error('Error loading planner:', plannerError);
        return;
      }

      if (plannerRow) {
        if (!isMounted) return;
        setPlanner({
          isActive: plannerRow.is_active,
          isPaused: plannerRow.is_paused,
          startDate: plannerRow.start_date,
          pausedAt: plannerRow.paused_at,
          totalDays: plannerRow.total_days,
          dayPlans: (plannerRow.day_plans as DayPlan[]) || [],
        });
      } else {
        const localPlannerRaw = localStorage.getItem(STORAGE_KEYS.PLANNER);
        const localPlanner = localPlannerRaw ? JSON.parse(localPlannerRaw) as PlannerState : null;
        if (localPlanner && (localPlanner.isActive || localPlanner.dayPlans.length > 0)) {
          const { error: plannerUpsertError } = await supabase
            .from('user_planner')
            .upsert({
              user_id: userId,
              is_active: localPlanner.isActive,
              is_paused: localPlanner.isPaused,
              start_date: localPlanner.startDate,
              paused_at: localPlanner.pausedAt,
              total_days: localPlanner.totalDays,
              day_plans: localPlanner.dayPlans,
            }, { onConflict: 'user_id' });
          if (plannerUpsertError) {
            console.error('Error syncing planner to Supabase:', plannerUpsertError);
          }
        }
      }
    };

    loadFromSupabase();
    return () => {
      isMounted = false;
    };
  }, [userId, computeStreakData]);

  useEffect(() => {
    if (!userId) return;
    void supabase
      .from('user_planner')
      .upsert({
        user_id: userId,
        is_active: planner.isActive,
        is_paused: planner.isPaused,
        start_date: planner.startDate,
        paused_at: planner.pausedAt,
        total_days: planner.totalDays,
        day_plans: planner.dayPlans,
      }, { onConflict: 'user_id' })
      .then(({ error }) => {
        if (error) {
          console.error('Error saving planner:', error);
        }
      });
  }, [userId, planner]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANNER, JSON.stringify(planner));
  }, [planner]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  }, [streak]);

  // Toggle problem completion
  const toggleProblemComplete = useCallback((problemId: string, origin?: { x: number; y: number }) => {
    setProgress(prev => {
      const current = prev[problemId] || { completed: false, revision: false };
      const newCompleted = !current.completed;
      const completedAt = newCompleted ? new Date().toISOString() : undefined;
      
      const nextProgress = {
        ...prev,
        [problemId]: {
          ...current,
          completed: newCompleted,
          completedAt,
        },
      };

      const nextStreak = computeStreakData(nextProgress);
      setStreak(nextStreak);

      window.dispatchEvent(new CustomEvent('progress-completed', {
        detail: { completedAt: completedAt ?? new Date().toISOString(), completed: newCompleted },
      }));

      if (userId) {
        void supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
            problem_id: problemId,
            completed: newCompleted,
            completed_at: completedAt ?? null,
            revision: current.revision,
            revision_added_at: current.revision ? current.revisionAddedAt ?? null : null,
          }, { onConflict: 'user_id,problem_id' })
          .then(({ error }) => {
            if (error) {
              console.error('Error saving progress:', error);
            }
          });

        if (newCompleted) {
          void supabase
            .from('user_submissions')
            .insert({
              user_id: userId,
              problem_id: problemId,
              status: 'accepted',
            })
            .then(({ error }) => {
              if (error) {
                console.error('Error saving submission:', error);
                return;
              }
              window.dispatchEvent(new CustomEvent('submission-created', {
                detail: { createdAt: completedAt ?? new Date().toISOString() },
              }));
            });

          const problem = problemById[problemId];
          const coins = problem?.difficulty === 'Hard' ? 3 : problem?.difficulty === 'Medium' ? 2 : 1;
          void awardCoins({
            userId,
            eventType: 'problem',
            eventId: problemId,
            coins,
            origin,
          }).catch((error) => {
            console.error('Error awarding coins:', error);
          });
        }

        void supabase
          .from('user_streak')
          .upsert({
            user_id: userId,
            current_streak: nextStreak.currentStreak,
            longest_streak: nextStreak.longestStreak,
            last_active_date: nextStreak.lastActiveDate,
            streak_dates: nextStreak.streakDates,
          }, { onConflict: 'user_id' })
          .then(({ error }) => {
            if (error) {
              console.error('Error saving streak:', error);
            }
          });
      }

      return nextProgress;
    });
  }, [computeStreakData, userId]);

  // Toggle revision status
  const toggleRevision = useCallback((problemId: string, origin?: { x: number; y: number }) => {
    setProgress(prev => {
      const current = prev[problemId] || { completed: false, revision: false };
      const newRevision = !current.revision;
      const revisionAddedAt = newRevision ? new Date().toISOString() : undefined;
      
      const nextProgress = {
        ...prev,
        [problemId]: {
          ...current,
          revision: newRevision,
          revisionAddedAt,
        },
      };

      if (userId) {
        void supabase
          .from('user_progress')
          .upsert({
            user_id: userId,
            problem_id: problemId,
            completed: current.completed,
            completed_at: current.completed ? current.completedAt ?? null : null,
            revision: newRevision,
            revision_added_at: revisionAddedAt ?? null,
          }, { onConflict: 'user_id,problem_id' })
          .then(({ error }) => {
            if (error) {
              console.error('Error saving revision:', error);
            }
          });

      }

      return nextProgress;
    });
  }, [userId]);

  // Generate day-wise plan
  const buildDayPlans = (problemIds: string[], totalDays: number, startDate: Date): DayPlan[] => {
    const problemsPerDay = Math.ceil(problemIds.length / totalDays);
    const dayPlans: DayPlan[] = [];

    for (let i = 0; i < totalDays; i++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(dayDate.getDate() + i);

      const startIdx = i * problemsPerDay;
      const endIdx = Math.min(startIdx + problemsPerDay, problemIds.length);
      const dayProblems = problemIds.slice(startIdx, endIdx);

      if (dayProblems.length > 0) {
        dayPlans.push({
          day: i + 1,
          date: dayDate.toISOString().split('T')[0],
          problems: dayProblems,
          completed: false,
        });
      }
    }

    return dayPlans;
  };

  const generatePlan = useCallback((options: { totalDays: number; topicIds: string[]; topicOrder: 'listed' | 'az' | 'za' | 'custom'; sequence: 'default' | 'easy' | 'hard' | 'random' }) => {
    const { totalDays, topicIds, topicOrder, sequence } = options;
    const startDate = new Date();

    const selectedTopics = topicIds.includes('all') || topicIds.length === 0
      ? dsaTopics
      : dsaTopics.filter(t => topicIds.includes(t.id));

    let orderedTopics = [...selectedTopics];
    if (topicOrder === 'az') {
      orderedTopics.sort((a, b) => a.name.localeCompare(b.name));
    } else if (topicOrder === 'za') {
      orderedTopics.sort((a, b) => b.name.localeCompare(a.name));
    } else if (topicOrder === 'custom') {
      const orderMap = new Map(topicIds.map((id, index) => [id, index]));
      orderedTopics.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0));
    }

    const problemsByTopic = orderedTopics.flatMap(topic =>
      topic.patterns.flatMap(pattern => pattern.problems),
    );

    let orderedProblems = [...problemsByTopic];
    if (sequence === 'easy') {
      orderedProblems.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
    } else if (sequence === 'hard') {
      orderedProblems.sort((a, b) => b.difficulty.localeCompare(a.difficulty));
    } else if (sequence === 'random') {
      for (let i = orderedProblems.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [orderedProblems[i], orderedProblems[j]] = [orderedProblems[j], orderedProblems[i]];
      }
    }

    const problemIds = orderedProblems.map(p => p.id);
    const dayPlans = buildDayPlans(problemIds, totalDays, startDate);

    setPlanner({
      isActive: true,
      isPaused: false,
      startDate: startDate.toISOString().split('T')[0],
      pausedAt: null,
      totalDays,
      dayPlans,
    });
  }, []);

  // Pause the plan
  const pausePlan = useCallback(() => {
    setPlanner(prev => ({
      ...prev,
      isPaused: true,
      pausedAt: new Date().toISOString().split('T')[0],
    }));
  }, []);

  // Resume and auto-adjust the plan
  const resumePlan = useCallback(() => {
    setPlanner(prev => {
      if (!prev.pausedAt || !prev.startDate) return prev;

      const today = new Date();
      const todayIso = today.toISOString().split('T')[0];
      const todayDate = new Date(todayIso);
      const orderedProblemIds: string[] = [];
      const seen = new Set<string>();

      prev.dayPlans.forEach(day => {
        day.problems.forEach(id => {
          if (!seen.has(id)) {
            seen.add(id);
            orderedProblemIds.push(id);
          }
        });
      });

      const remainingProblemIds = orderedProblemIds.filter(id => !progress[id]?.completed);
      const daysElapsed = prev.dayPlans.filter(p => new Date(p.date) < todayDate).length;
      const remainingDays = Math.max(1, prev.totalDays - daysElapsed);
      const newDayPlans = buildDayPlans(remainingProblemIds, remainingDays, todayDate);

      return {
        ...prev,
        isPaused: false,
        pausedAt: null,
        startDate: todayIso,
        totalDays: remainingDays,
        dayPlans: newDayPlans,
      };
    });
  }, [progress]);

  const adjustPlanForMissed = useCallback((missed: 'today' | 'yesterday') => {
    setPlanner(prev => {
      if (!prev.isActive) return prev;

      const today = new Date();
      const todayIso = today.toISOString().split('T')[0];
      const todayDate = new Date(todayIso);
      const startDate = missed === 'today' ? new Date(todayDate) : todayDate;
      if (missed === 'today') {
        startDate.setDate(startDate.getDate() + 1);
      }

      const orderedProblemIds: string[] = [];
      const seen = new Set<string>();
      prev.dayPlans.forEach(day => {
        day.problems.forEach(id => {
          if (!seen.has(id)) {
            seen.add(id);
            orderedProblemIds.push(id);
          }
        });
      });

      const remainingProblemIds = orderedProblemIds.filter(id => !progress[id]?.completed);
      const daysElapsed = prev.dayPlans.filter(p => new Date(p.date) < startDate).length;
      const remainingDays = Math.max(1, prev.totalDays - daysElapsed);
      const adjustedDays = remainingDays + 1;
      const newDayPlans = buildDayPlans(remainingProblemIds, adjustedDays, startDate);

      return {
        ...prev,
        isPaused: false,
        pausedAt: null,
        startDate: startDate.toISOString().split('T')[0],
        totalDays: adjustedDays,
        dayPlans: newDayPlans,
      };
    });
  }, [progress]);

  const reallocateMissedFromDate = useCallback((date: string, spreadDays: number) => {
    setPlanner(prev => {
      if (!prev.isActive) return prev;

      const targetIndex = prev.dayPlans.findIndex(p => p.date === date);
      if (targetIndex === -1) return prev;

      const missedIds = prev.dayPlans[targetIndex].problems.filter(id => !progress[id]?.completed);
      if (missedIds.length === 0) return prev;

      const updatedDayPlans = prev.dayPlans.map((plan, idx) => {
        if (idx !== targetIndex) return plan;
        return {
          ...plan,
          problems: plan.problems.filter(id => !missedIds.includes(id)),
        };
      });

      const daysToSpread = Math.max(1, Math.min(14, Math.floor(spreadDays || 1)));
      const requiredLength = targetIndex + 1 + daysToSpread;
      let lastDate = new Date(updatedDayPlans[updatedDayPlans.length - 1].date);

      while (updatedDayPlans.length < requiredLength) {
        lastDate.setDate(lastDate.getDate() + 1);
        updatedDayPlans.push({
          day: updatedDayPlans.length + 1,
          date: lastDate.toISOString().split('T')[0],
          problems: [],
          completed: false,
        });
      }

      for (let i = 0; i < missedIds.length; i += 1) {
        const destIndex = targetIndex + 1 + (i % daysToSpread);
        const dest = updatedDayPlans[destIndex];
        updatedDayPlans[destIndex] = {
          ...dest,
          problems: [...dest.problems, missedIds[i]],
        };
      }

      return {
        ...prev,
        totalDays: updatedDayPlans.length,
        dayPlans: updatedDayPlans,
      };
    });
  }, [progress]);

  // Reset the plan
  const resetPlan = useCallback(() => {
    setPlanner({
      isActive: false,
      isPaused: false,
      startDate: null,
      pausedAt: null,
      totalDays: 30,
      dayPlans: [],
    });
  }, []);

  // Get completion stats
  const getStats = useCallback(() => {
    const allProblems = getAllProblems();
    const completed = Object.values(progress).filter(p => p.completed).length;
    const revisions = Object.values(progress).filter(p => p.revision).length;
    
    const byDifficulty = {
      easy: { total: 0, completed: 0 },
      medium: { total: 0, completed: 0 },
      hard: { total: 0, completed: 0 },
    };

    allProblems.forEach(problem => {
      const key = problem.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
      byDifficulty[key].total++;
      if (progress[problem.id]?.completed) {
        byDifficulty[key].completed++;
      }
    });

    return {
      total: allProblems.length,
      completed,
      revisions,
      percentage: Math.round((completed / allProblems.length) * 100),
      byDifficulty,
    };
  }, [progress]);

  // Get revision problems organized by topic and pattern
  const getRevisionProblems = useCallback(() => {
    const revisionProblems: Problem[] = [];
    
    getAllProblems().forEach(problem => {
      if (progress[problem.id]?.revision) {
        revisionProblems.push(problem);
      }
    });

    // Group by topic
    const byTopic: Record<string, Problem[]> = {};
    const byPattern: Record<string, Problem[]> = {};

    revisionProblems.forEach(problem => {
      // Find topic
      const topic = dsaTopics.find(t => 
        t.patterns.some(p => p.problems.some(prob => prob.id === problem.id))
      );
      
      if (topic) {
        if (!byTopic[topic.name]) byTopic[topic.name] = [];
        byTopic[topic.name].push(problem);
      }

      // Group by pattern
      const pattern = problem.pattern;
      if (!byPattern[pattern]) byPattern[pattern] = [];
      byPattern[pattern].push(problem);
    });

    return { all: revisionProblems, byTopic, byPattern };
  }, [progress]);

  // Get today's problems from plan
  const getTodayProblems = useCallback(() => {
    if (!planner.isActive || planner.isPaused) return [];
    
    const today = new Date().toISOString().split('T')[0];
    const todayPlan = planner.dayPlans.find(p => p.date === today);
    
    if (!todayPlan) return [];
    
    return getAllProblems().filter(p => todayPlan.problems.includes(p.id));
  }, [planner]);

  // Get current day number
  const getCurrentDay = useCallback(() => {
    if (!planner.isActive || !planner.startDate) return 0;
    
    const today = new Date().toISOString().split('T')[0];
    const dayPlan = planner.dayPlans.find(p => p.date === today);
    
    return dayPlan?.day || 0;
  }, [planner]);

  return {
    progress,
    planner,
    streak,
    toggleProblemComplete,
    toggleRevision,
    generatePlan,
    pausePlan,
    resumePlan,
    adjustPlanForMissed,
    reallocateMissedFromDate,
    resetPlan,
    getStats,
    getRevisionProblems,
    getTodayProblems,
    getCurrentDay,
  };
};
