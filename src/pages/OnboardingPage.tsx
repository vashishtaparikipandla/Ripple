import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Droplets, Award, Gift, Star, Users, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    id: 0,
    icon: Droplets,
    title: 'The Ripple\nConcept',
    body: 'Every time you visit a restaurant, you create a ripple. The more you return to the same place, the bigger your ripple grows—unlocking deeper discounts.',
    accent: '#E8431A',
    bg: 'from-[#FEF0EC] to-[#F7F5F2]',
    rings: ['#E8431A20', '#E8431A15', '#E8431A08'],
  },
  {
    id: 1,
    icon: Award,
    title: 'Level up your\nLoyalty',
    body: 'Grow from Bronze to Platinum. Unlock up to 20% off your total bill, complimentary drinks, priority seating, and exclusive Chef\'s table access.',
    accent: '#CA8A04',
    bg: 'from-[#FFFBEB] to-[#F7F5F2]',
    rings: ['#CA8A0420', '#CA8A0415', '#CA8A0408'],
  },
  {
    id: 2,
    icon: Gift,
    title: 'Earn points &\nShare discounts',
    body: 'Earn global Ripple Points on every booking to redeem as cash value. You can even gift your hard-earned restaurant discounts to friends!',
    accent: '#7C3AED',
    bg: 'from-[#F5F3FF] to-[#F7F5F2]',
    rings: ['#7C3AED20', '#7C3AED15', '#7C3AED08'],
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: 'Pre-order.\nArrive. Enjoy.',
    body: 'Order your food in advance and have it ready when you walk in. No waiting, no rush — just seamless dining, exactly the way you want it.',
    accent: '#059669',
    bg: 'from-[#ECFDF5] to-[#F7F5F2]',
    rings: ['#05966920', '#05966915', '#05966908'],
  },
]


export function OnboardingPage() {
  const navigate   = useNavigate()
  const [slide, setSlide] = useState(0)
  const current = SLIDES[slide]

  const finish = () => {
    localStorage.setItem('ripple_onboarded', 'true')
    navigate('/auth', { replace: true })
  }

  return (
    <div className={`h-full w-full flex flex-col bg-gradient-to-b ${current.bg} transition-all duration-500`}>

      {/* Skip */}
      <div className="flex justify-end px-6 pt-5">
        <button onClick={finish} className="text-xs font-black text-slate-400 px-3 py-1.5 rounded-full bg-slate-100">
          Skip
        </button>
      </div>

      {/* Illustration area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">

        {/* Animated concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {current.rings.map((color, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width:  (i + 1) * 110,
                height: (i + 1) * 110,
                border: `1.5px solid ${color}`,
                animation: `ripple-grow 3s ease-out ${i * 0.8}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{    scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: current.accent }}
          >
            <current.icon className="w-14 h-14 text-white" />
          </motion.div>
        </AnimatePresence>

        {/* Tier badges row (slide 1 only) */}
        {slide === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mt-6 z-10"
          >
            {[
              { label: 'Bronze', cls: 'badge-bronze' },
              { label: 'Silver', cls: 'badge-silver' },
              { label: 'Gold',   cls: 'badge-gold' },
              { label: 'Plat',   cls: 'badge-platinum' },
            ].map(b => (
              <div key={b.label} className={`${b.cls} px-3 py-1.5 rounded-full text-[10px] font-black text-white shadow-md`}>
                {b.label}
              </div>
            ))}
          </motion.div>
        )}

        {/* Points row (slide 2 only) */}
        {slide === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mt-6 z-10"
          >
            {[
              { icon: Star,    label: 'Dine',  pts: '+50' },
              { icon: Users,   label: 'Refer', pts: '+100' },
              { icon: Droplets,label: 'Share', pts: '+10' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-1 bg-white/70 backdrop-blur rounded-2xl px-4 py-3 border border-slate-100 shadow-sm">
                <item.icon className="w-5 h-5" style={{ color: '#7C3AED' }} />
                <span className="text-[10px] font-black text-slate-600">{item.pts}</span>
                <span className="text-[9px] text-slate-400">{item.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Text */}
      <div className="px-8 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-[26px] font-black text-slate-900 leading-tight mb-3 whitespace-pre-line">
              {current.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots + CTA */}
      <div className="px-6 pb-10 flex items-center justify-between">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}>
              <div className="h-2 rounded-full transition-all duration-300"
                   style={{
                     width:           i === slide ? 24 : 8,
                     backgroundColor: i === slide ? current.accent : '#D1D5DB',
                   }} />
            </button>
          ))}
        </div>

        {slide < SLIDES.length - 1 ? (
          <button
            onClick={() => setSlide(s => s + 1)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: current.accent }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        ) : (
          <button
            onClick={finish}
            className="px-8 py-3.5 rounded-full font-black text-white text-sm shadow-lg"
            style={{ backgroundColor: current.accent }}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  )
}
