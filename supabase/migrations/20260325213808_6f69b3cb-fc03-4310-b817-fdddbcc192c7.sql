
-- Timeline events table
CREATE TABLE public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date text NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own timeline events" ON public.timeline_events FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own timeline events" ON public.timeline_events FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own timeline events" ON public.timeline_events FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own timeline events" ON public.timeline_events FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Love items table
CREATE TABLE public.love_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  text text NOT NULL,
  category text NOT NULL DEFAULT 'personality',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.love_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own love items" ON public.love_items FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own love items" ON public.love_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own love items" ON public.love_items FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own love items" ON public.love_items FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Countdown events table
CREATE TABLE public.countdown_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  date text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.countdown_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own countdown events" ON public.countdown_events FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own countdown events" ON public.countdown_events FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own countdown events" ON public.countdown_events FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own countdown events" ON public.countdown_events FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Food items table
CREATE TABLE public.food_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own food items" ON public.food_items FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own food items" ON public.food_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own food items" ON public.food_items FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own food items" ON public.food_items FOR DELETE TO authenticated USING (auth.uid() = user_id);
