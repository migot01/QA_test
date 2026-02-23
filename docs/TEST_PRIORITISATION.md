# Test Prioritisation – Skip Hire Booking Flow

## Priority definitions

| Priority | Meaning | When to run |
|----------|--------|-------------|
| **P0** | Critical – core booking path and blocking bugs | Every build; must pass before release |
| **P1** | High – important validations, errors, navigation | Every build; run after P0 |
| **P2** | Medium – edge cases, UX, minor behaviour | Pre-release / regression; can be deferred if needed |

---

## Prioritisation logic

1. **P0 – Revenue and core flow**  
   - Any test that, if failed, would prevent a customer from completing a booking or would charge them incorrectly.  
   - Examples: postcode lookup and address selection (TC1.1–1.3), waste type required (TC2.1), skip selection and disabled behaviour (TC3.1–3.4), summary correctness (TC4.1), confirm success (TC4.2), full journey (TC5.1, TC5.3).

2. **P1 – Correctness and recovery**  
   - Important validations, error handling, and navigation that affect trust or support load.  
   - Examples: invalid/empty postcode errors (TC1.5, TC1.8), back navigation (TC2.6, TC3.5, TC4.4), skip list refresh on waste change (TC3.6), no skips message (TC3.7), confirm disabled during submit (TC4.3), API failure handling (TC4.5), step order (TC5.2).

3. **P2 – Edge cases and polish**  
   - Format variations, UI states, and edge scenarios that are unlikely to block most users.  
   - Examples: postcode spacing/case (TC1.6, TC1.7), step indicator (TC1.9, TC2.7), all waste types (TC2.5), loading state (TC3.8), post-success UI (TC4.6).

---

## Summary counts

- **P0:** 14 test cases  
- **P1:** 11 test cases  
- **P2:** 6 test cases  

---

## Recommendation

- **Smoke / PR gate:** Run all P0 tests (manual or automated).  
- **Full regression:** P0 + P1 before release; add P2 when time allows or for major releases.
