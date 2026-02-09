import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Trophy, Flame, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { getTotalProblemsCount } from '@/data/dsaProblems';

interface UserProgress {
  user_id: string;
  display_name: string | null;
  completed_count: number;
  current_streak: number;
  longest_streak: number;
}

const Community = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalProblems = getTotalProblemsCount();

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
    if (user) {
      loadCommunityProgress();
    }
  }, [user]);

  const loadCommunityProgress = async () => {
    setIsLoading(true);
    try {
      // Get all public profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('user_id, display_name')
        .eq('is_public', true);

      if (profilesError) throw profilesError;

      if (!profiles || profiles.length === 0) {
        setUsers([]);
        setIsLoading(false);
        return;
      }

      // Get progress for each user
      const userProgressPromises = profiles.map(async (profile) => {
        const { count } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', profile.user_id)
          .eq('completed', true);

        const { data: streakData } = await supabase
          .from('user_streak')
          .select('current_streak, longest_streak')
          .eq('user_id', profile.user_id)
          .maybeSingle();

        return {
          user_id: profile.user_id,
          display_name: profile.display_name,
          completed_count: count || 0,
          current_streak: streakData?.current_streak || 0,
          longest_streak: streakData?.longest_streak || 0,
        };
      });

      const usersProgress = await Promise.all(userProgressPromises);
      
      // Sort by completed count
      usersProgress.sort((a, b) => b.completed_count - a.completed_count);
      
      setUsers(usersProgress);
    } catch (error) {
      console.error('Error loading community progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={handleLogout} userName={user.email} />
      
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Community Progress
            </h1>
            <p className="text-muted-foreground mt-1">
              See how other users are progressing through the DSA sheet
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="stat-card border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-full bg-primary/20">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Active Learners</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-full bg-success/20">
                  <Trophy className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalProblems}</p>
                  <p className="text-sm text-muted-foreground">Total Problems</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-full bg-warning/20">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.length > 0 ? Math.max(...users.map(u => u.current_streak)) : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Top Streak</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card className="stat-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No public profiles yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Be the first to make your profile public!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((userProgress, index) => (
                    <div
                      key={userProgress.user_id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        index < 3 
                          ? 'border-primary/30 bg-primary/5' 
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="text-2xl font-bold w-10 text-center">
                        {getRankBadge(index)}
                      </div>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {getInitials(userProgress.display_name, userProgress.user_id)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {userProgress.display_name || 'Anonymous User'}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <Progress 
                            value={(userProgress.completed_count / totalProblems) * 100} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {userProgress.completed_count}/{totalProblems}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-warning">
                        <Flame className="h-4 w-4" />
                        <span className="font-medium">{userProgress.current_streak}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Join the Community */}
          <Card className="stat-card border-primary/30 bg-gradient-to-r from-primary/10 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Make Your Profile Public</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Share your progress with the community and compete on the leaderboard!
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/settings')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Go to Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Community;
