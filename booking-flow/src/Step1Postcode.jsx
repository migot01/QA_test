import { useState } from 'react'
import { postcodeLookup } from './api'
import { isValidUKPostcode } from './postcode'

export default function Step1Postcode({
  postcode,
  setPostcode,
  address,
  setAddress,
  addresses,
  setAddresses,
  onNext,
  canProceed,
}) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLookup = async () => {
    setError('')
    if (!postcode.trim()) {
      setError('Please enter a postcode')
      return
    }
    if (!isValidUKPostcode(postcode)) {
      setError('Please enter a valid UK postcode (e.g. SW1A 1AA)')
      return
    }
    setLoading(true)
    try {
      const data = await postcodeLookup(postcode)
      setAddresses(data.addresses || [])
      setAddress(null)
      if (!(data.addresses && data.addresses.length)) {
        setError('No addresses found for this postcode')
      }
    } catch (e) {
      setError(e.message || 'Postcode lookup failed')
      setAddresses([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="step1-title">
      <h2 id="step1-title">Postcode & Address</h2>
      <fieldset>
        <label htmlFor="postcode">Postcode</label>
        <input
          id="postcode"
          type="text"
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value)
            setError('')
            setAddress(null)
            setAddresses([])
          }}
          onBlur={() => setError('')}
          placeholder="e.g. SW1A 1AA"
          aria-invalid={!!error}
          aria-describedby={error ? 'postcode-error' : undefined}
        />
        {error && (
          <p id="postcode-error" className="error" role="alert">
            {error}
          </p>
        )}
        <button type="button" onClick={handleLookup} disabled={loading} className="primary" style={{ marginTop: 8 }}>
          {loading ? 'Looking up...' : 'Find address'}
        </button>
      </fieldset>
      {addresses.length > 0 && (
        <fieldset>
          <label>Select your address</label>
          <div className="addresses" role="group" aria-label="Address list">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`address-option ${address && address.id === addr.id ? 'selected' : ''}`}
                onClick={() => setAddress(addr)}
                onKeyDown={(e) => e.key === 'Enter' && setAddress(addr)}
                role="button"
                tabIndex={0}
                data-address-id={addr.id}
              >
                {addr.line1}
                {addr.city ? `, ${addr.city}` : ''}
              </div>
            ))}
          </div>
        </fieldset>
      )}
      <button type="button" onClick={onNext} className="primary" disabled={!canProceed}>
        Continue
      </button>
    </section>
  )
}
