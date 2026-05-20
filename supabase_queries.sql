-- New table to collect 3 inputs from participants
CREATE TABLE public.participant_details (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  participant_id text NOT NULL,
  input_1 text NOT NULL,
  input_2 text NOT NULL,
  input_3 text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT participant_details_pkey PRIMARY KEY (id),
  CONSTRAINT participant_details_participant_id_key UNIQUE (participant_id),
  CONSTRAINT participant_details_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES public.participant (id) ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;

-- Add a unique constraint to attendance table to prevent race condition duplicates
ALTER TABLE public.attendance ADD CONSTRAINT attendance_student_id_event_id_key UNIQUE (student_id, event_id);

-- Turn on Realtime for the attendance table (needed for the real-time syncing)
alter publication supabase_realtime add table public.attendance;

-- Optional: some sample tables to complete the schema if events isn't there
CREATE TABLE IF NOT EXISTS public.events (
  id uuid not null default gen_random_uuid (),
  name text not null,
  start_time timestamp without time zone not null,
  end_time timestamp without time zone not null,
  img_url text null,
  metadata jsonb null,
  constraint events_pkey primary key (id)
) TABLESPACE pg_default;
