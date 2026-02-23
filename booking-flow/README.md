# Skip Hire Booking Flow

React + Vite app implementing the 4-step booking flow. Uses an in-app mock API (see `src/api.js`) so it runs without a backend.

## Scripts

- `npm run dev` – start dev server (http://localhost:5173)
- `npm run build` – production build
- `npm run test:e2e` – run Playwright E2E tests (starts dev server automatically)
- `npm run test:e2e:ui` – run tests in Playwright UI

## E2E

Playwright is configured in `playwright.config.js`. The critical journey test is in `e2e/booking-flow.spec.js`.

**First-time setup:** install browsers (required once per machine):

```bash
npx playwright install
# or just Chromium:
npx playwright install chromium
```

**Run tests:** the config starts the app on port **5175** (so it doesn’t conflict with `npm run dev` on 5173) and waits up to 2 minutes for it to be ready.

```bash
npm run test:e2e
```

If you still see a webServer timeout, start the app yourself and run tests in another terminal:

```bash
# Terminal 1
npx vite --port 5175

# Terminal 2
npm run test:e2e
```
