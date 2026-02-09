import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, Pause, RotateCcw, Calendar, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { PlannerState, ProblemProgress } from '@/hooks/useDSAProgress';
import { dsaTopics, getAllProblems, Problem } from '@/data/dsaProblems';
import { ProblemRow } from './ProblemRow';

interface DayPlannerProps {
  planner: PlannerState;
  progress: Record<string, ProblemProgress>;
  onGeneratePlan: (options: { totalDays: number; topicIds: string[]; topicOrder: 'listed' | 'az' | 'za' | 'custom'; sequence: 'default' | 'easy' | 'hard' | 'random' }) => void;
  onPausePlan: () => void;
  onResumePlan: () => void;
  onResetPlan: () => void;
  onToggleComplete: (problemId: string) => void;
  onToggleRevision: (problemId: string) => void;
  onAdjustForMissed: (missed: 'today' | 'yesterday') => void;
  onReallocateMissed: (date: string, spreadDays: number) => void;
  userId?: string;
}

export const DayPlanner: React.FC<DayPlannerProps> = ({
  planner,
  progress,
  onGeneratePlan,
  onPausePlan,
  onResumePlan,
  onResetPlan,
  onToggleComplete,
  onToggleRevision,
  onAdjustForMissed,
  onReallocateMissed,
  userId,
}) => {
  const [daysInput, setDaysInput] = useState('30');
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(['all']);
  const [topicOrder, setTopicOrder] = useState<'listed' | 'az' | 'za' | 'custom'>('listed');
  const [sequence, setSequence] = useState<'default' | 'easy' | 'hard' | 'random'>('default');
  const [missedDate, setMissedDate] = useState(new Date().toISOString().split('T')[0]);
  const [spreadDays, setSpreadDays] = useState(3);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  const allProblems = getAllProblems();
  const parsedDays = Math.max(7, Math.min(365, parseInt(daysInput, 10) || 30));
  const selectedTopicProblems = selectedTopicIds.includes('all')
    ? allProblems
    : dsaTopics.filter(t => selectedTopicIds.includes(t.id)).flatMap(t => t.patterns.flatMap(p => p.problems));
  const problemsMap = allProblems.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {} as Record<string, Problem>);

  const today = new Date().toISOString().split('T')[0];
  const currentDayPlan = planner.dayPlans.find(p => p.date === today);
  const todayProblems = currentDayPlan?.problems.map(id => problemsMap[id]).filter(Boolean) || [];
  const selectedDayPlan = planner.dayPlans.find(p => p.date === missedDate);
  const missedProblems = selectedDayPlan
    ? selectedDayPlan.problems.filter(id => !progress[id]?.completed).map(id => problemsMap[id]).filter(Boolean)
    : [];

  const getDayStatus = (dayPlan: typeof planner.dayPlans[0]) => {
    const dayDate = new Date(dayPlan.date);
    const todayDate = new Date(today);
    
    if (dayDate < todayDate) {
      const allCompleted = dayPlan.problems.every(id => progress[id]?.completed);
      return allCompleted ? 'completed' : 'missed';
    }
    if (dayPlan.date === today) return 'today';
    return 'upcoming';
  };

  if (!planner.isActive) {
    return (
      <Card className="stat-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Create Your Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Set the number of days you want to complete all {allProblems.length} problems.
            The plan will automatically distribute problems evenly across your timeline.
          </p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Topics</label>
              <DropdownMenu open={isTopicsOpen} onOpenChange={setIsTopicsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedTopicIds.includes('all')
                      ? 'All Topics'
                      : `${selectedTopicIds.length} selected`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-80 w-64 overflow-auto">
                  <DropdownMenuCheckboxItem
                    checked={selectedTopicIds.includes('all')}
                    onSelect={(event) => event.preventDefault()}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTopicIds(['all']);
                      } else {
                        setSelectedTopicIds(prev => prev.length === 1 && prev[0] === 'all' ? ['all'] : prev.filter(id => id !== 'all'));
                      }
                    }}
                  >
                    All Topics
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  {dsaTopics.map(topic => {
                    const checked = selectedTopicIds.includes(topic.id);
                    return (
                      <DropdownMenuCheckboxItem
                        key={topic.id}
                        checked={checked}
                        onSelect={(event) => event.preventDefault()}
                        onCheckedChange={(value) => {
                          setSelectedTopicIds(prev => {
                            const next = prev.filter(id => id !== 'all');
                            if (value) {
                              return [...next, topic.id];
                            }
                            const filtered = next.filter(id => id !== topic.id);
                            return filtered.length === 0 ? ['all'] : filtered;
                          });
                        }}
                      >
                        {topic.name}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button
                      type="button"
                      size="sm"
                      className="w-full"
                      onClick={() => setIsTopicsOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="mt-3 rounded-lg border border-border p-3 bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    checked={selectedTopicIds.includes('all')}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTopicIds(['all']);
                      } else {
                        setSelectedTopicIds(prev => prev.length === 1 && prev[0] === 'all' ? ['all'] : prev.filter(id => id !== 'all'));
                      }
                    }}
                  />
                  <span className="text-sm font-medium">All Topics</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dsaTopics.map(topic => {
                    const checked = selectedTopicIds.includes(topic.id);
                    return (
                      <label key={topic.id} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(value) => {
                            setSelectedTopicIds(prev => {
                              const next = prev.filter(id => id !== 'all');
                              if (value) {
                                return [...next, topic.id];
                              }
                              const filtered = next.filter(id => id !== topic.id);
                              return filtered.length === 0 ? ['all'] : filtered;
                            });
                          }}
                        />
                        <span>{topic.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Topic Order</label>
              <Select value={topicOrder} onValueChange={(value) => setTopicOrder(value as typeof topicOrder)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select topic order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="listed">As Listed</SelectItem>
                  <SelectItem value="az">A → Z</SelectItem>
                  <SelectItem value="za">Z → A</SelectItem>
                  <SelectItem value="custom">Custom Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {topicOrder === 'custom' && !selectedTopicIds.includes('all') && (
            <div className="rounded-lg border border-border p-3">
              <div className="text-sm font-medium mb-2">Custom Topic Order</div>
              <div className="space-y-2">
                {selectedTopicIds.map((id, index) => {
                  const topic = dsaTopics.find(t => t.id === id);
                  if (!topic) return null;
                  return (
                    <div key={id} className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm">
                      <span className="truncate">{topic.name}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            if (index === 0) return;
                            setSelectedTopicIds(prev => {
                              const next = [...prev];
                              [next[index - 1], next[index]] = [next[index], next[index - 1]];
                              return next;
                            });
                          }}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            if (index === selectedTopicIds.length - 1) return;
                            setSelectedTopicIds(prev => {
                              const next = [...prev];
                              [next[index + 1], next[index]] = [next[index], next[index + 1]];
                              return next;
                            });
                          }}
                          disabled={index === selectedTopicIds.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Sequence</label>
              <Select value={sequence} onValueChange={(value) => setSequence(value as typeof sequence)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select sequence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">As Listed</SelectItem>
                  <SelectItem value="easy">Easy → Hard</SelectItem>
                  <SelectItem value="hard">Hard → Easy</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Number of Days</label>
                <Input
                  type="number"
                  min={7}
                  max={365}
                  value={daysInput}
                  onChange={(e) => setDaysInput(e.target.value)}
                  onBlur={() => setDaysInput(String(parsedDays))}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="bg-background"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ {Math.ceil(selectedTopicProblems.length / parsedDays)} problems/day
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => onGeneratePlan({ totalDays: parsedDays, topicIds: selectedTopicIds, topicOrder, sequence })}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Generate Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="stat-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Your Study Plan
            </CardTitle>
            <div className="flex items-center gap-2">
              {planner.isPaused ? (
                <Button onClick={onResumePlan} variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button onClick={onPausePlan} variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={onResetPlan} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button onClick={() => onAdjustForMissed('today')} variant="outline" size="sm">
              Missed Today
            </Button>
            <Button onClick={() => onAdjustForMissed('yesterday')} variant="outline" size="sm">
              Missed Yesterday
            </Button>
          </div>
          <div className="rounded-lg border border-border p-4 mb-4">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Pick Date</label>
                <Input
                  type="date"
                  value={missedDate}
                  onChange={(e) => setMissedDate(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Spread Over Next (days)</label>
                <Input
                  type="number"
                  min={1}
                  max={14}
                  value={spreadDays}
                  onChange={(e) => setSpreadDays(parseInt(e.target.value) || 1)}
                  className="bg-background w-32"
                />
              </div>
              <Button
                onClick={() => onReallocateMissed(missedDate, spreadDays)}
                variant="outline"
                size="sm"
                disabled={!selectedDayPlan || missedProblems.length === 0}
              >
                Reallocate Missed
              </Button>
            </div>

            <div className="mt-4">
              {!selectedDayPlan && (
                <p className="text-sm text-muted-foreground">No plan found for this date.</p>
              )}
              {selectedDayPlan && missedProblems.length === 0 && (
                <p className="text-sm text-muted-foreground">All problems completed for this date.</p>
              )}
              {selectedDayPlan && missedProblems.length > 0 && (
                <div className="space-y-2">
                  {missedProblems.map(problem => (
                    <ProblemRow
                      key={problem.id}
                      problem={problem}
                      progress={progress[problem.id]}
                      onToggleComplete={onToggleComplete}
                      onToggleRevision={onToggleRevision}
                      userId={userId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {planner.isPaused && (
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
              <p className="text-warning font-medium">Plan is paused</p>
              <p className="text-sm text-muted-foreground">
                Paused since {planner.pausedAt}. Resume to auto-adjust your schedule.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-7 gap-2">
            {planner.dayPlans.slice(0, 35).map((dayPlan) => {
              const status = getDayStatus(dayPlan);
              const completed = dayPlan.problems.filter(id => progress[id]?.completed).length;
              const total = dayPlan.problems.length;
              
              return (
                <div
                  key={dayPlan.day}
                  onClick={() => setMissedDate(dayPlan.date)}
                  role="button"
                  tabIndex={0}
                  className={`p-2 rounded-lg text-center text-xs border cursor-pointer hover:bg-muted/70 ${
                    status === 'today'
                      ? 'bg-primary/20 border-primary'
                      : status === 'completed'
                      ? 'bg-success/20 border-success/30'
                      : status === 'missed'
                      ? 'bg-destructive/20 border-destructive/30'
                      : 'bg-muted/50 border-border'
                  } ${dayPlan.date === missedDate ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className="font-semibold">Day {dayPlan.day}</div>
                  <div className="text-muted-foreground">{completed}/{total}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {currentDayPlan && todayProblems.length > 0 && (
        <Card className="stat-card border-primary/30">
          <CardHeader>
            <CardTitle className="text-primary">Today's Problems</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayProblems.map((problem) => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                progress={progress[problem.id]}
                onToggleComplete={onToggleComplete}
                onToggleRevision={onToggleRevision}
                userId={userId}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
