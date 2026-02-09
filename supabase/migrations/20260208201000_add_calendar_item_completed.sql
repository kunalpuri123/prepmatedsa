ALTER TABLE public.user_calendar_items
ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT false;
