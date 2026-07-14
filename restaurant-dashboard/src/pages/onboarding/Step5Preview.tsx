import { motion } from 'framer-motion'
import { ArrowRight, Check, Rocket, HelpCircle } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { TIER_CONFIG, TIERS } from '@/lib/utils'

interface StepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
}

export default function Step5Preview({ onNext, onBack, isLastStep }: StepProps) {
  const { onboarding } = useDashboardStore()
  const { tiers } = onboarding

  const programStrength = 92

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)]">
      {/* ── Left sidebar ── */}
      <div className="w-72 xl:w-80 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 px-8 py-10 flex flex-col">
        <p className="text-xs font-bold text-brand-600 tracking-widest uppercase mb-3">Step 5 of 5</p>
        <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-3 tracking-tight">
          Preview your program and go live
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6">
          Review your loyalty program before launching. This is how customers will experience it.
        </p>

        {/* You're ready card */}
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check size={13} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-sm font-bold text-green-700">You're almost ready!</p>
          </div>
          <p className="text-xs text-green-600 leading-relaxed">
            Your program is set up and looks great. Take a final look and launch with confidence.
          </p>
        </div>

        {/* Program strength */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xs font-bold text-neutral-700">Program strength</p>
            <HelpCircle size={12} className="text-neutral-300" />
          </div>
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#22C55E" strokeWidth="3"
                  strokeDasharray={`${programStrength} ${100 - programStrength}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-neutral-900">{programStrength}</span>
              </div>
            </div>
            <div className="pt-1">
              <p className="text-sm font-bold text-green-600 mb-2">Excellent</p>
              {['Clear level progression', 'Meaningful rewards', 'Smart spend bonuses', 'Retention protection', 'Great customer experience'].map(item => (
                <p key={item} className="text-[11px] text-neutral-500 flex items-center gap-1 mb-1">
                  <Check size={9} className="text-green-500" strokeWidth={3} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* What to expect */}
        <div className="p-4 rounded-xl bg-brand-50 border border-brand-100">
          <p className="text-xs font-bold text-brand-700 mb-3">What to expect</p>
          <div className="flex gap-4">
            {[
              { value: '+35%', label: 'More repeat visits' },
              { value: '+28%', label: 'Higher spend per visit' },
              { value: '+40%', label: 'Increase in loyalty' },
            ].map(stat => (
              <div key={stat.value}>
                <p className="text-lg font-extrabold text-brand-700">{stat.value}</p>
                <p className="text-[10px] text-brand-500 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <HelpCircle size={12} />
            <span>We're here to help you make your program a huge success.</span>
          </div>
          <button className="mt-2 text-xs text-brand-600 font-semibold flex items-center gap-1 hover:underline">
            Contact Support
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 px-8 xl:px-12 py-10 overflow-y-auto flex gap-6">
        <div className="flex-1 max-w-2xl space-y-8">
          {/* Customer journey preview */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">Customer journey preview</h3>
            <p className="text-sm text-neutral-400 mb-5">Here's how your customers will unlock levels and earn rewards.</p>

            <div className="flex items-start gap-2">
              {TIERS.map((tier, i) => {
                const cfg = TIER_CONFIG[tier]
                const tierState = tiers.find(t => t.tier === tier)!
                return (
                  <div key={tier} className="flex items-start gap-2 flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 rounded-2xl border-2 border-neutral-200 p-4 text-center hover:border-neutral-300 transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl"
                        style={{ backgroundColor: cfg.bgColor }}
                      >
                        {cfg.icon}
                      </div>
                      <p className="text-xs font-bold text-neutral-900 mb-1">{cfg.label}</p>
                      <p className="text-[11px] font-semibold" style={{ color: cfg.color }}>
                        {tierState.visitsRequired} Visit{tierState.visitsRequired > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm font-bold text-brand-600 mt-2">
                        {tierState.discountType === 'percentage' 
                          ? `${tierState.discount}% OFF`
                          : `₹${tierState.discount} OFF`
                        }
                      </p>
                      {tierState.perks.length > 0 && (
                        <div className="mt-2 space-y-0.5">
                          {tierState.perks.slice(0, 2).map(p => (
                            <p key={p} className="text-[10px] text-neutral-400">+ {p}</p>
                          ))}
                        </div>
                      )}
                      <p className="text-[10px] text-neutral-300 mt-3">
                        {tierState.visitsRequired} visit{tierState.visitsRequired > 1 ? 's' : ''} to reach
                      </p>
                    </motion.div>

                    {i < TIERS.length - 1 && (
                      <div className="flex items-center justify-center h-12 mt-8">
                        <ArrowRight size={16} className="text-neutral-300" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Retention summary */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">Retention summary</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: '📅', title: 'Maintain your level', desc: 'Complete required visits each month' },
                { emoji: '⏱️', title: 'Grace period',        desc: '7 days before downgrade' },
                { emoji: '🔔', title: "We'll remind you",   desc: "Get notified before you lose your level" },
                { emoji: '🌊', title: 'Stay, Earn, Enjoy',  desc: 'The more you visit, the more you unlock' },
              ].map(item => (
                <div key={item.title} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                  <span className="text-xl mb-2 block">{item.emoji}</span>
                  <p className="text-xs font-bold text-neutral-800 mb-1">{item.title}</p>
                  <p className="text-[11px] text-neutral-400 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All good banner */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Check size={13} className="text-white" strokeWidth={3} />
            </div>
            <p className="text-sm font-semibold text-green-700">
              Everything looks perfect! Your program is ready to launch.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBack}
              className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-2 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              ← Back
            </button>
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-xl shadow-brand-600/30"
            >
              <Rocket size={16} />
              Launch Program
            </motion.button>
          </div>
        </div>

        {/* ── Right: Live preview & summary ── */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <div>
            <p className="text-xs font-bold text-neutral-700 mb-1">Live customer preview</p>
            <p className="text-[11px] text-neutral-400 mb-3">This is how it will look in the Ripple app.</p>

            <div className="rounded-3xl bg-neutral-900 p-3 shadow-card-lg">
              <div className="rounded-2xl bg-neutral-800 p-4 space-y-3">
                <div>
                  <p className="text-[9px] text-white/40">Good morning, Alex!</p>
                  <p className="text-[10px] text-yellow-400 font-bold flex items-center gap-1">
                    <span>⭐</span> You're a Gold member
                  </p>
                </div>
                <div className="bg-neutral-700 rounded-xl p-3">
                  <p className="text-[9px] text-white/60 mb-1">Gold Benefits</p>
                  <div className="flex gap-2">
                    <div>
                      <p className="text-base font-black text-white">15%</p>
                      <p className="text-[8px] text-white/40">OFF on all orders</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Free Dessert</p>
                      <p className="text-[8px] text-white/40">on orders ₹100+</p>
                    </div>
                  </div>
                  <p className="text-[9px] text-white/50 mt-2">Priority Seating on all visits</p>
                </div>
                <div>
                  <p className="text-[9px] text-white/60 mb-1">Your progress</p>
                  <p className="text-[8px] text-white/40 mb-1">3 of 4 visits completed</p>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full rounded-full w-3/4" style={{ backgroundColor: '#D97706' }} />
                  </div>
                  <p className="text-[8px] text-white/40 mt-1">1 visit to reach Platinum</p>
                </div>
              </div>
            </div>
          </div>

          {/* Program summary */}
          <div className="rounded-2xl border border-neutral-200 p-4 bg-white shadow-card">
            <p className="text-xs font-bold text-neutral-700 mb-3">Program summary</p>
            <div className="space-y-2">
              {[
                { label: 'Levels',           value: '5' },
                { label: 'Visits to Diamond', value: `${tiers[4]?.visitsRequired ?? 12} visits` },
                { label: 'Max discount',       value: `${tiers[4]?.discountType === 'percentage' ? tiers[4]?.discount + '%' : '₹' + tiers[4]?.discount}` },
                { label: 'Spend bonus',        value: 'Up to 15% extra + perks' },
                { label: 'Retention rule',     value: `${tiers[0]?.retentionVisits}–${tiers[4]?.retentionVisits} visits / ${onboarding.qualificationPeriod}` },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-[11px] text-neutral-400">{row.label}</span>
                  <span className="text-[11px] font-semibold text-neutral-800">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
