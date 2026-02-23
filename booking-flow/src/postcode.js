/**
 * UK postcode validation – basic format check.
 * Valid: SW1A 1AA, M1 1AA, B1 1AA, etc.
 */
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}$/i

export function isValidUKPostcode(value) {
  if (!value || typeof value !== 'string') return false
  const normalized = value.trim().replace(/\s+/g, ' ')
  return UK_POSTCODE_REGEX.test(normalized)
}

export function formatPostcodeForApi(postcode) {
  return postcode.trim().replace(/\s/g, '').toUpperCase()
}
