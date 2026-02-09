import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, FolderOpen, Grid3X3 } from 'lucide-react';
import { Problem } from '@/data/dsaProblems';
import { ProblemRow } from './ProblemRow';
import { ProblemProgress } from '@/hooks/useDSAProgress';

interface RevisionSheetProps {
  revisionData: {
    all: Problem[];
    byTopic: Record<string, Problem[]>;
    byPattern: Record<string, Problem[]>;
  };
  progress: Record<string, ProblemProgress>;
  onToggleComplete: (problemId: string) => void;
  onToggleRevision: (problemId: string) => void;
  userId?: string;
  revisedSet: Set<string>;
  onMarkRevised: (problemId: string, origin?: { x: number; y: number }) => void;
}

export const RevisionSheet: React.FC<RevisionSheetProps> = ({
  revisionData,
  progress,
  onToggleComplete,
  onToggleRevision,
  userId,
  revisedSet,
  onMarkRevised,
}) => {
  if (revisionData.all.length === 0) {
    return (
      <Card className="stat-card border-border">
        <CardContent className="py-12 text-center">
          <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Revision Problems Yet</h3>
          <p className="text-muted-foreground">
            Mark problems with the star icon to add them to your revision list.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Star className="h-4 w-4 mr-2" />
          All ({revisionData.all.length})
        </TabsTrigger>
        <TabsTrigger value="topic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FolderOpen className="h-4 w-4 mr-2" />
          By Topic
        </TabsTrigger>
        <TabsTrigger value="pattern" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Grid3X3 className="h-4 w-4 mr-2" />
          By Pattern
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-2">
        {revisionData.all.map((problem) => (
          <ProblemRow
            key={problem.id}
            problem={problem}
            progress={progress[problem.id]}
            onToggleComplete={onToggleComplete}
            onToggleRevision={onToggleRevision}
            userId={userId}
            hideCompletionCheckbox
            showRevisedCheckbox
            isRevised={revisedSet.has(problem.id)}
            onMarkRevised={onMarkRevised}
          />
        ))}
      </TabsContent>

      <TabsContent value="topic" className="space-y-6">
        {Object.entries(revisionData.byTopic).map(([topicName, problems]) => (
          <Card key={topicName} className="stat-card border-border">
            <CardHeader>
              <CardTitle className="text-base">{topicName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {problems.map((problem) => (
                <ProblemRow
                  key={problem.id}
                  problem={problem}
                  progress={progress[problem.id]}
                  onToggleComplete={onToggleComplete}
                  onToggleRevision={onToggleRevision}
                  userId={userId}
                  hideCompletionCheckbox
                  showRevisedCheckbox
                  isRevised={revisedSet.has(problem.id)}
                  onMarkRevised={onMarkRevised}
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="pattern" className="space-y-6">
        {Object.entries(revisionData.byPattern).map(([patternId, problems]) => (
          <Card key={patternId} className="stat-card border-border">
            <CardHeader>
              <CardTitle className="text-base capitalize">
                {patternId.replace(/-/g, ' ')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {problems.map((problem) => (
                <ProblemRow
                  key={problem.id}
                  problem={problem}
                  progress={progress[problem.id]}
                  onToggleComplete={onToggleComplete}
                  onToggleRevision={onToggleRevision}
                  userId={userId}
                  hideCompletionCheckbox
                  showRevisedCheckbox
                  isRevised={revisedSet.has(problem.id)}
                  onMarkRevised={onMarkRevised}
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
};
