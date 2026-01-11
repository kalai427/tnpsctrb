# Vercel Deployment Troubleshooting

If your deployment on Vercel is failing, here are the most common solutions.

## 1. Check Build Logs
In your Vercel Dashboard, go to your project > Deployments > Click the failed deployment > "Building".
Look for **Red** text.

### Common Errors:

**Review your Build Settings:**
- **Framework Preset:** Next.js
- **Build Command:** `next build` (or `npm run build`)
- **Install Command:** `npm install`

**ESLint Errors (Treating Warnings as Errors)**
Vercel often fails the build if there are any linting warnings.
- **Solution:** We have fixed the linting warnings in the latest code updates. Please push the latest changes to your repository.

**TypeScript Errors**
- **Solution:** Ensure `npm run build` passes locally. We have verified the build passes locally.

## 2. Override Build Command (Emergency Fix)
If you need to force the deployment despite linting errors (not recommended but works):
1. Go to Vercel Project Settings > General.
2. Scroll to "Build & Development Settings".
3. Toggle "Override" on **Build Command**.
4. Enter: `npm run build -- --no-lint`
   *(This tells Next.js to skip linting during build)*

## 3. Node.js Version
Ensure your Vercel project is using a compatible Node.js version.
1. Settings > General > Node.js Version.
2. Set it to **20.x** or **22.x** (React 19 / Next.js 15 usually requires newer Node).

## 4. Reset Vercel Cache
Sometimes the cache gets corrupted.
1. Redeploy with "Redeploy" button and uncheck "Use Build Cache" if available, or just push a new commit (like a small whitespace change).
