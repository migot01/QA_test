# Skip Hire Booking – QA Assessment

This repo contains the **booking flow implementation** and all **QA deliverables** for the fictional UK skip hire booking system.

---

## Contents

| Item | Location |
|------|----------|
| **Booking flow (source & demo)** | `booking-flow/` – React + Vite app with 4-step flow and mock API |
| **Manual test cases** | `docs/MANUAL_TEST_CASES.md` |
| **Test prioritisation (P0/P1/P2)** | `docs/TEST_PRIORITISATION.md` |
| **Bug reports** | `docs/BUG_REPORTS.md` |
| **Automation tests** | `booking-flow/e2e/` – Playwright E2E |
| **QA strategy** | `docs/QA_STRATEGY.md` |

---

## Quick start

```bash
cd booking-flow
npm install
npm run dev          # App at http://localhost:5173
npm run test:e2e     # Playwright E2E (starts dev server if needed)
```

---

## Deploy to Netlify

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In [Netlify](https://app.netlify.com): **Add new site** → **Import an existing project** → choose your Git provider and repo.
3. Netlify will use the repo’s `netlify.toml`: it builds from the `booking-flow/` directory and publishes the `dist` folder. No need to change build settings.
4. Click **Deploy**. Your site will be available at `https://<random>.netlify.app` (you can set a custom domain later).

---

## API

The app uses a **mock API** in the frontend (see `booking-flow/src/api.js`) that matches the assessment dummy API spec. No backend server is required. Set `USE_MOCK = false` in `api.js` and point to a real API when available.
