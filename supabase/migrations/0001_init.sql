-- Alexey's planner — database schema (Phase 2). Run in the Supabase SQL editor of Alexey's own project.
-- Public reference data is readable by any signed-in user; personal tables are readable only by their owner.

create table if not exists courses (
  id text primary key,              -- '640:311H'
  title text not null,
  dept text not null,
  level int not null,
  credits numeric,
  prereq jsonb,                     -- rule tree, same shape as data/courses.ts
  excludes text[] default '{}',
  terms text[] default '{}',
  verified boolean default false,
  notes text,
  book text,
  updated_at timestamptz default now()
);

create table if not exists sections (
  term text not null,               -- '2027-1'
  course_id text not null references courses(id) on delete cascade,
  index_no text not null,
  section_no text,
  open boolean,
  instructors text[],
  meetings jsonb,
  notes text,
  fetched_at timestamptz default now(),
  primary key (term, index_no)
);

create table if not exists programs (id text primary key, name text, degree text, core text, fit text, source text);
create table if not exists plans (id text primary key, name text, years text, built_on text, line text, courses text[], coverage jsonb, flag text);
create table if not exists goals (id text primary key, name text, courses text[], degree text, cs text);
create table if not exists careers (id bigserial primary key, field text, role text, degree text, cs text, firms text, note text);
create table if not exists events (id text primary key, title text not null, date date not null, kind text, link text, note text, expected boolean default false);

-- Personal tables (owner only)
create table if not exists student_courses (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  course_id text not null references courses(id),
  status text not null check (status in ('taken','inprogress','planned')),
  term text,
  grade text,
  primary key (user_id, course_id)
);
create table if not exists petitions (
  id bigserial primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  course_id text, kind text, sent_on date, status text, contact text, note text
);
create table if not exists personal_events (
  id bigserial primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null, date date not null, kind text, amount numeric, note text, done boolean default false
);
-- Vault: values are encrypted in the browser (AES-GCM, key from his passphrase). The server only sees ciphertext.
create table if not exists vault (
  id bigserial primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  label text not null, ciphertext text not null, iv text not null, salt text not null, created_at timestamptz default now()
);

-- Row-level security
alter table courses enable row level security;
alter table sections enable row level security;
alter table programs enable row level security;
alter table plans enable row level security;
alter table goals enable row level security;
alter table careers enable row level security;
alter table events enable row level security;
alter table student_courses enable row level security;
alter table petitions enable row level security;
alter table personal_events enable row level security;
alter table vault enable row level security;

do $$ declare t text; begin
  foreach t in array array['courses','sections','programs','plans','goals','careers','events'] loop
    execute format('create policy "read %1$s" on %1$I for select to authenticated using (true)', t);
  end loop;
  foreach t in array array['student_courses','petitions','personal_events','vault'] loop
    execute format('create policy "own %1$s" on %1$I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;
