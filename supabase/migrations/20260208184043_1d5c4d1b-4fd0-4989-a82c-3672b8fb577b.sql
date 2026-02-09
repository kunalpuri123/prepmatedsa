-- Create user_progress table to store each user's progress
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  problem_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  revision BOOLEAN NOT NULL DEFAULT false,
  revision_added_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Create user_notes table for storing rich notes per problem
CREATE TABLE public.user_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  problem_id TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Create user_planner table for storing planner state
CREATE TABLE public.user_planner (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_paused BOOLEAN NOT NULL DEFAULT false,
  start_date DATE,
  paused_at DATE,
  total_days INTEGER NOT NULL DEFAULT 30,
  day_plans JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_streak table for streak tracking
CREATE TABLE public.user_streak (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  streak_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table for displaying user info
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_planner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streak ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress" 
ON public.user_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view other public users progress" 
ON public.user_progress 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_profiles.user_id = user_progress.user_id 
    AND user_profiles.is_public = true
  )
);

CREATE POLICY "Users can insert their own progress" 
ON public.user_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress" 
ON public.user_progress 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for user_notes
CREATE POLICY "Users can view their own notes" 
ON public.user_notes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" 
ON public.user_notes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
ON public.user_notes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
ON public.user_notes 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for user_planner
CREATE POLICY "Users can view their own planner" 
ON public.user_planner 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own planner" 
ON public.user_planner 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own planner" 
ON public.user_planner 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own planner" 
ON public.user_planner 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for user_streak
CREATE POLICY "Users can view their own streak" 
ON public.user_streak 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view other public users streak" 
ON public.user_streak 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE user_profiles.user_id = user_streak.user_id 
    AND user_profiles.is_public = true
  )
);

CREATE POLICY "Users can insert their own streak" 
ON public.user_streak 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streak" 
ON public.user_streak 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own streak" 
ON public.user_streak 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view all public profiles" 
ON public.user_profiles 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.user_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at
BEFORE UPDATE ON public.user_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_planner_updated_at
BEFORE UPDATE ON public.user_planner
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_streak_updated_at
BEFORE UPDATE ON public.user_streak
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();