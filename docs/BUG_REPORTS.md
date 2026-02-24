# Bug Reports – Skip Hire Booking Flow

**Product:** UK Skip Hire Booking (4-step flow)  
**Environment:** Local / mock API  
**Report date:** Feb 2025  



## BUG-001: No explicit validation that the selected address belongs to the entered postcode

**Severity:** Medium  
**Priority:** P2  

**Summary**  
The UI does not re-validate that the currently selected address is still in the list returned for the last postcode lookup. If the API or client state were to get out of sync (e.g. stale address after a new lookup), the user could theoretically submit an address that does not match the postcode shown.

**Steps to reproduce**  
1. Enter postcode "SW1A 1AA" and click Find address.  
2. Select "10 Downing Street".  
3. Change the postcode field to "M1 1AA" but do not click Find address.  
4. Click Continue.

**Expected result**  
- Either the address selection is cleared when the postcode field is edited after a lookup, or Continue is disabled until a new lookup is performed for the new postcode, or the summary clearly shows the postcode used for the lookup that produced the selected address.

**Actual result**  
- User can change the postcode text without re-running lookup; the previously selected address remains selected.  
- Flow allows proceeding to Step 2 with a mismatch between displayed postcode and address (address came from previous postcode).  
- Review step shows the address line but may not show the postcode used for lookup, making it harder to spot the inconsistency.

**Evidence**  
- In `Step1Postcode.jsx`, `address` is only cleared when a new lookup is performed (`setAddress(null)` in `handleLookup`). Editing the postcode without clicking “Find address” does not clear `address`.

**Suggested fix**  
- On postcode change (e.g. in `onChange`), clear the selected address: `setAddress(null)` and optionally clear addresses list, so the user must run lookup again for the new postcode.  
- And/or: show the postcode used for the current address list (or the postcode at time of selection) on Review so that any mismatch is visible.

**Affected components**  
- `Step1Postcode.jsx`, optionally `Step4Review.jsx` (display postcode in summary).

---

## Optional note

These were identified from code and flow review. Reproduction should be confirmed in a real environment with the actual API behaviour (e.g. when skips actually change with waste type, or when postcode is editable after selection).
