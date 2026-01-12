# Supabase Database Schema for TNPSCTRB Academy

This document contains the SQL schema for all tables needed for the Professor's Desk CMS.

## 1. Study Materials Table

```sql
-- Main table for all study materials (PDFs, Notes, MCQs, Exam Papers)
CREATE TABLE study_materials (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  standard TEXT NOT NULL, -- 'std-10', 'std-11', 'std-12', 'tnpsc', 'tet', 'trb'
  subject TEXT NOT NULL, -- 'Tamil', 'English', 'Maths', etc.
  author TEXT DEFAULT 'TNPSCTRB Academy',
  type TEXT NOT NULL, -- 'PDF', 'Notes', 'MCQ', 'Exam'
  link TEXT NOT NULL, -- URL to the material (Supabase Storage or external)
  category TEXT, -- Optional: 'Textbook', 'Guide', 'Question Paper', etc.
  sub_category TEXT, -- Optional: 'Unit 1', 'Chapter 5', etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_study_materials_standard ON study_materials(standard);
CREATE INDEX idx_study_materials_subject ON study_materials(subject);
CREATE INDEX idx_study_materials_type ON study_materials(type);
CREATE INDEX idx_study_materials_created_at ON study_materials(created_at DESC);
```

## 2. Exam News Table

```sql
-- Table for exam announcements and updates
CREATE TABLE exam_news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL, -- 'TNPSC', 'TET', 'TRB', 'General'
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_exam_news_category ON exam_news(category);
CREATE INDEX idx_exam_news_published_at ON exam_news(published_at DESC);
```

## 3. Exam Statistics Table (Optional - for dynamic counts)

```sql
-- Table to store aggregated statistics for competitive exams
CREATE TABLE exam_stats (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL, -- 'TNPSC', 'TET', 'TRB'
  name TEXT NOT NULL, -- 'TNPSC Group 1', 'TET Paper 1', etc.
  mcq_count TEXT DEFAULT '0', -- Display string like '2,500+'
  notes_count TEXT DEFAULT '0', -- Display string like '150+'
  icon TEXT DEFAULT '🎓',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique constraint to prevent duplicates
CREATE UNIQUE INDEX idx_exam_stats_unique ON exam_stats(category, name);
```

## 4. Storage Bucket Setup

```sql
-- Create a storage bucket for materials (PDFs, images, etc.)
-- This is done via Supabase Dashboard > Storage > Create Bucket
-- Bucket name: 'materials'
-- Public: true (so materials can be downloaded without auth)
```

### Storage Policies (RLS)

```sql
-- Allow public read access to materials bucket
CREATE POLICY "Public Access to Materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'materials');

-- Allow authenticated uploads (admin only in production)
CREATE POLICY "Admin Upload to Materials"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'materials');
```

## 5. Row Level Security (RLS) Policies

### Study Materials

```sql
-- Enable RLS
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access"
ON study_materials FOR SELECT
USING (true);

-- Allow insert/update/delete for authenticated users (admin)
CREATE POLICY "Admin Full Access"
ON study_materials FOR ALL
USING (auth.role() = 'authenticated');
```

### Exam News

```sql
-- Enable RLS
ALTER TABLE exam_news ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access"
ON exam_news FOR SELECT
USING (true);

-- Allow insert/update/delete for authenticated users (admin)
CREATE POLICY "Admin Full Access"
ON exam_news FOR ALL
USING (auth.role() = 'authenticated');
```

### Exam Stats

```sql
-- Enable RLS
ALTER TABLE exam_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access"
ON exam_stats FOR SELECT
USING (true);

-- Allow insert/update/delete for authenticated users (admin)
CREATE POLICY "Admin Full Access"
ON exam_stats FOR ALL
USING (auth.role() = 'authenticated');
```

## 6. Sample Data (Optional - for testing)

```sql
-- Insert sample study materials
INSERT INTO study_materials (title, standard, subject, type, link) VALUES
('10th Tamil Textbook - Term 1', 'std-10', 'Tamil', 'PDF', 'https://example.com/10th-tamil.pdf'),
('12th Physics Notes - Unit 1', 'std-12', 'Physics', 'Notes', 'https://example.com/12th-physics-notes.pdf'),
('TNPSC Group 4 General Tamil MCQ Set 1', 'tnpsc', 'General Knowledge', 'MCQ', 'https://example.com/tnpsc-mcq.pdf');

-- Insert sample exam news
INSERT INTO exam_news (title, content, category) VALUES
('TNPSC Group 4 Exam Date Announced', 'The Tamil Nadu Public Service Commission has announced the exam date for Group 4 examination...', 'TNPSC'),
('TET 2026 Application Process Started', 'Teachers Eligibility Test application process has started. Last date: March 15, 2026', 'TET');

-- Insert sample exam stats
INSERT INTO exam_stats (category, name, mcq_count, notes_count, icon) VALUES
('TNPSC', 'TNPSC Group 1', '2,500+', '150+', '🏛️'),
('TNPSC', 'TNPSC Group 2', '3,200+', '200+', '🏛️'),
('TET', 'TET Paper 1', '2,100+', '180+', '📝'),
('TRB', 'TRB Secondary Teacher', '1,500+', '100+', '👨‍🏫');
```

## Setup Instructions

1. **Go to Supabase Dashboard** → Your Project → SQL Editor
2. **Copy and paste** each table creation SQL above
3. **Run** the queries one by one
4. **Create Storage Bucket**:
   - Go to Storage → Create Bucket
   - Name: `materials`
   - Public: ✅ Yes
5. **Apply Storage Policies** using the SQL above
6. **Test** by inserting sample data

## Environment Variables

Add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_admin_password
```

## Notes

- The admin panel uses a simple password authentication (stored in env var)
- For production, consider implementing proper Supabase Auth
- All tables have RLS enabled for security
- Storage bucket is public for easy material downloads
- Indexes are created for optimal query performance
