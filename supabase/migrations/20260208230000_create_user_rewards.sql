CREATE TABLE IF NOT EXISTS public.user_coins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  coins INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_rewards_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  event_id TEXT NOT NULL,
  coins INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_type, event_id)
);

CREATE INDEX IF NOT EXISTS user_rewards_log_user_id_idx
  ON public.user_rewards_log(user_id);

ALTER TABLE public.user_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_rewards_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own coins"
ON public.user_coins
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own coins"
ON public.user_coins
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own coins"
ON public.user_coins
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own rewards log"
ON public.user_rewards_log
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rewards log"
ON public.user_rewards_log
FOR INSERT
WITH CHECK (auth.uid() = user_id);
