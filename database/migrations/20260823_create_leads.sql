CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text NOT NULL,
  service text NOT NULL,
  budget text,
  project_name text,
  existing_website text,
  project_description text NOT NULL,
  preferred_timeline text,
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT leads_full_name_not_blank CHECK (length(trim(full_name)) >= 2),
  CONSTRAINT leads_email_not_blank CHECK (length(trim(email)) > 3),
  CONSTRAINT leads_description_not_blank CHECK (length(trim(project_description)) >= 20)
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
