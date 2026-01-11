# Backend Integration Plan

## Status Overview
- **Admin Panel**: ✅ Ready (`app/admin/page.tsx` handles uploads to Supabase).
- **Supabase Client**: ✅ Configured (`lib/supabase.ts`).
- **Public Display**: ✅ Connected (Using live data from Supabase).

## Step-by-Step Integration Plan

### Phase 1: Verification (User Action Required)
Before we change the code, we need to ensure the backend is live.
1.  **Supabase Project**: Ensure you have created the project at [supabase.com](https://supabase.com).
2.  **Environment Variables**:
    - Create a `.env.local` file in the root of your project.
    - Add your keys:
      ```env
      NEXT_PUBLIC_SUPABASE_URL=your_project_url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
      ```
3.  **Database & Storage**:
    - Create the `study_materials` table (columns: title, standard, subject, author, type, link).
    - Create the `materials` storage bucket (Public Access enabled).

### Phase 2: Code Migration (Done)
We have switched the data source from the static file to the live database.

1.  **Update `lib/study-materials.ts`**: ✅ Done
    -   Rewritten `getMaterialsForStandard` to be asynchronous.
    -   It queries the `study_materials` table filtering by the `standard` column.
    -   It groups the results by `subject`.

2.  **Update `app/[standard]/page.tsx`**: ✅ Done
    -   Now awaits `getMaterialsForStandard`.

3.  **Type Safety Updates**: ✅ Done
    -   Ensured the `Material` interface matches the Supabase response.

### Phase 3: Testing & Deployment (Next Steps)
1.  **Local Testing**: Run `npm run dev` and upload a test file via `/admin`.
2.  **Verification**: Go to the standard page (e.g., `/std-10`) and verify the new file appears.
3.  **Deploy**: Push changes to GitHub/Vercel.

## Next Step
**Shall I proceed with Phase 2 (updating the code to fetch from Supabase)?**
