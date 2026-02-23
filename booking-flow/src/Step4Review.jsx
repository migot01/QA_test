import { useState } from 'react'
import { confirmBooking } from './api'
import { formatPostcodeForApi } from './postcode'

export default function Step4Review({ postcode, address, waste, skip, bookingId, setBookingId, onBack }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    if (!address || !skip || skip.disabled) return
    setError('')
    setSubmitting(true)
    try {
      const res = await confirmBooking({
        postcode: formatPostcodeForApi(postcode || ''),
        addressId: address.id,
        waste,
        skipSize: skip.size,
        price: skip.price,
      })
      setBookingId(res.bookingId || res.booking_id)
    } catch (e) {
      setError(e.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  const addressLine = address ? [address.line1, address.city].filter(Boolean).join(', ') : ''
  const wasteLabels = []
  if (waste.general) wasteLabels.push('General waste')
  if (waste.heavyWaste) wasteLabels.push('Heavy waste')
  if (waste.plasterboard) wasteLabels.push('Plasterboard')

  return (
    <section aria-labelledby="step4-title">
      <h2 id="step4-title">Review & Confirm</h2>
      <div className="summary" role="region" aria-label="Booking summary">
        <p><strong>Address:</strong> {addressLine}</p>
        <p><strong>Waste:</strong> {wasteLabels.join(', ') || '—'}</p>
        <p><strong>Skip:</strong> {skip?.size} – £{skip?.price}</p>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      {bookingId ? (
        <p className="success" role="status">
          Booking confirmed. Reference: <strong data-booking-id={bookingId}>{bookingId}</strong>
        </p>
      ) : (
        <>
          <button type="button" onClick={onBack} className="secondary">
            Back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="primary"
            disabled={submitting || !address || !skip}
            data-testid="confirm-booking"
          >
            {submitting ? 'Confirming...' : 'Confirm booking'}
          </button>
        </>
      )}
    </section>
  )
}
