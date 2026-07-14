import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play, RefreshCcw, TrendingUp, Heart, Star, Lock } from 'lucide-react'
import RippleLogo from '@/components/RippleLogo'

const FEATURES = [
  { icon: RefreshCcw, title: 'More repeat visits',  desc: 'Keep your customers coming back.' },
  { icon: TrendingUp, title: 'Higher spending',      desc: 'Reward bigger orders and grow revenue.' },
  { icon: Heart,      title: 'Stronger loyalty',    desc: 'Build lasting relationships with your best customers.' },
  { icon: Star,       title: 'Easy to set up',      desc: 'Launch your program in minutes.' },
]

const TIERS = [
  { name: 'PLATINUM', discount: '20% OFF', perk: 'VIP Benefits',     color: '#7C3AED', icon: '👑' },
  { name: 'GOLD',     discount: '15% OFF', perk: 'Free Dessert',     color: '#D97706', icon: '⭐' },
  { name: 'SILVER',   discount: '10% OFF', perk: 'Free Drink',       color: '#64748B', icon: '🥈' },
  { name: 'BRONZE',   discount: '5% OFF',  perk: 'Welcome Reward',   color: '#B45309', icon: '🥉' },
]

const STEPS = [
  { num: 1, label: 'Welcome' },
  { num: 2, label: 'Your Program' },
  { num: 3, label: 'Rewards' },
  { num: 4, label: 'Retention' },
  { num: 5, label: 'Preview' },
]

export default function SplashPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Top bar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100 h-16 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RippleLogo size={26} />
          <span className="text-xl font-extrabold text-neutral-900 tracking-tight">ripple</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/home')}
            className="text-sm text-neutral-500 font-medium hover:text-neutral-800 transition-colors"
          >
            Sign In
          </button>
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
            RK
          </div>
        </div>
      </header>

      {/* ── Main two-column layout ── */}
      <main className="flex-1 grid grid-cols-2 pt-16 min-h-0">

        {/* Left — Content */}
        <div className="flex flex-col justify-center px-12 xl:px-20 py-16 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-bold text-brand-600 tracking-[0.15em] uppercase mb-4">
              Welcome to Ripple
            </p>

            <h1 className="text-4xl xl:text-5xl font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-2">
              Turn first-time visitors into
            </h1>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight mb-5">
              <span className="text-neutral-900">loyal </span>
              <span className="relative inline-block text-neutral-900">
                customers
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q100 0 200 5" stroke="#E8431A" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-base text-neutral-500 mb-10 leading-relaxed max-w-sm">
              Ripple helps restaurants like yours reward customers for coming back more often and spending more.
            </p>

            {/* Feature 2×2 grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-10">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon size={16} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800 text-sm leading-tight">{f.title}</p>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-snug">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                id="splash-cta-build"
                onClick={() => navigate('/onboarding')}
                className="flex items-center gap-2 px-6 py-3.5 bg-brand-600 text-white rounded-xl font-semibold text-sm hover:bg-brand-700 active:scale-95 transition-all shadow-lg shadow-brand-600/25"
              >
                Let's Build My Program
                <ArrowRight size={16} />
              </button>
              <button className="flex items-center gap-2.5 text-neutral-600 text-sm font-medium hover:text-neutral-900 transition-colors">
                <div className="w-8 h-8 rounded-full border-2 border-neutral-200 flex items-center justify-center hover:border-neutral-400 transition-colors">
                  <Play size={11} className="text-neutral-600 ml-0.5" fill="currentColor" />
                </div>
                Watch how Ripple works
              </button>
            </motion.div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Lock size={11} />
              Your data is safe with us. You can change anything anytime.
            </div>
          </motion.div>
        </div>

        {/* Right — Hero image with tier cards */}
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&auto=format&fit=crop"
            alt="Restaurant interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          {/* Floating tier cards */}
          <div className="relative z-10 flex flex-col items-end justify-center h-full pr-8 xl:pr-14 gap-3 py-16">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3.5 min-w-[210px]"
              >
                <span className="text-2xl">{tier.icon}</span>
                <div>
                  <p className="font-bold text-neutral-900 text-xs tracking-wide">{tier.name}</p>
                  <p className="text-sm font-bold" style={{ color: tier.color }}>{tier.discount}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{tier.perk}</p>
                </div>
              </motion.div>
            ))}

            {/* Upward arrow connector */}
            <motion.div
              className="flex flex-col items-center gap-1 my-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            />

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.45 }}
              className="bg-white rounded-2xl shadow-xl p-4 max-w-[270px] mt-1"
            >
              <div className="flex items-start gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=12"
                  alt="Arjun Mehta"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow"
                />
                <div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed mb-1.5">
                    "Ripple increased our repeat visits by 42% in the first two months!"
                  </p>
                  <p className="text-xs font-bold text-neutral-900">Arjun Mehta</p>
                  <p className="text-[10px] text-neutral-400">Owner, The Rustic Spoon</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Bottom progress steps ── */}
      <div className="bg-white border-t border-neutral-100 py-4 px-8">
        <div className="max-w-lg mx-auto flex items-center">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step.num === 1
                      ? 'bg-brand-600 text-white'
                      : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  {step.num}
                </div>
                <span
                  className={`text-[10px] mt-1 font-semibold tracking-wide ${
                    step.num === 1 ? 'text-brand-600' : 'text-neutral-300'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-neutral-200 mx-3 mb-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
