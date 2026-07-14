import { useNavigate } from 'react-router-dom'
import { useDashboardStore } from '@/store/dashboardStore'
import RippleLogo from '@/components/RippleLogo'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Step1DefineLevels from './onboarding/Step1DefineLevels'
import Step2Rewards from './onboarding/Step2Rewards'
import Step3SpendBonuses from './onboarding/Step3SpendBonuses'
import Step4Retention from './onboarding/Step4Retention'
import Step5Preview from './onboarding/Step5Preview'

export const ONBOARDING_STEPS = [
  { num: 1, label: 'Define Levels' },
  { num: 2, label: 'Rewards' },
  { num: 3, label: 'Spend Bonuses' },
  { num: 4, label: 'Retention' },
  { num: 5, label: 'Preview' },
]

const STEP_COMPONENTS = [
  Step1DefineLevels,
  Step2Rewards,
  Step3SpendBonuses,
  Step4Retention,
  Step5Preview,
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { onboarding, nextStep, prevStep } = useDashboardStore()
  const currentStep = onboarding.currentStep  // 0-indexed

  const StepComponent = STEP_COMPONENTS[currentStep]

  const handleNext = () => {
    if (currentStep < 4) {
      nextStep()
    } else {
      // Final step — launch!
      navigate('/dashboard/home')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) prevStep()
    else navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Top bar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-neutral-100 h-16 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RippleLogo size={24} />
          <span className="text-xl font-extrabold text-neutral-900 tracking-tight">ripple</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-neutral-500 font-medium hover:text-neutral-800 transition-colors"
          >
            Save & Exit
          </button>
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
            RK
          </div>
        </div>
      </header>

      {/* ── Step content ── */}
      <main className="flex-1 pt-16 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="h-full"
          >
            <StepComponent
              onNext={handleNext}
              onBack={handleBack}
              isLastStep={currentStep === 4}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom step progress (Sticky) ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-neutral-100 py-4 px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)]">
        <div className="max-w-2xl mx-auto flex items-center">
          {ONBOARDING_STEPS.map((step, i) => {
            const done = i < currentStep
            const active = i === currentStep
            return (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      done
                        ? 'bg-brand-600 text-white'
                        : active
                        ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                        : 'bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    {done ? <Check size={12} strokeWidth={3} /> : step.num}
                  </div>
                  <span
                    className={`text-[10px] mt-1 font-semibold tracking-wide transition-colors ${
                      active
                        ? 'text-brand-600'
                        : done
                        ? 'text-neutral-400'
                        : 'text-neutral-300'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < ONBOARDING_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 mb-4 rounded-full transition-colors duration-300 ${
                      done ? 'bg-brand-600' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
