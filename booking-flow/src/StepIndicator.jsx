export default function StepIndicator({ steps, current }) {
  return (
    <div className="steps" role="tablist" aria-label="Booking steps">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const state = stepNum < current ? 'done' : stepNum === current ? 'active' : 'pending'
        return (
          <div
            key={stepNum}
            className={`step ${state}`}
            role="tab"
            aria-selected={stepNum === current}
            aria-current={stepNum === current ? 'step' : undefined}
            data-step={stepNum}
          >
            {stepNum}. {label}
          </div>
        )
      })}
    </div>
  )
}
