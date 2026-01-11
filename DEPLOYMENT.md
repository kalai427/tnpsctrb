# Deployment Guide for TNPSCTRB

This Next.js application can be deployed to various compatible hosting platforms. The recommended platform to deploy Next.js is [Vercel](https://vercel.com), the creators of Next.js.

## Option 1: Vercel (Recommended)

1.  **Push your code to Git**:
    -   Initialize a git repository if you haven't already:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        ```
    -   Push to GitHub, GitLab, or Bitbucket.

2.  **Import to Vercel**:
    -   Go to [Vercel.com](https://vercel.com) and sign up/login.
    -   Click "Add New..." > "Project".
    -   Import the repository you just pushed.
    -   Vercel will automatically detect that it's a Next.js project.

3.  **Deploy**:
    -   Click "Deploy".
    -   Vercel will build your project and give you a live URL (e.g., `tnpsctrb.vercel.app`).
    -   Future pushes to the main branch will automatically trigger a new deployment.

## Option 2: Netlify

1.  **Push to Git**: Same as above.
2.  **Import to Netlify**:
    -   Go to [Netlify.com](https://www.netlify.com/).
    -   Click "Add new site" > "Import an existing project".
    -   Connect your Git provider.
3.  **Configure Build Settings**:
    -   **Build Command**: `npm run build`
    -   **Publish Directory**: `.next`
    -   **Netlify Plugin**: You might need to install the `@netlify/plugin-nextjs` if it's not automatically detected, but usually it works out of the box with modern Next.js.

## Option 3: Docker / Self-Hosting (VPS)

If you want to host it on a VPS (like DigitalOcean, AWS EC2, or a private server):

1.  **Build the project**:
    ```bash
    npm run build
    ```

2.  **Start the server**:
    ```bash
    npm start
    ```
    This runs the server on port 3000 by default. You can use a process manager like `pm2` to keep it running.

    ```bash
    npm install -g pm2
    pm2 start npm --name "tnpsctrb" -- start
    ```

3.  **Reverse Proxy**:
    -   Set up Nginx or Apache to reverse proxy traffic from port 80/443 to `localhost:3000`.

## Option 4: Static Export (If dynamic features are not needed)

 *Note: This project uses dynamic routing (`[standard]`), so a pure static export might need configuration changes to generate all possible paths or fallback behavior.*

1.  Update `next.config.ts` to include `output: 'export'`.
2.  Run `npm run build`.
3.  The `out` folder will contain static HTML/CSS/JS files that can be hosted on any static host (GitHub Pages, S3, etc.).
