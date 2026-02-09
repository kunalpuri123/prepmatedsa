CREATE TABLE IF NOT EXISTS public.user_job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_link TEXT,
  package TEXT,
  status TEXT NOT NULL DEFAULT 'applied',
  applied_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_job_applications_user_id_idx
  ON public.user_job_applications(user_id);

CREATE INDEX IF NOT EXISTS user_job_applications_user_status_idx
  ON public.user_job_applications(user_id, status);

ALTER TABLE public.user_job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own job applications"
ON public.user_job_applications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job applications"
ON public.user_job_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job applications"
ON public.user_job_applications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job applications"
ON public.user_job_applications
FOR DELETE
USING (auth.uid() = user_id);
