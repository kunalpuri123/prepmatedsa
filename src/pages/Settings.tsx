import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, User, Globe, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      } else {
        loadProfile(session.user.id, session.user.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      } else {
        loadProfile(session.user.id, session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string, email?: string | null) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('display_name, is_public')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setDisplayName(data.display_name || '');
        setIsPublic(data.is_public);
        return;
      }

      const fallbackName = email ? email.split('@')[0] : null;
      const { data: created, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          display_name: fallbackName,
          is_public: true,
        })
        .select('display_name, is_public')
        .single();

      if (createError) throw createError;

      setDisplayName(created?.display_name || '');
      setIsPublic(created?.is_public ?? true);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          display_name: displayName || null,
          is_public: isPublic,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      await loadProfile(user.id, user.email);
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <SettingsIcon className="h-8 w-8 text-primary" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your profile and preferences
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Profile Settings */}
              <Card className="stat-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile
                  </CardTitle>
                  <CardDescription>
                    Customize how you appear to others
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                    />
                    <p className="text-xs text-muted-foreground">
                      This name will be shown on the community leaderboard
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card className="stat-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Privacy
                  </CardTitle>
                  <CardDescription>
                    Control your visibility in the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your progress on the leaderboard
                      </p>
                    </div>
                    <Switch
                      id="public-profile"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <Button 
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;
