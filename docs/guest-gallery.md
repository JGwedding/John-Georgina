# Automatic guest gallery setup

Status: code prepared; requires Dropbox authorization and GitHub Pages setup before it works.

The upload button continues to use the Dropbox file request. A GitHub Action reads ONLY the configured wedding folder and its subfolders, creates public shared links for supported photos/videos, and deploys a JSON gallery alongside the website. Media stays in Dropbox. No Dropbox credentials or original filenames are included in the manifest. Existing wedding photos remain in the board.

## One-time setup

1. At https://www.dropbox.com/developers/apps create a Scoped access app. Choose Full Dropbox because the existing request destination is outside an app folder. The script restricts reads to the wedding folder configured below.
2. On Permissions enable `files.metadata.read`, `sharing.read`, and `sharing.write`, then submit changes.
For guided setup after step 2, run `python3 tools/connect-dropbox-gallery.py` in your local repository. It performs steps 3–6 interactively, validates the folder, and saves credentials directly to GitHub Actions secrets without printing them. Then continue with step 7.

3. On Settings copy the App key and App secret. Do not put secrets in source files or chat.
4. Authorize the app with this URL, replacing APP_KEY:
   `https://www.dropbox.com/oauth2/authorize?client_id=APP_KEY&response_type=code&token_access_type=offline`
5. Exchange the returned authorization code at `https://api.dropboxapi.com/oauth2/token` using form fields `grant_type=authorization_code`, `code`, `client_id` (App key), and `client_secret`. Save the returned `refresh_token` securely. A generated short-lived access token will not work for unattended syncing.
6. Add repository Actions secrets at https://github.com/JGwedding/John-Georgina/settings/secrets/actions:
   - `DROPBOX_APP_KEY`
   - `DROPBOX_APP_SECRET`
   - `DROPBOX_REFRESH_TOKEN`
   - `DROPBOX_FOLDER_PATH`: exact destination shown in the Dropbox file request settings, beginning with `/`. Do not use a shared URL or the account root.
7. Push these changes. In repository Settings → Pages change Source to **GitHub Actions**. In Actions run **Publish site and guest gallery** manually.
8. Upload a test JPEG and MP4 through the request; run the workflow and confirm both appear and open on the live site. Delete the test files and run again to verify removal.

## Behavior and limits

- Scheduled every 15 minutes; GitHub can delay or drop scheduled runs. The open page checks the published manifest every minute, pausing while hidden or while the full-screen viewer is open. This is periodic automatic syncing, not instant live streaming.
- Every supported file in the configured folder is published without moderation. Add this information to the Dropbox request description too, so guests following its link directly can see it.
- JPEG/JFIF, PNG, GIF, WebP, AVIF, MP4, WebM and MOV are included. HEIC and other unsupported extensions are skipped and logged. MOV and video codec playback depend on the visitor's browser; MP4 with H.264 is the most compatible choice. No transcoding is implemented.
- Dropbox storage and shared-link bandwidth limits still apply. This is suitable for a small wedding gallery, not unlimited media hosting.
- Removing a file from the folder removes it from the board on the next successful sync. Moving a file does not revoke a previously created public Dropbox link; revoke it in Dropbox if needed.
- Sync failure prevents deployment, preserving the last successful live gallery. GitHub Actions logs show the failure.
- GitHub can disable scheduled workflows after 60 days of inactivity in a public repository. Check the workflow before the wedding and re-enable it if needed.

References: https://docs.dropboxapi.com/dropbox-api/docs/oauth and https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
