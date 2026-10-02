ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'other';