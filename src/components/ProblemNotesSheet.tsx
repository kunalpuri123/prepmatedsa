import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { DsaNotesEditor } from './DsaNotesEditor';
import { Problem } from '@/data/dsaProblems';
import { DifficultyBadge } from './DifficultyBadge';
import { ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProblemNotesSheetProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const ProblemNotesSheet: React.FC<ProblemNotesSheetProps> = ({
  problem,
  isOpen,
  onClose,
  userId,
}) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (problem && isOpen && userId) {
      loadNotes();
    }
  }, [problem?.id, isOpen, userId]);

  const loadNotes = async () => {
    if (!problem || !userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .select('content')
        .eq('user_id', userId)
        .eq('problem_id', problem.id)
        .maybeSingle();

      if (error) throw error;
      setContent(data?.content || '');
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newContent: string) => {
    if (!problem || !userId) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('user_notes')
        .upsert({
          user_id: userId,
          problem_id: problem.id,
          content: newContent,
        }, {
          onConflict: 'user_id,problem_id'
        });

      if (error) throw error;
      setContent(newContent);
      toast.success('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setIsSaving(false);
    }
  };

  if (!problem) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            {problem.title}
            <DifficultyBadge difficulty={problem.difficulty} />
          </SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              Open on LeetCode <ExternalLink className="h-3 w-3" />
            </a>
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Your Notes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your solution approach, dry run diagrams, complexity analysis, and key insights.
          </p>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <DsaNotesEditor
              content={content}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}
          
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <h4 className="font-medium mb-2">Tips for great notes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use <strong>headings</strong> to organize your approach</li>
              <li>• Include <strong>code blocks</strong> for your solution</li>
              <li>• Write out your <strong>dry run</strong> step by step</li>
              <li>• Note the <strong>time & space complexity</strong></li>
              <li>• Add <strong>edge cases</strong> to remember</li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
