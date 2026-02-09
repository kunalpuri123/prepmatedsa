import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Topic } from '@/data/dsaProblems';
import { ProblemRow } from './ProblemRow';
import { ProblemProgress } from '@/hooks/useDSAProgress';
import { Progress } from '@/components/ui/progress';

interface TopicAccordionProps {
  topics: Topic[];
  progress: Record<string, ProblemProgress>;
  onToggleComplete: (problemId: string) => void;
  onToggleRevision: (problemId: string) => void;
  userId?: string;
  timeTotals?: Record<string, number>;
  openNotesProblemId?: string | null;
  onNotesOpened?: () => void;
}

export const TopicAccordion: React.FC<TopicAccordionProps> = ({
  topics,
  progress,
  onToggleComplete,
  onToggleRevision,
  userId,
  timeTotals,
  openNotesProblemId,
  onNotesOpened,
}) => {
  const getTopicProgress = (topic: Topic) => {
    const allProblems = topic.patterns.flatMap(p => p.problems);
    const completed = allProblems.filter(p => progress[p.id]?.completed).length;
    return {
      completed,
      total: allProblems.length,
      percentage: Math.round((completed / allProblems.length) * 100),
    };
  };

  const getPatternProgress = (problems: typeof topics[0]['patterns'][0]['problems']) => {
    const completed = problems.filter(p => progress[p.id]?.completed).length;
    return {
      completed,
      total: problems.length,
      percentage: Math.round((completed / problems.length) * 100),
    };
  };

  return (
    <Accordion type="multiple" className="space-y-4">
      {topics.map((topic) => {
        const topicProgress = getTopicProgress(topic);
        
        return (
          <AccordionItem
            key={topic.id}
            value={topic.id}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-lg font-semibold">{topic.name}</span>
                  <span className="text-sm text-muted-foreground">{topic.description}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <Progress value={topicProgress.percentage} className="h-2" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground min-w-[60px] text-right">
                    {topicProgress.completed}/{topicProgress.total}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <Accordion type="multiple" className="space-y-3">
                {topic.patterns.map((pattern) => {
                  const patternProgress = getPatternProgress(pattern.problems);
                  
                  return (
                    <AccordionItem
                      key={pattern.id}
                      value={pattern.id}
                      className="border border-border/50 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-medium text-sm">{pattern.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {patternProgress.completed}/{patternProgress.total}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="space-y-2">
                          {pattern.problems.map((problem) => (
                            <ProblemRow
                              key={problem.id}
                              problem={problem}
                              progress={progress[problem.id]}
                              onToggleComplete={onToggleComplete}
                              onToggleRevision={onToggleRevision}
                              userId={userId}
                              timeSpentSeconds={timeTotals?.[problem.id]}
                              autoOpenNotesId={openNotesProblemId}
                              onNotesOpened={onNotesOpened}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
