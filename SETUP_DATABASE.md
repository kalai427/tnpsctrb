# Setting up the Database and Storage (Supabase)

To make the Upload feature work, you need to connect your project to Supabase (a free backend provider).

## Step 1: Create Supabase Project
1.  Go to [supabase.com](https://supabase.com) and Sign Up / Login.
2.  Click **"New Project"**.
3.  Name it `tnpsctrb`, give it a password, and click **Create**.
4.  Wait 1-2 minutes for it to set up.

## Step 2: Create a Table (Database)
1.  Go to the **Table Editor** (icon looks like a table/spreadsheet on the left).
2.  Click **"New Table"**.
3.  Name: `study_materials`
4.  Uncheck "Enable Row Level Security (RLS)" (for simplicity now, or create policies later).
5.  Add Columns:
    -   `title` (text)
    -   `standard` (text)
    -   `subject` (text)
    -   `author` (text)
    -   `type` (text)
    -   `link` (text)
6.  Click **Save**.

## Step 3: Create Storage Bucket
1.  Go to **Storage** (folder icon on left).
2.  Click **"New Bucket"**.
3.  Name: `materials`
4.  Toggle **"Public Bucket"** to ON.
5.  Click **Save**.

## Step 4: Get API Keys
1.  Go to **Project Settings** (gear icon) -> **API**.
2.  Copy the `Project URL`.
3.  Copy the `anon public` Key.

## Step 5: Connect to Vercel
1.  Go to your Vercel Dashboard -> Settings -> Environment Variables.
2.  Add:
    -   `NEXT_PUBLIC_SUPABASE_URL`: (Paste your URL)
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Paste your Key)
3.  **Redeploy** your project for changes to take effect (or just push any small change to git).

## Step 6: Access Admin Panel
Go to: `https://your-site.vercel.app/admin`
Password: `admin123` (Change this in code if you want).
