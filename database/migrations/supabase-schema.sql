-- Employer Job Submissions Table
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS employer_job_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  region TEXT DEFAULT 'Maastricht' NOT NULL,
  
  -- Company & Contact Info
  company TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Job Details
  job_title TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT DEFAULT 'Rotterdam' NOT NULL,
  area TEXT,
  
  -- Compensation
  base_salary_min DECIMAL(10, 2),
  base_salary_max DECIMAL(10, 2),
  
  -- Job Content
  description TEXT NOT NULL,
  english_friendly BOOLEAN DEFAULT false,
  
  -- URLs
  external_url TEXT,
  logo_url TEXT,
  logo_alt TEXT,
  
  -- Pricing Plan
  plan TEXT DEFAULT 'basic' NOT NULL,
  plan_price_eur TEXT,
  
  -- Metadata
  status TEXT DEFAULT 'pending' NOT NULL,
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  notes TEXT
);

-- Add indexes for common queries
-- CREATE INDEX IF NOT EXISTS idx_employer_submissions_created_at ON employer_job_submissions(created_at DESC);
-- CREATE INDEX IF NOT EXISTS idx_employer_submissions_status ON employer_job_submissions(status);
-- CREATE INDEX IF NOT EXISTS idx_employer_submissions_category ON employer_job_submissions(category);

-- Add RLS (Row Level Security) policies
ALTER TABLE employer_job_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for public form submissions)
CREATE POLICY "Allow public inserts" ON employer_job_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Only authenticated users can read/update (for admin panel)
CREATE POLICY "Allow authenticated reads" ON employer_job_submissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated updates" ON employer_job_submissions
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a view for approved jobs (optional, for future use)
CREATE OR REPLACE VIEW approved_jobs AS
SELECT 
  id,
  created_at,
  region,
  company,
  job_title,
  employment_type,
  category,
  city,
  area,
  base_salary_min,
  base_salary_max,
  description,
  english_friendly,
  external_url,
  logo_url,
  logo_alt,
  plan,
  plan_price_eur
FROM employer_job_submissions
WHERE status = 'approved'
ORDER BY created_at DESC;

