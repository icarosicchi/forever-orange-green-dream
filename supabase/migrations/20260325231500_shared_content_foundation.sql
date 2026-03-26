begin;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  description text not null default '',
  created_by uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.space_members (
  space_id uuid not null references public.spaces(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (space_id, user_id),
  constraint space_members_role_check check (role in ('owner', 'editor', 'viewer'))
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  created_by uuid not null,
  content_key text not null,
  title text,
  body text,
  json_value jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_content_space_key_unique unique (space_id, content_key)
);

create index if not exists space_members_user_id_idx
  on public.space_members (user_id);

create index if not exists site_content_space_sort_idx
  on public.site_content (space_id, sort_order, created_at);

create or replace function public.is_space_member(target_space_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.space_members as sm
    where sm.space_id = target_space_id
      and sm.user_id = auth.uid()
  );
$$;

create or replace function public.can_edit_space(target_space_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.space_members as sm
    where sm.space_id = target_space_id
      and sm.user_id = auth.uid()
      and sm.role in ('owner', 'editor')
  );
$$;

create or replace function public.can_manage_space(target_space_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.space_members as sm
    where sm.space_id = target_space_id
      and sm.user_id = auth.uid()
      and sm.role = 'owner'
  );
$$;

alter table public.spaces enable row level security;
alter table public.space_members enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "Members can view spaces" on public.spaces;
drop policy if exists "Users can create spaces" on public.spaces;
drop policy if exists "Owners can update spaces" on public.spaces;
drop policy if exists "Owners can delete spaces" on public.spaces;

create policy "Members can view spaces"
on public.spaces
for select
to authenticated
using (
  public.is_space_member(id)
);

create policy "Users can create spaces"
on public.spaces
for insert
to authenticated
with check (
  auth.uid() = created_by
);

create policy "Owners can update spaces"
on public.spaces
for update
to authenticated
using (
  public.can_manage_space(id)
)
with check (
  public.can_manage_space(id)
);

create policy "Owners can delete spaces"
on public.spaces
for delete
to authenticated
using (
  public.can_manage_space(id)
);

drop policy if exists "Members can view memberships" on public.space_members;
drop policy if exists "Owners can insert memberships" on public.space_members;
drop policy if exists "Owners can update memberships" on public.space_members;
drop policy if exists "Owners can delete memberships" on public.space_members;

create policy "Members can view memberships"
on public.space_members
for select
to authenticated
using (
  auth.uid() = user_id
  or public.is_space_member(space_id)
);

create policy "Owners can insert memberships"
on public.space_members
for insert
to authenticated
with check (
  public.can_manage_space(space_members.space_id)
  or (
    auth.uid() = space_members.user_id
    and space_members.role = 'owner'
    and exists (
      select 1
      from public.spaces as s
      where s.id = space_members.space_id
        and s.created_by = auth.uid()
    )
    and not exists (
      select 1
      from public.space_members as sm
      where sm.space_id = space_members.space_id
    )
  )
);

create policy "Owners can update memberships"
on public.space_members
for update
to authenticated
using (
  public.can_manage_space(space_id)
)
with check (
  public.can_manage_space(space_id)
);

create policy "Owners can delete memberships"
on public.space_members
for delete
to authenticated
using (
  public.can_manage_space(space_id)
);

drop policy if exists "Members can view site content" on public.site_content;
drop policy if exists "Editors can insert site content" on public.site_content;
drop policy if exists "Editors can update site content" on public.site_content;
drop policy if exists "Editors can delete site content" on public.site_content;

create policy "Members can view site content"
on public.site_content
for select
to authenticated
using (
  public.is_space_member(space_id)
);

create policy "Editors can insert site content"
on public.site_content
for insert
to authenticated
with check (
  auth.uid() = created_by
  and public.can_edit_space(space_id)
);

create policy "Editors can update site content"
on public.site_content
for update
to authenticated
using (
  auth.uid() = created_by
  or public.can_edit_space(space_id)
)
with check (
  auth.uid() = created_by
  or public.can_edit_space(space_id)
);

create policy "Editors can delete site content"
on public.site_content
for delete
to authenticated
using (
  auth.uid() = created_by
  or public.can_edit_space(space_id)
);

alter table public.bucket_items
  add column if not exists space_id uuid references public.spaces(id) on delete cascade,
  add column if not exists sort_order integer not null default 0,
  add column if not exists legacy_key text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.countdown_events
  add column if not exists space_id uuid references public.spaces(id) on delete cascade,
  add column if not exists sort_order integer not null default 0,
  add column if not exists legacy_key text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.food_items
  add column if not exists space_id uuid references public.spaces(id) on delete cascade,
  add column if not exists sort_order integer not null default 0,
  add column if not exists legacy_key text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.love_items
  add column if not exists space_id uuid references public.spaces(id) on delete cascade,
  add column if not exists sort_order integer not null default 0,
  add column if not exists legacy_key text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.memories
  add column if not exists space_id uuid references public.spaces(id) on delete cascade,
  add column if not exists sort_order integer not null default 0,
  add column if not exists legacy_key text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.timeline_events
  add column if not exists space_id uuid references public.spaces(id) on delete cascade,
  add column if not exists sort_order integer not null default 0,
  add column if not exists legacy_key text,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists bucket_items_space_sort_idx
  on public.bucket_items (space_id, sort_order, created_at);
create index if not exists countdown_events_space_sort_idx
  on public.countdown_events (space_id, sort_order, created_at);
create index if not exists food_items_space_sort_idx
  on public.food_items (space_id, sort_order, created_at);
create index if not exists love_items_space_sort_idx
  on public.love_items (space_id, sort_order, created_at);
create index if not exists memories_space_sort_idx
  on public.memories (space_id, sort_order, memory_id);
create index if not exists timeline_events_space_sort_idx
  on public.timeline_events (space_id, sort_order, created_at);

create unique index if not exists bucket_items_space_legacy_key_idx
  on public.bucket_items (space_id, legacy_key)
  where legacy_key is not null;
create unique index if not exists countdown_events_space_legacy_key_idx
  on public.countdown_events (space_id, legacy_key)
  where legacy_key is not null;
create unique index if not exists food_items_space_legacy_key_idx
  on public.food_items (space_id, legacy_key)
  where legacy_key is not null;
create unique index if not exists love_items_space_legacy_key_idx
  on public.love_items (space_id, legacy_key)
  where legacy_key is not null;
create unique index if not exists memories_space_legacy_key_idx
  on public.memories (space_id, legacy_key)
  where legacy_key is not null;
create unique index if not exists timeline_events_space_legacy_key_idx
  on public.timeline_events (space_id, legacy_key)
  where legacy_key is not null;

create unique index if not exists memories_space_memory_id_idx
  on public.memories (space_id, memory_id)
  where space_id is not null;

do $$
declare
  target record;
begin
  for target in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'bucket_items',
        'countdown_events',
        'food_items',
        'love_items',
        'memories',
        'timeline_events'
      )
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      target.policyname,
      target.schemaname,
      target.tablename
    );
  end loop;
