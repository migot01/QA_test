# QA Strategy – Skip Hire Booking Flow

## 1. What to automate first

**First wave (high value, stable flows)**  
- **Full happy-path booking (E2E):** Postcode → Address → Waste → Skip → Review → Confirm.  
  - Already automated in Playwright (`e2e/booking-flow.spec.js`).  
  - Run on every PR and main branch to catch regressions in the critical path.  
- **Postcode validation (unit or component):** Invalid/empty postcode shows error; valid format allows lookup.  
- **Step 3 skip rules (unit/component or API tests):** Given API response with `disabled: true`, that skip is not selectable and does not enable Continue.

**Second wave**  
- **Navigation:** Back from Step 2 → Step 1, Step 3 → Step 2, Step 4 → Step 3, with state preserved.  
- **Waste type validation:** Continue on Step 2 disabled when no waste type selected.  
- **Review summary:** Correct address, waste, skip and price shown (can be part of E2E or a component test with mocked state).

**Third wave**  
- **Error paths:** Postcode lookup failure, skips load failure, confirm booking failure – assert error message and retry/back behaviour.  
- **Edge cases:** Empty address list, empty skips list, spacing/case in postcode (if not covered by unit tests).

**Tool choice**  
- **E2E:** Playwright (already in place) – fast, stable, good for CI.  
- **API:** Same Playwright project or a separate suite (e.g. Jest + fetch) to hit real or stubbed endpoints for GET/POST contract and error responses.  
- **Unit/component:** React Testing Library + Jest (or Vitest) for validations and conditional UI (e.g. disabled skip, error messages).

---

## 2. What should remain manual

- **Visual and UX checks:** Layout, alignment, focus order, screen reader behaviour, mobile layout.  
- **Exploratory testing:** Unusual sequences (e.g. rapid back/next, multiple tabs), business rules that are still changing.  
- **Real API and data:** Behaviour with live postcode/skips/booking APIs, real postcodes and edge cases (e.g. no results, slow response).  
- **Accessibility audit:** Full WCAG check with axe or similar, plus manual keyboard/screen reader pass.  
- **One-off or low-frequency checks:** New copy, legal text, or config-driven content until it stabilises.

---

## 3. Preventing regressions

- **CI pipeline**  
  - On every PR: run P0 automated tests (E2E happy path + any critical unit/API tests).  
  - Block merge if P0 fails.  
  - Nightly or pre-release: run full suite (P0 + P1 + P2 automations).

- **Test data and environment**  
  - Use stable mock data (or dedicated test postcodes) so E2E does not depend on production data.  
  - Pin or version mock API responses so changes are intentional and traceable.

- **Guards in code**  
  - Clear skip selection when skips list is refetched and selected skip is no longer available or is disabled (see BUG-001).  
  - Clear address selection when postcode is changed before a new lookup (see BUG-002).  
  - These reduce invalid states that could slip past tests.

- **Release checklist**  
  - P0 manual tests (or automated) passed.  
  - P1 regression run completed.  
  - Known high-severity bugs fixed or accepted with tickets.  
  - Smoke test on staging with real (or staging) API.

- **Monitoring**  
  - In production: monitor booking completion rate and error rates on confirm; alert on spikes.  
  - Use errors to add new automated tests for the failing scenarios.

This keeps the most important path automated and stable while leaving nuanced and visual checks to manual testing and preventing regressions through CI, code guards, and release checks.
