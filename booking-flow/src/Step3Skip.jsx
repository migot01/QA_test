import { useEffect, useState } from 'react'
import { getSkips } from './api'
import { formatPostcodeForApi } from './postcode'

export default function Step3Skip({
  postcode,
  waste,
  skip,
  setSkip,
  skips,
  setSkips,
  onNext,
  onBack,
  canProceed,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setError('')
    setSkip(null)
    const postcodeNorm = formatPostcodeForApi(postcode)
    if (!postcodeNorm) {
      setSkips([])
      return
    }
    setLoading(true)
    getSkips({
      postcode: postcodeNorm,
      heavyWaste: waste.heavyWaste,
      plasterboard: waste.plasterboard,
    })
      .then((data) => {
        if (!cancelled) {
          const list = data.skips || []
          setSkips(list)
          setSkip((current) => {
            if (!current) return null
            const stillValid = list.some((s) => s.size === current.size && !s.disabled)
            return stillValid ? current : null
          })
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || 'Failed to load skips')
          setSkips([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [postcode, waste.heavyWaste, waste.plasterboard])

  return (
    <section aria-labelledby="step3-title">
      <h2 id="step3-title">Skip Size</h2>
      {error && <p className="error" role="alert">{error}</p>}
      {loading && <p>Loading skips...</p>}
      {!loading && skips.length === 0 && !error && <p>No skips available for your selection.</p>}
      {!loading && skips.length > 0 && (
        <fieldset>
          <label>Choose a skip</label>
          <div className="skips" role="group" aria-label="Skip options">
            {skips.map((s, i) => (
              <div
                key={s.size}
                className={`skip-option ${s.disabled ? 'disabled' : ''} ${skip && skip.size === s.size ? 'selected' : ''}`}
                onClick={() => !s.disabled && setSkip(s)}
                role="button"
                tabIndex={s.disabled ? -1 : 0}
                onKeyDown={(e) => !s.disabled && e.key === 'Enter' && setSkip(s)}
                data-skip-size={s.size}
                data-skip-price={s.price}
                data-skip-disabled={s.disabled}
              >
                <span>{s.size}</span>
                <span>£{s.price}</span>
                {s.disabled && <span aria-hidden> (Unavailable)</span>}
              </div>
            ))}
          </div>
        </fieldset>
      )}
      <button type="button" onClick={onBack} className="secondary">
        Back
      </button>
      <button type="button" onClick={onNext} className="primary" disabled={!canProceed}>
        Continue
      </button>
    </section>
  )
}
