# How to Add Real Study Materials to TNPSCTRB

You can add study materials (PDFs, images) to your website in two ways: uploading files directly to your project or linking to external sites (like Google Drive).

## Method 1: Uploading Files Directly (Recommended for small files)

1.  **Prepare your file**: Rename your PDF to something simple (e.g., `10th_tamil_guide.pdf`).
2.  **Upload**: Place the file in the `public/uploads` folder of your project.
    -   Example location: `C:\Users\kalai\.gemini\antigravity\scratch\padasalai-clone\public\uploads\10th_tamil_guide.pdf`

3.  **Update the Data**:
    -   Open `lib/study-materials.ts`.
    -   Find the standard (`std-10`) and subject (`Tamil`).
    -   Add a new entry to the `materials` array:
        ```typescript
        {
          id: 4, // unique number
          title: "10th Tamil Guide 2026",
          author: "Victory",
          type: "Guide",
          link: "/uploads/10th_tamil_guide.pdf" // Note the leading slash
        }
        ```
    -   **Commit and Push**: Once you push these changes to GitHub, Vercel will deploy the new file.

## Method 2: External Links (Recommended for large files)

If you have large files, it's better to host them on Google Drive to save bandwidth.

1.  **Upload to Drive**: Upload your file to Google Drive.
2.  **Get Link**: Right-click > Share > "Anyone with the link".
3.  **Update the Data**:
    -   Open `lib/study-materials.ts`.
    -   Add the entry with the full URL:
        ```typescript
        {
          id: 5,
          title: "10th Maths Full Guide",
          author: "Ravi Maths",
          type: "Full Guide",
          link: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
        }
        ```

## Managing Subjects

To add a new subject to a standard:

1.  Open `lib/study-materials.ts`.
2.  Inside the standard array (e.g., `std-10`), add a new subject block:
    ```typescript
    {
      subject: "Science",
      materials: []
    }
    ```
