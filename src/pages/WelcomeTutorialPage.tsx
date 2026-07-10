import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Gift, Share, TrendingUp, Droplets } from 'lucide-react'

const BRAND = '#E8431A'

export function WelcomeTutorialPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  // ── Visuals ──

  const Slide1Visual = () => (
    <div className="w-full h-64 relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-3xl" />
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="w-full max-w-[240px] bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-4 relative z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <div className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black rounded-full uppercase tracking-wider">
            Level Up
          </div>
        </div>
        
        <div className="space-y-3">
          {/* Bronze */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 opacity-50">
            <span className="text-xs font-bold text-slate-500">Bronze</span>
            <span className="text-xs font-black text-slate-400">5% OFF</span>
          </div>
          {/* Silver */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 opacity-70">
            <span className="text-xs font-bold text-slate-600">Silver</span>
            <span className="text-xs font-black text-slate-500">10% OFF</span>
          </div>
          {/* Gold */}
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-400 shadow-md border border-amber-300"
          >
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-amber-900" />
              <span className="text-xs font-black text-amber-900">Gold</span>
            </div>
            <span className="text-sm font-black text-amber-900">15% OFF</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )

  const Slide2Visual = () => (
    <div className="w-full h-64 relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-3xl" />
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative w-full max-w-[240px] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 z-10"
      >
        <img 
          src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600" 
          alt="Coffee" 
          className="w-full h-40 object-cover"
        />
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.6, delay: 0.3 }}
          className="absolute top-3 left-3 bg-[#FFD700] text-amber-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-yellow-300 flex items-center gap-1"
        >
          <Gift className="w-3 h-3" /> FREE ITEM
        </motion.div>
        <div className="bg-white p-4">
          <p className="text-sm font-black text-slate-900">Complimentary Coffee</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Unlocked with Gold Status</p>
          <div className="mt-3 flex justify-end">
            <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-0.5 bg-slate-900 rounded-sm" />
                <div className="w-0.5 h-1.5 bg-slate-900 rounded-sm absolute" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const Slide3Visual = () => (
    <div className="w-full h-64 relative flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white rounded-3xl" />
      
      {/* iMessage Bubble */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="w-full max-w-[260px] flex flex-col items-end z-10"
      >
        <div className="bg-blue-500 rounded-2xl rounded-tr-sm px-4 py-3 text-white shadow-md relative w-[85%]">
          <p className="text-[13px] font-medium leading-snug">
            Check this out! I'm sharing my <span className="font-black">15% Gold discount</span> at The Rustic Spoon with you.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 w-[85%] bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
            <Share className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <p className="text-[12px] font-black text-slate-900">VIP Pass Attached</p>
            <p className="text-[10px] font-medium text-slate-500 mt-0.5">Tap to claim your 15% off</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )

  const slides = [
    {
      title: "Climb the Tiers",
      desc: "The more you visit a restaurant, the higher you climb. Return regularly to maintain your status and unlock massive permanent discounts.",
      visual: <Slide1Visual />
    },
    {
      title: "Earn Free Perks",
      desc: "Your loyalty pays off instantly. High-tier status unlocks free drinks, appetizers, and exclusive off-menu items at your favorite spots.",
      visual: <Slide2Visual />
    },
    {
      title: "Share the Wealth",
      desc: "Good things are meant to be shared. Send your exact hard-earned discounts to your friends so they can dine like VIPs too.",
      visual: <Slide3Visual />
    }
  ]

  const current = slides[step]

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden">
      
      {/* Top Header */}
      <div className="flex justify-end p-6 z-20 relative">
        <button 
          onClick={() => { localStorage.setItem('ripple_onboarded', 'true'); navigate('/auth', { replace: true }) }} 
          className="text-[13px] font-black text-slate-400 hover:text-slate-600 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content Carousel */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-10 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-sm mx-auto bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6"
          >
            {/* Title & Desc */}
            <div className="mb-8">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                {current.title}
              </h1>
              <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                {current.desc}
              </p>
            </div>
            
            {/* Visual Mockup Container */}
            <div className="rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden">
              {current.visual}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 pb-12 pt-4 bg-white relative z-20">
        <div className="max-w-sm mx-auto flex flex-col gap-8">
          
          {/* Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-slate-900' : 'w-1.5 bg-slate-200'}`} 
              />
            ))}
          </div>
          
          {/* CTA */}
          <button
            onClick={() => step < slides.length - 1 ? setStep(s => s + 1) : (() => { localStorage.setItem('ripple_onboarded', 'true'); navigate('/auth', { replace: true }) })()}
            className="w-full py-4 rounded-2xl font-black text-white text-lg flex items-center justify-center shadow-lg active:scale-[0.98] transition-transform"
            style={{ backgroundColor: BRAND, boxShadow: `0 8px 25px ${BRAND}40` }}
          >
            {step < slides.length - 1 ? 'Next' : 'Get Started'} 
          </button>
        </div>
      </div>

    </div>
  )
}