end;
$$;

alter table public.bucket_items enable row level security;
alter table public.countdown_events enable row level security;
alter table public.food_items enable row level security;
alter table public.love_items enable row level security;
alter table public.memories enable row level security;
alter table public.timeline_events enable row level security;

create policy "Members can view bucket items"
on public.bucket_items
for select
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.is_space_member(space_id))
);

create policy "Editors can insert bucket items"
on public.bucket_items
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (space_id is null or public.can_edit_space(space_id))
);

create policy "Editors can update bucket items"
on public.bucket_items
for update
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
)
with check (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Editors can delete bucket items"
on public.bucket_items
for delete
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Members can view countdown events"
on public.countdown_events
for select
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.is_space_member(space_id))
);

create policy "Editors can insert countdown events"
on public.countdown_events
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (space_id is null or public.can_edit_space(space_id))
);

create policy "Editors can update countdown events"
on public.countdown_events
for update
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
)
with check (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Editors can delete countdown events"
on public.countdown_events
for delete
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Members can view food items"
on public.food_items
for select
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.is_space_member(space_id))
);

create policy "Editors can insert food items"
on public.food_items
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (space_id is null or public.can_edit_space(space_id))
);

create policy "Editors can update food items"
on public.food_items
for update
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
)
with check (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Editors can delete food items"
on public.food_items
for delete
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Members can view love items"
on public.love_items
for select
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.is_space_member(space_id))
);

create policy "Editors can insert love items"
on public.love_items
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (space_id is null or public.can_edit_space(space_id))
);

create policy "Editors can update love items"
on public.love_items
for update
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
)
with check (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Editors can delete love items"
on public.love_items
for delete
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Members can view memories"
on public.memories
for select
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.is_space_member(space_id))
);

create policy "Editors can insert memories"
on public.memories
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (space_id is null or public.can_edit_space(space_id))
);

create policy "Editors can update memories"
on public.memories
for update
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
)
with check (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Editors can delete memories"
on public.memories
for delete
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Members can view timeline events"
on public.timeline_events
for select
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.is_space_member(space_id))
);

create policy "Editors can insert timeline events"
on public.timeline_events
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (space_id is null or public.can_edit_space(space_id))
);

create policy "Editors can update timeline events"
on public.timeline_events
for update
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
)
with check (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

create policy "Editors can delete timeline events"
on public.timeline_events
for delete
to authenticated
using (
  auth.uid() = user_id
  or (space_id is not null and public.can_edit_space(space_id))
);

drop trigger if exists set_spaces_updated_at on public.spaces;
create trigger set_spaces_updated_at
before update on public.spaces
for each row
execute function public.touch_updated_at();

drop trigger if exists set_space_members_updated_at on public.space_members;
create trigger set_space_members_updated_at
before update on public.space_members
for each row
execute function public.touch_updated_at();

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before update on public.site_content
for each row
execute function public.touch_updated_at();

drop trigger if exists set_bucket_items_updated_at on public.bucket_items;
create trigger set_bucket_items_updated_at
before update on public.bucket_items
for each row
execute function public.touch_updated_at();

drop trigger if exists set_countdown_events_updated_at on public.countdown_events;
create trigger set_countdown_events_updated_at
before update on public.countdown_events
for each row
execute function public.touch_updated_at();

drop trigger if exists set_food_items_updated_at on public.food_items;
create trigger set_food_items_updated_at
before update on public.food_items
for each row
execute function public.touch_updated_at();

drop trigger if exists set_love_items_updated_at on public.love_items;
create trigger set_love_items_updated_at
before update on public.love_items
for each row
execute function public.touch_updated_at();

drop trigger if exists set_memories_updated_at on public.memories;
create trigger set_memories_updated_at
before update on public.memories
for each row
execute function public.touch_updated_at();

drop trigger if exists set_timeline_events_updated_at on public.timeline_events;
create trigger set_timeline_events_updated_at
before update on public.timeline_events
for each row
execute function public.touch_updated_at();

commit;
