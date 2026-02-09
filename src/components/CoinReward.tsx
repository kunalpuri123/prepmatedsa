import React, { useEffect, useState } from 'react';

export const CoinReward: React.FC = () => {
  const [burst, setBurst] = useState<{ id: number; coins: number } | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ coins: number }>).detail;
      if (!detail?.coins) return;
      setBurst({ id: Date.now(), coins: detail.coins });
      setTimeout(() => setBurst(null), 1400);
    };

    window.addEventListener('coins-awarded', handler);
    return () => window.removeEventListener('coins-awarded', handler);
  }, []);

  if (!burst) return null;

  return (
    <div className="coin-burst">
      <div className="coin-burst__pill">+{burst.coins} coins</div>
    </div>
  );
};
