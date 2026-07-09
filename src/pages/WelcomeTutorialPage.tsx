import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Gift, Trophy, ArrowRight } from 'lucide-react'

const BRAND = '#E8431A'

export function WelcomeTutorialPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const slides = [
    {
      title: "Welcome to Ripple",
      desc: "Every time you dine out, you build your Ripple. Unlock perks, discounts, and VIP status at your favorite spots.",
      icon: <Droplets className="w-16 h-16 text-white" />,
      color: "from-[#E8431A] to-[#C0300D]"
    },
    {
      title: "Level Up Your Status",
      desc: "Bronze → Silver → Gold. Visit the same spot multiple times to unlock permanent tier discounts up to 20% off.",
      icon: <Trophy className="w-16 h-16 text-white" />,
      color: "from-amber-400 to-amber-600"
    },
    {
      title: "Earn & Redeem",
      desc: "Leave reviews, share photos, or invite friends to earn points. Redeem them for free appetizers, drinks, and more.",
      icon: <Gift className="w-16 h-16 text-white" />,
      color: "from-purple-500 to-indigo-600"
    }
  ]

  const current = slides[step]

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className={`flex-1 bg-gradient-to-br ${current.color} p-8 flex flex-col items-center justify-center text-center`}
        >
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-2xl">
            {current.icon}
          </div>
          <h1 className="text-3xl font-black text-white mb-4">{current.title}</h1>
          <p className="text-white/80 font-medium text-lg leading-relaxed max-w-sm">
            {current.desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="bg-white px-6 py-8 rounded-t-3xl -mt-6 relative z-10 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#E8431A]' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        
        <button
          onClick={() => step < slides.length - 1 ? setStep(s => s + 1) : navigate('/', { replace: true })}
          className="w-full py-4 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-2 shadow-xl"
          style={{ backgroundColor: BRAND }}
        >
          {step < slides.length - 1 ? 'Next' : 'Get Started'} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
