export default function Step2Waste({ waste, setWaste, onNext, onBack, canProceed }) {
  return (
    <section aria-labelledby="step2-title">
      <h2 id="step2-title">Waste Type</h2>
      <fieldset>
        <label>
          <input
            type="checkbox"
            checked={waste.general}
            onChange={(e) => setWaste((w) => ({ ...w, general: e.target.checked }))}
            data-testid="waste-general"
          />
          General waste
        </label>
        <label>
          <input
            type="checkbox"
            checked={waste.heavyWaste}
            onChange={(e) => setWaste((w) => ({ ...w, heavyWaste: e.target.checked }))}
            data-testid="waste-heavy"
          />
          Heavy waste
        </label>
        <label>
          <input
            type="checkbox"
            checked={waste.plasterboard}
            onChange={(e) => setWaste((w) => ({ ...w, plasterboard: e.target.checked }))}
            data-testid="waste-plasterboard"
          />
          Plasterboard
        </label>
      </fieldset>
      <button type="button" onClick={onBack} className="secondary">
        Back
      </button>
      <button type="button" onClick={onNext} className="primary" disabled={!canProceed}>
        Continue
      </button>
    </section>
  )
}
