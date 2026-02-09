ALTER TABLE public.user_system_design_settings
  ADD COLUMN IF NOT EXISTS is_paused BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS paused_at DATE,
  ADD COLUMN IF NOT EXISTS stopped_at DATE;
