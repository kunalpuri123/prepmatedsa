import { supabase } from '@/integrations/supabase/client';

export type RewardEvent = {
  userId: string;
  eventType: 'problem' | 'potd' | 'contest' | 'revision' | 'system-design';
  eventId: string;
  coins: number;
  origin?: { x: number; y: number };
};

export const awardCoins = async ({ userId, eventType, eventId, coins, origin }: RewardEvent) => {
  const { error: logError } = await supabase
    .from('user_rewards_log')
    .insert({
      user_id: userId,
      event_type: eventType,
      event_id: eventId,
      coins,
    });

  if (logError) {
    if ((logError as any).code === '23505') {
      return { awarded: false, coins: 0 };
    }
    throw logError;
  }

  const { data: existing } = await supabase
    .from('user_coins')
    .select('coins')
    .eq('user_id', userId)
    .maybeSingle();

  const nextCoins = (existing?.coins || 0) + coins;

  const { error: upsertError } = await supabase
    .from('user_coins')
    .upsert({ user_id: userId, coins: nextCoins }, { onConflict: 'user_id' });

  if (upsertError) {
    throw upsertError;
  }

  window.dispatchEvent(
    new CustomEvent('coins-awarded', { detail: { coins, total: nextCoins, x: origin?.x, y: origin?.y } }),
  );

  return { awarded: true, coins: nextCoins };
};

export const fetchCompletedEvents = async (userId: string, eventType: RewardEvent['eventType']) => {
  const { data, error } = await supabase
    .from('user_rewards_log')
    .select('event_id')
    .eq('user_id', userId)
    .eq('event_type', eventType);
  if (error) throw error;
  return new Set((data || []).map(row => row.event_id));
};

export const fetchUserCoins = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_coins')
    .select('coins')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data?.coins || 0;
};
