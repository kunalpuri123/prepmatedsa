-- Track each submission/solve event for heatmap
CREATE TABLE IF NOT EXISTS public.user_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  problem_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'accepted',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_submissions_user_id_idx
  ON public.user_submissions(user_id);

CREATE INDEX IF NOT EXISTS user_submissions_user_date_idx
  ON public.user_submissions(user_id, created_at);

ALTER TABLE public.user_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own submissions"
ON public.user_submissions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
ON public.user_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);
