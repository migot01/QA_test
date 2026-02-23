# Bug Reports – Skip Hire Booking Flow

**Product:** UK Skip Hire Booking (4-step flow)  
**Environment:** Local / mock API  
**Report date:** Feb 2025  

---

## BUG-001: Disabled skip can be included in booking if selected before it becomes disabled

**Severity:** High  
**Priority:** P1  

**Summary**  
If the user selects an available skip and then the list is refetched (e.g. after going back to change waste type), a previously selected skip might now be disabled. The UI can still show that skip as selected and allow the user to proceed to Review and attempt confirmation.

**Steps to reproduce**  
1. Complete Step 1 (postcode + address) and Step 2 (waste type).  
2. On Step 3, select an available skip (e.g. 4yd).  
3. Click Back to Step 2, change waste type (e.g. add Heavy waste), then Continue to Step 3.  
4. Assume the API now returns the same skip but with `disabled: true`.  
5. Observe: the previously selected skip may still appear selected.  
6. Click Continue and complete Step 4, then Confirm booking.

**Expected result**  
- When skips are refetched, any previously selected skip that is now `disabled` is cleared.  
- User must explicitly select an available skip again before Continue is enabled.

**Actual result**  
- Selected skip state is not cleared when the skips list is replaced.  
- User can proceed to Review and Confirm with a disabled skip, leading to potential server-side rejection or inconsistent state.

**Evidence**  
- In `Step3Skip.jsx`, `setSkip(null)` is called in the effect when refetching, but the dependency array may not cover all refetch scenarios, or the UI might still show the old selection if state updates are batched.

**Suggested fix**  
- In the same effect that calls `setSkips(data.skips)`, clear selection if the current `skip` is not in the new list or is disabled:  
  `setSkip((current) => (current && data.skips?.some(s => s.size === current.size && !s.disabled) ? current : null))`  
- Alternatively, derive “selected skip” from the current `skips` array and a selected size/id so that when the list changes, selection is automatically invalidated if the chosen skip is no longer available.

**Affected components**  
- `Step3Skip.jsx`, `App.jsx` (skip state).

---

## BUG-002: No explicit validation that selected address belongs to entered postcode

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
