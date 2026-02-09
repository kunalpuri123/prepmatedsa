import React, { useEffect, useRef, useState } from 'react';
import { Coins } from 'lucide-react';
import { fetchUserCoins } from '@/lib/rewards';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type CoinBurst = {
  id: number;
  coins: number;
  fromX: number;
  fromY: number;
};

export const CoinHUD: React.FC = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0);
  const [bursts, setBursts] = useState<CoinBurst[]>([]);
  const [hasUser, setHasUser] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadCoins = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setHasUser(false);
        return;
      }
      setHasUser(true);
      const balance = await fetchUserCoins(session.user.id);
      setCoins(balance);
    };

    loadCoins();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setHasUser(false);
        setCoins(0);
        return;
      }
      setHasUser(true);
      fetchUserCoins(session.user.id).then(setCoins).catch(() => setCoins(0));
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ coins: number; total: number; x?: number; y?: number }>).detail;
      if (!detail?.coins) return;
      if (typeof detail.total === 'number') {
        setCoins(detail.total);
      } else {
        setCoins(prev => prev + detail.coins);
      }

      const rect = targetRef.current?.getBoundingClientRect();
      const toX = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
      const toY = rect ? rect.top + rect.height / 2 : 20;
      const fromX = detail.x ?? toX;
      const fromY = detail.y ?? toY + 120;

      const id = Date.now();
      setBursts(prev => [...prev, { id, coins: detail.coins, fromX, fromY }]);

      setTimeout(() => {
        setBursts(prev => prev.filter(burst => burst.id !== id));
      }, 900);
    };

    window.addEventListener('coins-awarded', handler);
    return () => window.removeEventListener('coins-awarded', handler);
  }, []);

  if (!hasUser) return null;

  return (
    <>
      <button
        type="button"
        className="coin-hud"
        ref={targetRef}
        onClick={() => navigate('/store')}
        aria-label="Redeem coins"
        title="Redeem coins"
      >
        <div className="coin-hud__icon">
          <Coins className="h-4 w-4 text-amber-900" />
        </div>
        <span className="coin-hud__value">{coins}</span>
      </button>
      {bursts.map(burst => {
        const rect = targetRef.current?.getBoundingClientRect();
        const toX = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
        const toY = rect ? rect.top + rect.height / 2 : 20;
        return (
          <div
            key={burst.id}
            className="coin-fly"
            style={{
              ['--from-x' as any]: `${burst.fromX}px`,
              ['--from-y' as any]: `${burst.fromY}px`,
              ['--to-x' as any]: `${toX}px`,
              ['--to-y' as any]: `${toY}px`,
            }}
          >
            <div className="coin-fly__bubble">+{burst.coins}</div>
          </div>
        );
      })}
    </>
  );
};
