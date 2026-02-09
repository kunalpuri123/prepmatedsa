CREATE TABLE IF NOT EXISTS public.user_linkedin_auth (
  user_id UUID NOT NULL PRIMARY KEY,
  linkedin_member_id TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  scope TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  auto_post_enabled BOOLEAN NOT NULL DEFAULT false,
  auto_post_time TIME,
  auto_post_timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_linkedin_post_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'posted',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_date)
);

CREATE TABLE IF NOT EXISTS public.user_linkedin_oauth_states (
  state TEXT NOT NULL PRIMARY KEY,
  user_id UUID NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS user_linkedin_post_logs_user_id_idx
  ON public.user_linkedin_post_logs(user_id);

ALTER TABLE public.user_linkedin_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_linkedin_post_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_linkedin_oauth_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own linkedin auth"
ON public.user_linkedin_auth
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linkedin auth"
ON public.user_linkedin_auth
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linkedin auth"
ON public.user_linkedin_auth
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own linkedin post logs"
ON public.user_linkedin_post_logs
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linkedin post logs"
ON public.user_linkedin_post_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linkedin post logs"
ON public.user_linkedin_post_logs
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own linkedin post logs"
ON public.user_linkedin_post_logs
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linkedin oauth states"
ON public.user_linkedin_oauth_states
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own linkedin oauth states"
ON public.user_linkedin_oauth_states
FOR DELETE
USING (auth.uid() = user_id);
