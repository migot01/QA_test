/**
 * API module – uses mock when backend is unavailable (e.g. dev).
 * Matches assessment dummy API specification.
 */

const BASE = '/api'
const USE_MOCK = true // Set to false when real API is available

// ---------- Mock responses (assessment spec) ----------
const mockPostcodeLookup = (postcode) => ({
  postcode: postcode.replace(/\s/g, '') || 'SW1A1AA',
  addresses: [
    { id: 1, line1: '10 Downing Street', city: 'London' },
    { id: 2, line1: '11 Downing Street', city: 'London' },
  ],
})

const mockSkips = (postcode, heavyWaste) => ({
  skips: [
    { size: '4yd', price: 180, disabled: false },
    { size: '8yd', price: 320, disabled: true },
    { size: '12yd', price: 450, disabled: false },
  ],
})

const mockConfirm = () => ({
  status: 'success',
  bookingId: 'BK-100012',
})

// ---------- Real request helper ----------
async function request(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || res.statusText)
  return data
}

// ---------- Public API ----------
export async function postcodeLookup(postcode) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    return mockPostcodeLookup(postcode)
  }
  return request('/postcode/lookup', {
    method: 'POST',
    body: JSON.stringify({ postcode: (postcode || '').replace(/\s/g, '') }),
  })
}

export async function getWasteTypes() {
  if (USE_MOCK) return {}
  return request('/waste-types', { method: 'GET' })
}

export async function submitWasteSelection(payload) {
  if (USE_MOCK) return {}
  return request('/waste-types', { method: 'POST', body: JSON.stringify(payload) })
}

export async function getSkips(params) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 200))
    return mockSkips(params.postcode, params.heavyWaste)
  }
  const q = new URLSearchParams(params).toString()
  return request(`/skips?${q}`, { method: 'GET' })
}

export async function confirmBooking(payload) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400))
    return mockConfirm(payload)
  }
  return request('/booking/confirm', { method: 'POST', body: JSON.stringify(payload) })
}
