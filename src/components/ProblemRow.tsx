import React, { useEffect, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, StarOff, FileText, BookOpenCheck, Loader2, Youtube, Timer } from 'lucide-react';
import { Problem } from '@/data/dsaProblems';
import { DifficultyBadge } from './DifficultyBadge';
import { ProblemProgress } from '@/hooks/useDSAProgress';
import { cn } from '@/lib/utils';
import { ProblemNotesSheet } from './ProblemNotesSheet';
import { getWalkcccSolutionUrl } from '@/lib/walkccc';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';

interface ProblemRowProps {
  problem: Problem;
  progress?: ProblemProgress;
  onToggleComplete: (problemId: string, origin?: { x: number; y: number }) => void;
  onToggleRevision: (problemId: string, origin?: { x: number; y: number }) => void;
  userId?: string;
  timeSpentSeconds?: number;
  autoOpenNotesId?: string | null;
  onNotesOpened?: () => void;
  hideCompletionCheckbox?: boolean;
  showRevisedCheckbox?: boolean;
  isRevised?: boolean;
  onMarkRevised?: (problemId: string, origin?: { x: number; y: number }) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  progress,
  onToggleComplete,
  onToggleRevision,
  userId,
  timeSpentSeconds,
  autoOpenNotesId,
  onNotesOpened,
  hideCompletionCheckbox = false,
  showRevisedCheckbox = false,
  isRevised = false,
  onMarkRevised,
}) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isSolutionLoading, setIsSolutionLoading] = useState(false);
  const [isTiming, setIsTiming] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const coinOriginRef = useRef<{ x: number; y: number } | null>(null);
  const revisionOriginRef = useRef<{ x: number; y: number } | null>(null);
  const revisedOriginRef = useRef<{ x: number; y: number } | null>(null);
  const isCompleted = progress?.completed || false;
  const isRevision = progress?.revision || false;

  useEffect(() => {
    if (!autoOpenNotesId || autoOpenNotesId !== problem.id) return;
    if (!userId) return;
    setIsNotesOpen(true);
    onNotesOpened?.();
  }, [autoOpenNotesId, problem.id, userId, onNotesOpened]);

  const formatTime = (seconds?: number) => {
    if (!seconds || seconds <= 0) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins <= 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };
  const timeLabel = formatTime(timeSpentSeconds);

  useEffect(() => {
    if (!isTiming) return;
    timerRef.current = window.setInterval(() => {
      if (startRef.current) {
        setElapsedSeconds(Math.floor((Date.now() - startRef.current) / 1000));
      }
    }, 1000);
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTiming]);

  const handleOpenSolution = async () => {
    setIsSolutionLoading(true);
    try {
      const url = await getWalkcccSolutionUrl(problem.url);
      if (!url) {
        toast.error('Solution link not available yet.');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to load solution link', error);
      toast.error('Failed to load solution link.');
    } finally {
      setIsSolutionLoading(false);
    }
  };

  const handleToggleTimer = async () => {
    if (!userId) {
      toast.error('Please sign in to track time.');
      return;
    }

    if (!isTiming) {
      startRef.current = Date.now();
      setElapsedSeconds(0);
      setIsTiming(true);
      return;
    }

    const startedAt = startRef.current ? new Date(startRef.current) : new Date();
    const endedAt = new Date();
    const duration = Math.max(1, Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000));
    setIsTiming(false);
    startRef.current = null;

    try {
      const { error } = await supabase.from('user_problem_sessions').insert({
        user_id: userId,
        problem_id: problem.id,
        started_at: startedAt.toISOString(),
        ended_at: endedAt.toISOString(),
        duration_seconds: duration,
      });
      if (error) throw error;
      toast.success('Time logged!');
    } catch (error) {
      console.error('Failed to save session', error);
      toast.error('Failed to save time');
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex items-center justify-between p-4 rounded-lg border transition-all duration-200',
          isCompleted 
            ? 'bg-success/5 border-success/30' 
            : 'bg-card border-border hover:border-primary/50',
        )}
      >
        <div className="flex items-center gap-4">
          {!hideCompletionCheckbox && (
            <Checkbox
              checked={isCompleted}
              onPointerDown={(event) => {
                coinOriginRef.current = { x: event.clientX, y: event.clientY };
              }}
              onCheckedChange={() => {
                onToggleComplete(problem.id, coinOriginRef.current ?? undefined);
                coinOriginRef.current = null;
              }}
              className="h-5 w-5 border-2 data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
          )}
          
          <div className="flex flex-col gap-1">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'font-medium hover:text-primary transition-colors flex items-center gap-2',
                isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
              )}
            >
              {problem.title}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={problem.difficulty} />

          {timeLabel && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-muted-foreground px-2 py-1 rounded-md border border-border bg-muted/30">
                  {timeLabel}
                </span>
              </TooltipTrigger>
              <TooltipContent>Total time spent</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isTiming ? 'default' : 'ghost'}
                size="icon"
                className={cn(
                  'h-8 w-8',
                  isTiming ? 'text-primary-foreground' : 'text-muted-foreground hover:text-primary',
                )}
                onClick={handleToggleTimer}
              >
                <Timer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isTiming ? `Stop timer (${elapsedSeconds}s)` : 'Start timer'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              {problem.youtubeUrl ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-red-500"
                onClick={() => window.open(problem.youtubeUrl, '_blank', 'noopener,noreferrer')}
              >
                <Youtube className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
                disabled
              >
                <Youtube className="h-4 w-4" />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent>{problem.youtubeUrl ? 'Watch solution' : 'Coming soon'}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenSolution}
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                disabled={isSolutionLoading}
              >
                {isSolutionLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BookOpenCheck className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Solution (walkccc)</TooltipContent>
          </Tooltip>
          
          {userId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotesOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              title="Add Notes"
            >
              <FileText className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onPointerDown={(event) => {
              revisionOriginRef.current = { x: event.clientX, y: event.clientY };
            }}
            onClick={() => {
              onToggleRevision(problem.id, revisionOriginRef.current ?? undefined);
              revisionOriginRef.current = null;
            }}
            className={cn(
              'h-8 w-8',
              isRevision ? 'text-warning hover:text-warning/80' : 'text-muted-foreground hover:text-warning'
            )}
          >
            {isRevision ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
          </Button>

          {showRevisedCheckbox && (
            <div className="flex items-center gap-2 text-xs">
              <Checkbox
                checked={isRevised}
                disabled={isRevised}
                onPointerDown={(event) => {
                  revisedOriginRef.current = { x: event.clientX, y: event.clientY };
                }}
                onCheckedChange={() => {
                  if (isRevised) return;
                  onMarkRevised?.(problem.id, revisedOriginRef.current ?? undefined);
                  revisedOriginRef.current = null;
                }}
                className="h-4 w-4 border-2 data-[state=checked]:bg-warning data-[state=checked]:border-warning"
              />
              <span className={isRevised ? 'text-warning font-medium' : 'text-muted-foreground'}>Revised</span>
            </div>
          )}
        </div>
      </div>

      {userId && (
        <ProblemNotesSheet
          problem={problem}
          isOpen={isNotesOpen}
          onClose={() => setIsNotesOpen(false)}
          userId={userId}
        />
      )}
    </>
  );
};
