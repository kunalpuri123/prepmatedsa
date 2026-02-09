CREATE TABLE IF NOT EXISTS public.user_system_design_settings (
  user_id UUID NOT NULL PRIMARY KEY,
  start_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_system_design_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  entry_date DATE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, entry_date)
);

CREATE INDEX IF NOT EXISTS user_system_design_entries_user_id_idx
  ON public.user_system_design_entries(user_id);

ALTER TABLE public.user_system_design_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_system_design_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own system design settings"
ON public.user_system_design_settings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own system design settings"
ON public.user_system_design_settings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own system design settings"
ON public.user_system_design_settings
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own system design entries"
ON public.user_system_design_entries
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own system design entries"
ON public.user_system_design_entries
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own system design entries"
ON public.user_system_design_entries
FOR UPDATE
USING (auth.uid() = user_id);
