import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { fetchUserCoins } from '@/lib/rewards';

const Store = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth');
      } else {
        fetchUserCoins(session.user.id).then(setCoins).catch(() => setCoins(0));
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onLogout={() => supabase.auth.signOut()} userName={user.email} />
      <main className="ml-0 lg:ml-[var(--sidebar-width,16rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="stat-card border-border">
            <CardHeader>
              <CardTitle>Store</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your balance: <span className="font-semibold text-foreground">{coins} coins</span></p>
            </CardContent>
          </Card>

          <Card className="stat-card border-border">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Redeem coins for premium templates, mock interview coupons, and more.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Store;
