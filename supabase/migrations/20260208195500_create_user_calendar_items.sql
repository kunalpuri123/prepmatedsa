-- Calendar items for notes and todos
CREATE TABLE IF NOT EXISTS public.user_calendar_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  item_type TEXT NOT NULL DEFAULT 'note',
  scope TEXT NOT NULL DEFAULT 'day',
  target_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_calendar_items_user_id_idx
  ON public.user_calendar_items(user_id);

CREATE INDEX IF NOT EXISTS user_calendar_items_user_date_idx
  ON public.user_calendar_items(user_id, target_date);

ALTER TABLE public.user_calendar_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own calendar items"
ON public.user_calendar_items
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calendar items"
ON public.user_calendar_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar items"
ON public.user_calendar_items
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar items"
ON public.user_calendar_items
FOR DELETE
USING (auth.uid() = user_id);
