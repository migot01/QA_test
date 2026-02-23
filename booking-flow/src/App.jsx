import { useState } from 'react'
import StepIndicator from './StepIndicator'
import Step1Postcode from './Step1Postcode'
import Step2Waste from './Step2Waste'
import Step3Skip from './Step3Skip'
import Step4Review from './Step4Review'

const STEPS = ['Postcode & Address', 'Waste Type', 'Skip Size', 'Review & Confirm']

export default function App() {
  const [step, setStep] = useState(1)
  const [postcode, setPostcode] = useState('')
  const [address, setAddress] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [waste, setWaste] = useState({ general: true, heavyWaste: false, plasterboard: false })
  const [skip, setSkip] = useState(null)
  const [skips, setSkips] = useState([])
  const [bookingId, setBookingId] = useState(null)

  const canProceedFrom1 = !!address
  const canProceedFrom2 = waste.general || waste.heavyWaste || waste.plasterboard
  const canProceedFrom3 = !!skip && !skip.disabled

  const goNext = () => setStep((s) => Math.min(s + 1, 4))
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <div className="booking-flow">
      <h1>Skip Hire Booking</h1>
      <StepIndicator steps={STEPS} current={step} />
      {step === 1 && (
        <Step1Postcode
          postcode={postcode}
          setPostcode={setPostcode}
          address={address}
          setAddress={setAddress}
          addresses={addresses}
          setAddresses={setAddresses}
          onNext={goNext}
          canProceed={canProceedFrom1}
        />
      )}
      {step === 2 && (
        <Step2Waste
          waste={waste}
          setWaste={setWaste}
          onNext={goNext}
          onBack={goBack}
          canProceed={canProceedFrom2}
        />
      )}
      {step === 3 && (
        <Step3Skip
          postcode={postcode}
          waste={waste}
          skip={skip}
          setSkip={setSkip}
          skips={skips}
          setSkips={setSkips}
          onNext={goNext}
          onBack={goBack}
          canProceed={canProceedFrom3}
        />
      )}
      {step === 4 && (
        <Step4Review
          postcode={postcode}
          address={address}
          waste={waste}
          skip={skip}
          bookingId={bookingId}
          setBookingId={setBookingId}
          onBack={goBack}
        />
      )}
    </div>
  )
}
