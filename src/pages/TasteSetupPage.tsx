import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, ChevronRight, Check } from 'lucide-react'

const BRAND = '#E8431A'

const ALLERGENS = [
  { id: 'gluten',    label: 'Gluten',     emoji: '🌾' },
  { id: 'dairy',     label: 'Dairy',      emoji: '🥛' },
  { id: 'peanuts',   label: 'Peanuts',    emoji: '🥜' },
  { id: 'shellfish', label: 'Shellfish',  emoji: '🦐' },
  { id: 'soy',       label: 'Soy',        emoji: '🫘' },
  { id: 'eggs',      label: 'Eggs',       emoji: '🥚' },
  { id: 'tree-nuts', label: 'Tree Nuts',  emoji: '🌰' },
  { id: 'fish',      label: 'Fish',       emoji: '🐟' },
  { id: 'none',      label: 'No Allergies', emoji: '✅' },
]

const SPICE_LEVELS = [
  { id: 0, label: 'Mild',   emoji: '😌', desc: 'No heat at all' },
  { id: 1, label: 'Low',    emoji: '🌶️', desc: 'A little warmth' },
  { id: 2, label: 'Medium', emoji: '🌶️🌶️', desc: 'I can handle it' },
  { id: 3, label: 'Hot',    emoji: '🔥', desc: 'Bring the heat!' },
]

export function TasteSetupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [dietType, setDietType]     = useState<string | null>(null)
  const [allergens, setAllergens]   = useState<Set<string>>(new Set())
  const [customAllergy, setCustomAllergy] = useState('')
  const [spiceLevel, setSpiceLevel] = useState<number | null>(null)

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customAllergy.trim()) return
    setAllergens(prev => {
      const next = new Set(prev)
      next.delete('none')
      next.add(customAllergy.trim().toLowerCase())
      return next
    })
    setCustomAllergy('')
  }

  const toggleAllergen = (id: string) => {
    setAllergens(prev => {
      const next = new Set(prev)
      if (id === 'none') return new Set(['none'])
      next.delete('none')
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const finish = () => {
    localStorage.setItem('ripple_taste', JSON.stringify({ dietType, allergens: [...allergens], spiceLevel }))
    navigate('/', { replace: true })
  }

  const steps = [
    {
      id: 'diet',
      title: 'What\'s your vibe? 🍽️',
      subtitle: 'We\'ll personalize your menu recommendations',
    },
    {
      id: 'allergens',
      title: 'Any food allergies? ⚠️',
      subtitle: 'We\'ll always flag items that may affect you',
    },
    {
      id: 'spice',
      title: 'How do you like the heat? 🌶️',
      subtitle: 'We\'ll filter out dishes that don\'t match',
    },
  ]

  const current = steps[step]
  const canNext = step === 0 ? !!dietType : step === 1 ? allergens.size > 0 : spiceLevel !== null

  return (
    <div className="min-h-full bg-gradient-to-b from-[#FEF0EC] to-[#F7F5F2] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: BRAND }}>
            <Droplets className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-slate-900 text-lg">Your Taste Profile</span>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                flex: i === step ? 2 : 1,
                backgroundColor: i <= step ? BRAND : '#E2E8F0',
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-2xl font-black text-slate-900 leading-tight">{current.title}</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">{current.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step content */}
      <div className="flex-1 px-6 pb-32">
        <AnimatePresence mode="wait">
          {/* Step 0: Diet type */}
          {step === 0 && (
            <motion.div key="diet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 mt-4">
                            {[
                { id: 'veg' as const,     emoji: '🌿', label: 'Vegetarian / Vegan',  desc: 'Only plant-based dishes for me' },
                { id: 'non-veg' as const, emoji: '🥩', label: 'Non-Vegetarian',        desc: 'I enjoy meat, seafood, everything!' },
                { id: 'eggitarian' as const, emoji: '🥚', label: 'Eggitarian',        desc: 'Vegetarian but I eat eggs' },
                { id: 'pescatarian' as const, emoji: '🐟', label: 'Pescatarian',       desc: 'Vegetarian plus seafood' },
                { id: 'both' as const,    emoji: '🍱', label: 'No Restrictions',       desc: 'I eat everything' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDietType(opt.id)}
                  className={`w-full flex items-center gap-4 bg-white rounded-3xl p-4 border-2 transition-all text-left ${
                    dietType === opt.id ? 'border-[#E8431A] shadow-md' : 'border-transparent shadow-sm'
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <div className="flex-1">
                    <p className="font-black text-slate-900">{opt.label}</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{opt.desc}</p>
                  </div>
                  {dietType === opt.id && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND }}>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 1: Allergens */}
          {step === 1 && (
            <motion.div key="allergens" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4">
              <div className="grid grid-cols-3 gap-3">
                {ALLERGENS.map(a => {
                  const selected = allergens.has(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAllergen(a.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                        selected ? 'border-[#E8431A] bg-[#FEF0EC]' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <span className="text-2xl">{a.emoji}</span>
                      <p className={`text-[11px] font-black text-center leading-tight ${selected ? 'text-[#E8431A]' : 'text-slate-700'}`}>
                        {a.label}
                      </p>
                      {selected && (
                        <div className="w-4 h-4 rounded-full flex items-center justify-center absolute top-1 right-1" style={{ backgroundColor: BRAND }}>
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Custom Allergies Chips */}
              <div className="mt-6">
                <p className="text-xs font-black text-slate-700 mb-2">Other Allergies?</p>
                <form onSubmit={handleAddCustom} className="flex gap-2">
                  <input
                    type="text"
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                    placeholder="e.g. Sesame 🍔"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]"
                  />
                  <button type="submit" className="bg-slate-900 text-white px-4 rounded-xl text-sm font-bold active:scale-95 transition-transform">
                    Add
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.from(allergens).filter(id => !ALLERGENS.some(a => a.id === id) && id !== 'none').map(custom => (
                    <div key={custom} className="bg-[#FEF0EC] border border-[#E8431A] text-[#E8431A] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <span className="capitalize">{custom}</span>
                      <button onClick={() => toggleAllergen(custom)} className="w-4 h-4 bg-[#E8431A] text-white rounded-full flex items-center justify-center hover:opacity-80">
                        <Check className="w-2 h-2 opacity-0" /> {/* Just to keep size consistent */}
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Spice level */}
          {step === 2 && (
            <motion.div key="spice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 mt-4">
              {SPICE_LEVELS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSpiceLevel(s.id)}
                  className={`w-full flex items-center gap-4 bg-white rounded-3xl p-4 border-2 transition-all text-left ${
                    spiceLevel === s.id ? 'border-[#E8431A] shadow-md' : 'border-transparent shadow-sm'
                  }`}
                >
                  <span className="text-3xl">{s.emoji}</span>
                  <div className="flex-1">
                    <p className="font-black text-slate-900">{s.label}</p>
                    <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
                  </div>
                  {/* Visual heat bars */}
                  <div className="flex gap-1">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="w-1.5 h-5 rounded-full" style={{ backgroundColor: i <= s.id ? '#E8431A' : '#E2E8F0' }} />
                    ))}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-5 space-y-3">
        <button
          disabled={!canNext}
          onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : finish()}
          className={`w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all ${
            canNext ? 'text-white shadow-lg' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          style={canNext ? { backgroundColor: BRAND } : {}}
        >
          {step < steps.length - 1 ? 'Continue' : 'Start Exploring'} <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : finish()}
          className="w-full text-center text-sm font-bold text-slate-400"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
