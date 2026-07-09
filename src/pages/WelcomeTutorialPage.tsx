import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star, Trophy, Coffee, CheckCircle2 } from 'lucide-react'

const BRAND = '#E8431A'

export function WelcomeTutorialPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  // Auto-advance some internal animations
  const [innerStep, setInnerStep] = useState(0)
  useEffect(() => {
    setInnerStep(0)
    const t = setInterval(() => {
      setInnerStep(s => (s + 1) % 3)
    }, 2000)
    return () => clearInterval(t)
  }, [step])

  const Slide1Visual = () => (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Expanding Ripple Circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 2.5],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
          className="absolute w-20 h-20 rounded-full border-2 border-white/40"
        />
      ))}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center relative z-10 border border-white/50"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white">
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 12 2 12 2C12 2 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill="currentColor" fillOpacity="0.8"/>
        </svg>
      </motion.div>
    </div>
  )

  const Slide2Visual = () => (
    <div className="w-64 h-64 relative flex flex-col items-center justify-end pb-4">
      {/* Progress Track */}
      <div className="w-2 h-48 bg-black/20 rounded-full relative mb-8">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: innerStep === 0 ? '33%' : innerStep === 1 ? '66%' : '100%' }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/40 to-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        />
        
        {/* Nodes */}
        <div className="absolute -left-3 bottom-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-amber-600 z-10">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
        </div>
        <motion.div 
          animate={{ 
            scale: innerStep >= 1 ? 1 : 0.8,
            backgroundColor: innerStep >= 1 ? '#fff' : 'rgba(255,255,255,0.3)',
            borderColor: innerStep >= 1 ? '#fff' : 'transparent'
          }}
          className="absolute -left-3 bottom-[50%] -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 z-10 transition-colors duration-500"
        >
          {innerStep >= 1 && <Star className="w-4 h-4 text-amber-500" fill="currentColor" />}
        </motion.div>
        <motion.div 
          animate={{ 
            scale: innerStep >= 2 ? 1.2 : 0.8,
            backgroundColor: innerStep >= 2 ? '#FFD700' : 'rgba(255,255,255,0.3)',
            borderColor: innerStep >= 2 ? '#FFD700' : 'transparent'
          }}
          className="absolute -left-3 top-0 w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.8)] border-2 z-10 transition-colors duration-500"
        >
          {innerStep >= 2 && <Trophy className="w-4 h-4 text-white" />}
        </motion.div>
      </div>
      
      {/* Floating text */}
      <motion.div 
        key={innerStep}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute bottom-0 text-white font-black text-lg bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-md"
      >
        {innerStep === 0 ? 'Bronze' : innerStep === 1 ? 'Silver Unlock!' : 'Gold Status ✨'}
      </motion.div>
    </div>
  )

  const Slide3Visual = () => (
    <div className="w-64 h-64 relative flex items-center justify-center">
      {/* Main Item */}
      <motion.div
        animate={{ 
          filter: innerStep === 2 ? 'grayscale(0%)' : 'grayscale(100%)',
          scale: innerStep === 2 ? 1.1 : 1
        }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl relative z-20"
      >
        <Coffee className={`w-14 h-14 transition-colors duration-500 ${innerStep === 2 ? 'text-amber-700' : 'text-slate-300'}`} />
      </motion.div>

      {/* Flying coins */}
      <AnimatePresence>
        {innerStep === 1 && (
          <>
            {[[-40, -60], [40, -50], [0, -80]].map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: pos[0] * 2, y: pos[1] * 2, scale: 0 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, type: 'spring' }}
                className="absolute w-8 h-8 rounded-full bg-[#FFD700] border-2 border-white shadow-lg flex items-center justify-center z-30 text-amber-700 font-black text-[10px]"
              >
                R
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
      
      {/* Shine effect */}
      {innerStep === 2 && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 2, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-white/40 rounded-full blur-xl pointer-events-none"
        />
      )}
    </div>
  )

  const slides = [
    {
      title: "The Ripple Effect",
      desc: "Every visit builds your Ripple. A new way to experience local dining where loyalty actually pays off.",
      visual: <Slide1Visual />,
      color: "from-blue-600 to-indigo-800"
    },
    {
      title: "Level Up Your Status",
      desc: "Visit your favorite spots multiple times to climb from Bronze to Gold. Unlock permanent discounts up to 20% off.",
      visual: <Slide2Visual />,
      color: "from-[#E8431A] to-[#A0280D]"
    },
    {
      title: "Redeem for Real Rewards",
      desc: "Earn points by leaving reviews and sharing photos. Instantly redeem them for free drinks, appetizers, and exclusive perks.",
      visual: <Slide3Visual />,
      color: "from-emerald-500 to-teal-800"
    }
  ]

  const current = slides[step]

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 bg-gradient-to-br ${current.color} flex flex-col items-center justify-center relative overflow-hidden`}
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="h-2/3 flex items-center justify-center mt-10 w-full">
            {current.visual}
          </div>
          
          <div className="h-1/3 px-8 text-center flex flex-col items-center z-10 w-full">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-black text-white mb-3"
            >
              {current.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 font-medium text-[15px] leading-relaxed max-w-sm"
            >
              {current.desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="bg-white px-6 py-8 rounded-t-3xl -mt-6 relative z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-[#E8431A]' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>
          <button onClick={() => navigate('/', { replace: true })} className="text-sm font-bold text-slate-400">
            Skip
          </button>
        </div>
        
        <button
          onClick={() => step < slides.length - 1 ? setStep(s => s + 1) : navigate('/', { replace: true })}
          className="w-full py-4 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-transform"
          style={{ backgroundColor: BRAND }}
        >
          {step < slides.length - 1 ? 'Next' : 'Start Exploring'} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
