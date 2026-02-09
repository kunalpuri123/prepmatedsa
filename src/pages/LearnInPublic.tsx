import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { getAllProblems } from '@/data/dsaProblems';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { ExternalLink, PencilLine, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const LearnInPublic = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [systemDesignNote, setSystemDesignNote] = useState<string>('');
  const [customNote, setCustomNote] = useState('');
  const [contestCount, setContestCount] = useState(0);
  const [potdCount, setPotdCount] = useState(0);
  const [todayDsaTitles, setTodayDsaTitles] = useState<string[]>([]);
  const [todayContestTitles, setTodayContestTitles] = useState<string[]>([]);

  const { progress } = useDSAProgress(user?.id);

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
    const loadSystemDesign = async () => {
      const todayIso = toISODate(new Date());
      const { data } = await supabase
        .from('user_system_design_entries')
        .select('content')
        .eq('user_id', user.id)
        .eq('entry_date', todayIso)
        .maybeSingle();
      setSystemDesignNote(data?.content || '');
    };
    const loadSubmissions = async () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      const { data } = await supabase
        .from('user_submissions')
        .select('problem_id')
        .eq('user_id', user.id)
        .gte('created_at', start.toISOString())
        .lt('created_at', end.toISOString());
      const ids = (data || []).map((row) => row.problem_id);
      const contestIds = ids.filter((id) => id.startsWith('contest-'));
      setContestCount(contestIds.length);
      setPotdCount(ids.filter((id) => id.startsWith('potd-')).length);

      const all = getAllProblems();
      const map = new Map(all.map((p) => [p.id, p.title]));
      const dsaIds = ids.filter((id) => !id.startsWith('contest-') && !id.startsWith('potd-'));
      const titles = dsaIds.map((id) => map.get(id)).filter(Boolean) as string[];
      setTodayDsaTitles(Array.from(new Set(titles)));

      if (contestIds.length > 0) {
        const contests = contestIds.map((raw) => raw.replace(/^contest-/, ''));
        const pretty = contests.map((entry) => {
          const parts = entry.split('-');
          const platform = parts.shift() || '';
          const time = parts.pop() || '';
          const name = parts.join(' ');
          const platformLabel = platform.charAt(0).toUpperCase() + platform.slice(1);
          return `${name} (${platformLabel})`;
        });
        setTodayContestTitles(Array.from(new Set(pretty)));
      } else {
        setTodayContestTitles([]);
      }
    };
    loadSystemDesign();
    loadSubmissions();
  }, [user]);


  const todayIso = toISODate(new Date());
  const todayDsa = useMemo(() => {
    if (todayDsaTitles.length > 0) {
      return todayDsaTitles;
    }
    const all = getAllProblems();
    return all
      .filter((problem) => {
        const entry = progress[problem.id];
        if (!entry?.completedAt) return false;
        return entry.completedAt.startsWith(todayIso);
      })
      .map((problem) => problem.title);
  }, [progress, todayIso, todayDsaTitles]);

  const shareText = useMemo(() => {
    const lines: Array<string | null> = [];
    lines.push('Day Update – Learn in Public');
    lines.push('');

    if (todayDsa.length > 0) {
      lines.push(`✅ DSA: Solved ${todayDsa.length} problem${todayDsa.length > 1 ? 's' : ''}`);
      lines.push('Problems:');
      Array.from(new Set(todayDsa)).forEach((title, index) => {
        lines.push(`${index + 1}. ${title}`);
      });
    }

    if (todayContestTitles.length > 0) {
      lines.push('🏆 Contests:');
      todayContestTitles.forEach((title, index) => {
        lines.push(`${index + 1}. ${title}`);
      });
    }

    if (potdCount > 0) {
      lines.push(`🌟 LeetCode POTD: Completed`);
    }

    if (systemDesignNote) {
      lines.push(`✅ System Design: ${systemDesignNote}`);
    }

    if (customNote.trim()) {
      lines.push(`📝 Notes: ${customNote.trim()}`);
    }

    lines.push('');
    lines.push('#DSA #SystemDesign #InterviewPrep #Consistency');
    return lines.filter(Boolean).join('\n');
  }, [todayDsa, todayContestTitles, contestCount, potdCount, systemDesignNote, customNote]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Post text copied. Paste it in LinkedIn.');
    } catch {
      toast.message('Copy failed. You can still paste from the preview.');
    }
    const url = encodeURIComponent(window.location.origin);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareX = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Post text copied. Paste it in X if needed.');
    } catch {
      toast.message('Copy failed. You can still paste from the preview.');
    }
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(window.location.origin);
    const shareUrl = `https://x.com/intent/post?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };


  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={() => supabase.auth.signOut()} userName={user.email} />
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Learn in Public</h1>
            <p className="text-muted-foreground">
              Share your daily DSA + System Design progress on LinkedIn in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="stat-card border-border">
              <CardHeader>
                <CardTitle>Today’s DSA Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-semibold">{todayDsa.length} problems completed</p>
                <p className="text-sm text-muted-foreground">
                  {todayDsa.length === 0 ? 'Complete problems to show them here.' : todayDsa.slice(0, 5).join(', ')}
                  {todayDsa.length > 5 ? '…' : ''}
                </p>
              </CardContent>
            </Card>

            <Card className="stat-card border-border">
              <CardHeader>
                <CardTitle>Today’s System Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {systemDesignNote || 'No entry saved for today.'}
                </p>
                <p className="text-xs text-muted-foreground">Date: {todayIso}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="stat-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PencilLine className="h-4 w-4" />
                Share Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={customNote}
                onChange={(event) => setCustomNote(event.target.value)}
                rows={3}
                className="w-full rounded-md border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="Add a personal note or takeaway..."
              />
              <div className="rounded-md border border-border p-3 text-sm bg-muted/20">
                {shareText}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
                <Button variant="secondary" onClick={handleShareX}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on X
                </Button>
                <Button variant="outline" onClick={handleCopy}>
                  Copy Text
                </Button>
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-primary"
                >
                  Open LinkedIn <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default LearnInPublic;
