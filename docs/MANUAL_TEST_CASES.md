# Manual Test Cases – Skip Hire Booking Flow

**System:** UK Skip Hire Booking (4-step flow)  
**Document version:** 1.0  
**Last updated:** Feb 2025  

---

## 1. Step 1 – Postcode & Address Selection

| ID | Test case | Type | Steps | Expected result | Priority |
|----|------------|------|--------|------------------|----------|
| TC1.1 | Valid UK postcode returns addresses | Happy path | 1. Enter "SW1A 1AA" in Postcode. 2. Click "Find address". | Address list appears (e.g. 10 Downing Street, London). No error. | P0 |
| TC1.2 | Continue disabled until address selected | Validation | 1. Enter valid postcode and run lookup. 2. Do not select an address. | "Continue" button is disabled. | P0 |
| TC1.3 | Continue enabled after selecting address | Happy path | 1. Enter valid postcode, run lookup. 2. Select one address from list. | "Continue" is enabled. Clicking it moves to Step 2. | P0 |
| TC1.4 | Invalid postcode format shows error | Negative | 1. Enter "INVALID" or "123". 2. Click "Find address". | Error message: valid UK postcode required (e.g. SW1A 1AA). No address list. | P0 |
| TC1.5 | Empty postcode shows error | Negative | 1. Leave postcode blank. 2. Click "Find address". | Error e.g. "Please enter a postcode". | P1 |
| TC1.6 | Postcode with extra spaces normalised | Edge | 1. Enter "  SW1A   1AA  ". 2. Click "Find address". | Lookup runs; addresses shown (format may be normalised). | P2 |
| TC1.7 | Lowercase postcode accepted | Edge | 1. Enter "sw1a 1aa". 2. Click "Find address". | Addresses returned (validation accepts case-insensitive). | P2 |
| TC1.8 | No results from API | Edge | 1. Use postcode that returns empty list (if supported). | Message that no addresses found; no crash. | P1 |
| TC1.9 | Step indicator shows Step 1 active | UI | 1. Open booking flow. | Step 1 is marked active; other steps pending. | P2 |

---

## 2. Step 2 – Waste Type Selection

| ID | Test case | Type | Steps | Expected result | Priority |
|----|------------|------|--------|------------------|----------|
| TC2.1 | At least one waste type required | Validation | 1. Reach Step 2. 2. Leave all checkboxes unchecked. | "Continue" disabled. | P0 |
| TC2.2 | General waste only – continue | Happy path | 1. On Step 2 check "General waste" only. 2. Click Continue. | Step 3 loads; skip options shown. | P0 |
| TC2.3 | Heavy waste selected | Happy path | 1. Check "Heavy waste" (with or without General). 2. Continue. | Step 3 loads; skips may differ (e.g. availability/pricing). | P0 |
| TC2.4 | Plasterboard selected | Happy path | 1. Check "Plasterboard". 2. Continue. | Step 3 loads. | P1 |
| TC2.5 | All three waste types selected | Edge | 1. Check General, Heavy, Plasterboard. 2. Continue. | Step 3 loads with combined selection. | P2 |
| TC2.6 | Back from Step 2 returns to Step 1 | Navigation | 1. On Step 2 click "Back". | Step 1 is shown; postcode/address preserved. | P1 |
| TC2.7 | Step indicator shows Step 2 active | UI | 1. On Step 2. | Step 2 is active; Step 1 done. | P2 |

---

## 3. Step 3 – Skip Selection

| ID | Test case | Type | Steps | Expected result | Priority |
|----|------------|------|--------|------------------|----------|
| TC3.1 | Skips loaded for postcode and waste | Happy path | 1. Complete Step 1 and 2 (e.g. SW1A 1AA, general waste). 2. Reach Step 3. | List of skips with size and price (e.g. 4yd £180). | P0 |
| TC3.2 | Disabled skip not selectable | Business rule | 1. On Step 3. 2. Find a skip marked unavailable/disabled. | Skip is visually disabled; cannot be selected; Continue stays disabled if only disabled skips. | P0 |
| TC3.3 | Selecting available skip enables Continue | Happy path | 1. On Step 3. 2. Click an available skip (e.g. 4yd). | Skip is highlighted; "Continue" enabled. | P0 |
| TC3.4 | Continue disabled until skip selected | Validation | 1. On Step 3 with at least one available skip. 2. Do not select a skip. | "Continue" disabled. | P0 |
| TC3.5 | Back from Step 3 returns to Step 2 | Navigation | 1. On Step 3 click "Back". | Step 2 shown; waste selection preserved. | P1 |
| TC3.6 | Changing waste type refetches skips | Business rule | 1. Go back to Step 2. 2. Change waste (e.g. add Heavy waste). 3. Return to Step 3. | Skip list refreshes (may show different options/prices). | P1 |
| TC3.7 | No skips available message | Edge | 1. Use combination that returns empty skips (if applicable). | Message like "No skips available"; no crash. | P1 |
| TC3.8 | Loading state shown while fetching skips | UI | 1. Complete Step 2 and land on Step 3. | Brief "Loading skips..." or similar before list appears. | P2 |

---

## 4. Step 4 – Review & Confirmation

| ID | Test case | Type | Steps | Expected result | Priority |
|----|------------|------|--------|------------------|----------|
| TC4.1 | Summary shows address, waste, skip and price | Happy path | 1. Complete Steps 1–3. 2. Reach Step 4. | Summary shows correct address, waste types, skip size and price. | P0 |
| TC4.2 | Confirm booking succeeds | Happy path | 1. On Step 4 click "Confirm booking". | Success message and booking reference (e.g. BK-100012). | P0 |
| TC4.3 | Confirm button disabled during submit | Validation | 1. On Step 4 click "Confirm booking". | Button shows "Confirming..." and is disabled until response. | P1 |
| TC4.4 | Back from Step 4 returns to Step 3 | Navigation | 1. On Step 4 click "Back". | Step 3 shown; selected skip preserved. | P1 |
| TC4.5 | API failure shows error | Negative | 1. Simulate API failure (e.g. network off). 2. Click "Confirm booking". | Error message shown; user can retry or go back. | P1 |
| TC4.6 | After success, confirm not shown again | UI | 1. Complete booking successfully. | Confirm button replaced by success message and reference. | P2 |

---

## 5. End-to-end & Cross-step

| ID | Test case | Type | Steps | Expected result | Priority |
|----|------------|------|--------|------------------|----------|
| TC5.1 | Full journey: postcode → confirm | Happy path | 1. Enter valid postcode, select address. 2. Select waste. 3. Select available skip. 4. Review and confirm. | Booking confirmed with reference. | P0 |
| TC5.2 | Step order enforced | Business rule | 1. Try to open Step 2 or 3 directly (if URL/state allows). | Either not possible or flow forces Step 1 first. | P1 |
| TC5.3 | Data consistency across steps | Data | 1. Complete full booking. 2. Check summary. | Address, waste and skip on Review match choices made. | P0 |

---

## Test environment

- **App URL:** http://localhost:5173 (or as configured)
- **Browser:** Chrome / Firefox / Safari (as per support matrix)
- **API:** Mock or stub returning spec responses (postcode lookup, skips, confirm)

## Notes

- Postcode validation follows a basic UK format (e.g. SW1A 1AA, M1 1AA).
- "Disabled" skips are determined by API (`disabled: true`); UI must prevent selection and reflect unavailability.
