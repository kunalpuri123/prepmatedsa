CREATE TABLE IF NOT EXISTS public.user_problem_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  problem_id TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_seconds INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXIßSTS user_problem_sessions_user_id_idx
  ON public.user_problem_sessions(user_id);

CREATE INDEX IF NOT EXISTS user_problem_sessions_user_problem_idx
  ON public.user_problem_sessions(user_id, problem_id);

CREATE INDEX IF NOT EXISTS user_problem_sessions_user_started_idx
  ON public.user_problem_sessions(user_id, started_at);

ALTER TABLE public.user_problem_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own problem sessions"
ON public.user_problem_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own problem sessions"
ON public.user_problem_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own problem sessions"
ON public.user_problem_sessions
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own problem sessions"
ON public.user_problem_sessions
FOR DELETE
USING (auth.uid() = user_id);
