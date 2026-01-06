Render deployment guide for Tamanna
=================================

This project contains three deployable parts:

- backend/  — Node/Express API
- frontend/ — Vite React static site (public-facing)
- admin/    — Vite React admin panel (static site)

This document outlines a recommended Render configuration and the environment
variables you'll need to set in the Render dashboard.

1) Add the repository to Render
-------------------------------

1. Go to https://dashboard.render.com and connect your Git provider (GitHub/GitLab).
2. Create three services:
   - Web Service for the backend (Node)
   - Static Site for the frontend
   - Static Site for the admin

2) Quick service settings (recommended)
--------------------------------------

- Backend (Web Service)
  - Name: `tamanna-backend`
  - Branch: `main` (or your desired branch)
  - Build Command: `cd backend && npm install`
  - Start Command: `cd backend && npm start`
  - Instance Type / Plan: choose as needed

- Frontend (Static Site)
  - Name: `tamanna-frontend`
  - Branch: `main`
  - Build Command: `cd frontend && npm install && npm run build`
  - Publish Directory: `frontend/dist`

- Admin (Static Site)
  - Name: `tamanna-admin`
  - Branch: `main`
  - Build Command: `cd admin && npm install && npm run build`
  - Publish Directory: `admin/dist`

3) Environment variables (set these in Render dashboard for the backend service)
-------------------------------------------------------------------------------

Set the following env vars in Render's dashboard (Backend service -> Environment)
— do NOT commit them to Git.

- MONGODB_URI  (your connection string)
- JWT_SECRET
- CLOUDINARY_API_KEY
- CLOUDINARY_SECRET_KEY
- CLOUDINARY_NAME
- STRIPE_SECRET_KEY
- RAZORPAY_KEY_SECRET
- RAZORPAY_KEY_ID
- ADMIN_EMAIL
- ADMIN_PASSWORD
- FRONTEND_URL  (set to the URL Render gives for `tamanna-frontend`, e.g. https://tamanna-frontend.onrender.com)
- ADMIN_URL     (set to the admin static site URL)

Notes:
- The repo contains a `render.yaml` template to create the three services automatically
  when you connect the repository to Render and enable the spec. Adjust names/branches
  as required.
- The backend reads `process.env.PORT` (Render sets this automatically). No code
  changes required for binding to the Render-assigned port.
- The backend currently uses plaintext `ADMIN_PASSWORD` from env for admin login checks.
  For production, consider hashing or replacing this flow with a proper admin user model.

4) After deployment
-------------------

- After the frontend/admin static site deploys, copy their public URLs into backend
  env vars `FRONTEND_URL` and `ADMIN_URL` so any code relying on them (redirects/CORS)
  can work correctly.
- Restart the backend service after setting env vars.

5) Optional improvements
------------------------

- Move admin auth from environment-constant check to a hashed admin user in the DB.
- Add health-check endpoints and monitoring on Render.

If you'd like, I can:
- Create a `render.yaml` variant that includes placeholders for environment variable keys,
  or attempt to wire Render's secrets via the CLI (requires an API key you provide).
- Replace plaintext admin password checks with a hashed-admin-in-DB implementation and a
  migration script.
