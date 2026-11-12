-- The schema as one baseline: every table and index the site uses. Later changes are new numbered files after this
-- one, applied by the deploy before the code (AGENTS.md, "Migrations").

CREATE TABLE talk_days (
  day TEXT PRIMARY KEY,
  salt BLOB NOT NULL
);
CREATE TABLE talk_senders (
  day TEXT NOT NULL,
  sender TEXT NOT NULL,
  sends INTEGER NOT NULL,
  PRIMARY KEY (day, sender)
);
CREATE TABLE threads (
  id TEXT PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  source TEXT NOT NULL,
  space TEXT,
  title TEXT,
  body TEXT NOT NULL,
  summary TEXT,
  status TEXT NOT NULL,
  kind TEXT,
  sender_name TEXT,
  sender_email TEXT,
  drop_reason TEXT,
  reply_opened_at TEXT,
  origin_ref TEXT,
  filed_link TEXT,
  moved_at TEXT
, activity_at TEXT, main TEXT NOT NULL DEFAULT 'text', link_url TEXT, link_title TEXT, public_at TEXT, person_id TEXT REFERENCES people (id), meeting_when TEXT, meeting_minutes INTEGER, meeting_where TEXT, ask_slug TEXT, ask_state TEXT, ask_thread_id TEXT REFERENCES threads (id), feed_at TEXT);
CREATE UNIQUE INDEX threads_origin_ref ON threads (origin_ref) WHERE origin_ref IS NOT NULL;
CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL REFERENCES threads (id),
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
, audience TEXT NOT NULL DEFAULT 'thread', person_id TEXT REFERENCES people (id), state TEXT NOT NULL DEFAULT 'shown', sender_name TEXT, sender_email TEXT, parent_id TEXT REFERENCES comments (id), question TEXT, quote TEXT, quote_prefix TEXT, quote_suffix TEXT, page_version INTEGER, visitor_key TEXT);
CREATE INDEX comments_thread ON comments (thread_id, created_at);
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  thread_id TEXT NOT NULL REFERENCES threads (id),
  at TEXT NOT NULL,
  actor TEXT NOT NULL,
  type TEXT NOT NULL,
  data TEXT NOT NULL
);
CREATE INDEX events_thread ON events (thread_id, id);
CREATE TABLE pages (
  thread_id TEXT NOT NULL REFERENCES threads (id),
  version INTEGER NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  actor TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  source_url TEXT,
  PRIMARY KEY (thread_id, version)
);
CREATE TABLE members (
  thread_id TEXT NOT NULL REFERENCES threads (id),
  person_id TEXT NOT NULL REFERENCES people (id),
  added_at TEXT NOT NULL,
  removed_at TEXT,
  PRIMARY KEY (thread_id, person_id)
);
CREATE INDEX members_person_standing ON members (person_id) WHERE removed_at IS NULL;
CREATE TABLE people (
  id TEXT PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  email TEXT UNIQUE,
  name TEXT,
  note TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX threads_person ON threads (person_id);
CREATE INDEX comments_person ON comments (person_id);
CREATE INDEX comments_parent ON comments (parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX threads_meeting ON threads (meeting_when) WHERE meeting_when IS NOT NULL;
CREATE TABLE attendees (
  thread_id TEXT NOT NULL REFERENCES threads (id),
  person_id TEXT NOT NULL REFERENCES people (id),
  added_at TEXT NOT NULL,
  PRIMARY KEY (thread_id, person_id)
);
CREATE INDEX attendees_person ON attendees (person_id);
CREATE INDEX comments_visitor ON comments (thread_id, question, visitor_key) WHERE visitor_key IS NOT NULL;
CREATE TABLE answer_senders (
  day TEXT NOT NULL,
  sender TEXT NOT NULL,
  sends INTEGER NOT NULL,
  PRIMARY KEY (day, sender)
);
CREATE UNIQUE INDEX threads_ask_slug ON threads (ask_slug) WHERE ask_slug IS NOT NULL;
CREATE INDEX threads_ask_thread ON threads (ask_thread_id) WHERE ask_thread_id IS NOT NULL;
CREATE TABLE ask_thread_senders (
  day TEXT NOT NULL,
  sender TEXT NOT NULL,
  sends INTEGER NOT NULL,
  PRIMARY KEY (day, sender)
);
CREATE TABLE ask_answer_senders (
  day TEXT NOT NULL,
  sender TEXT NOT NULL,
  sends INTEGER NOT NULL,
  PRIMARY KEY (day, sender)
);
CREATE TABLE journal_versions (
  key TEXT NOT NULL,
  version INTEGER NOT NULL,
  save_id TEXT NOT NULL UNIQUE,
  text TEXT NOT NULL,
  saved_at TEXT NOT NULL,
  actor TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  PRIMARY KEY (key, version)
);
CREATE TABLE journal_entries (
  key TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  version INTEGER NOT NULL,
  saved_at TEXT NOT NULL,
  title TEXT NOT NULL,
  one_line TEXT,
  stories INTEGER NOT NULL,
  photos INTEGER NOT NULL,
  question TEXT
);
CREATE TABLE journal_storylines (
  key TEXT NOT NULL REFERENCES journal_entries (key),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  mark TEXT,
  PRIMARY KEY (key, name)
);
CREATE INDEX journal_storylines_name ON journal_storylines (name);
CREATE TABLE journal_photos (
  id TEXT PRIMARY KEY,
  object_key TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE journal_answers (
  id INTEGER PRIMARY KEY,
  key TEXT NOT NULL REFERENCES journal_entries (key),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX journal_answers_key ON journal_answers (key, id);
CREATE INDEX threads_feed ON threads (feed_at) WHERE feed_at IS NOT NULL;
CREATE TABLE now_lines (
  id INTEGER PRIMARY KEY,
  text TEXT NOT NULL,
  set_at TEXT NOT NULL
);
CREATE TABLE outside_items (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('video', 'release')),
  source TEXT NOT NULL,
  ref TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  published_at TEXT NOT NULL,
  updated_at TEXT,
  thumb INTEGER NOT NULL DEFAULT 0 CHECK (thumb IN (0, 1))
);
CREATE INDEX outside_items_published ON outside_items (published_at);
