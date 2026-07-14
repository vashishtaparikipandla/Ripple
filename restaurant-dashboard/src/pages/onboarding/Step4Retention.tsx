import { Shield, RefreshCcw, TrendingUp, CheckSquare, Instagram, Facebook } from 'lucide-react'
import { TIER_CONFIG, TIERS } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboardStore'

interface StepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
}

const ACTIVITIES = [
  { icon: '⭐', label: 'Write a 5-star review on Google or Ripple', limit: 'Once per program', impact: 'High',   impactColor: 'text-green-600', impactBg: 'bg-green-50' },
  { icon: '📷', label: 'Follow on Instagram @yourrestaurant',        limit: 'Once (max)',      impact: 'Medium', impactColor: 'text-yellow-600', impactBg: 'bg-yellow-50' },
  { icon: '👍', label: 'Like on Facebook — your Facebook page',      limit: 'Once (max)',      impact: 'Medium', impactColor: 'text-yellow-600', impactBg: 'bg-yellow-50' },
  { icon: '🎵', label: 'Follow on TikTok @yourrestaurant',           limit: 'Once (max)',      impact: 'Medium', impactColor: 'text-yellow-600', impactBg: 'bg-yellow-50' },
]

export default function Step4Retention({ onNext, onBack }: StepProps) {
  const { onboarding, setOnboardingField } = useDashboardStore()
  const { tiers, decayRule } = onboarding

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)]">
      {/* ── Left sidebar ── */}
      <div className="w-72 xl:w-80 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 px-8 py-10 flex flex-col">
        <p className="text-xs font-bold text-brand-600 tracking-widest uppercase mb-3">Step 4 of 5</p>
        <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-3 tracking-tight">
          Keep customers coming back
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          Retention rules help customers maintain their level each month and enjoy ongoing benefits.
        </p>

        <div>
          <p className="text-[11px] font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-600 inline-block" />
            Why retention matters
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield,      color: 'text-brand-600',   bg: 'bg-brand-50',   title: 'Protect level value',       desc: "Customers don't want to lose the benefits they've earned." },
              { icon: RefreshCcw,  color: 'text-blue-600',    bg: 'bg-blue-50',    title: 'Drive repeat visits',       desc: 'Simple rules encourage customers to engage regularly.' },
              { icon: TrendingUp,  color: 'text-green-600',   bg: 'bg-green-50',   title: 'Increase lifetime value',   desc: 'Retained customers spend more and stay longer.' },
            ].map(item => (
              <div key={item.title} className="flex gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                  <item.icon size={14} className={item.color} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">{item.title}</p>
                  <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example journey */}
        <div className="mt-8 rounded-xl bg-gold-50 border border-gold-100 p-4">
          <p className="text-[10px] font-bold text-gold-600 uppercase tracking-wider mb-3">Example journey</p>
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span className="font-semibold text-neutral-700">Gold Member</span>
              <span className="text-xs text-neutral-400">— this month</span>
            </div>
            {[
              { icon: '✅', label: '1 visit completed', sub: 'Status maintained' },
              { icon: '⚠️', label: 'No activity next month', sub: 'Downgraded to Silver' },
            ].map(step => (
              <div key={step.label} className="flex items-start gap-2 pl-1">
                <span className="text-xs mt-0.5">{step.icon}</span>
                <div>
                  <p className="text-neutral-700 font-medium">{step.label}</p>
                  <p className="text-neutral-400">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 px-8 xl:px-12 py-10 overflow-y-auto flex gap-6">
        <div className="flex-1 max-w-2xl space-y-8">
          {/* Retention method selector */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">Set your retention rules</h3>
            <p className="text-sm text-neutral-400 mb-4">Choose how customers can maintain their level each month.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'visits_activities', emoji: '🔄', label: 'Visits & Activities', desc: 'Allow visits and select activities to retain levels' },
                { id: 'visits_only',       emoji: '📅', label: 'Visits Only',          desc: 'Only visits count towards retention' },
              ].map(opt => (
                <button
                  key={opt.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    opt.id === 'visits_activities'
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-xl mt-0.5">{opt.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">{opt.label}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Retention requirement table */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">1. Retention requirement</h3>
            <p className="text-sm text-neutral-400 mb-4">Customers must complete the required number of visits or activities in a calendar month.</p>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-card">
              <div className="grid grid-cols-[160px_1fr_1fr] bg-neutral-50 px-5 py-3 border-b border-neutral-200">
                <p className="text-xs font-semibold text-neutral-500">Level</p>
                <p className="text-xs font-semibold text-neutral-500">Required to maintain level</p>
                <p className="text-xs font-semibold text-neutral-500">Period</p>
              </div>
              {TIERS.map((tier) => {
                const cfg = TIER_CONFIG[tier]
                const tierState = tiers.find(t => t.tier === tier)!
                return (
                  <div key={tier} className="grid grid-cols-[160px_1fr_1fr] px-5 py-3.5 border-b border-neutral-100 last:border-0 items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: cfg.bgColor }}>
                        {cfg.icon}
                      </span>
                      <span className="text-sm font-semibold text-neutral-800">{cfg.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-neutral-900">{tierState.retentionVisits}</span>
                      <span className="text-xs text-neutral-400">
                        {tierState.retentionVisits === 1 ? 'Visit or Activity' : 'Visits or Activities'}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">Per Month</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">2. Activities that can help retain levels</h3>
            <p className="text-sm text-neutral-400 mb-4">Customers can complete these activities instead of a visit. Some activities have limits.</p>
            <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-card">
              {ACTIVITIES.map((act, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-neutral-100 last:border-0">
                  <div className="w-5 h-5 rounded bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <CheckSquare size={11} className="text-white" />
                  </div>
                  <span className="text-base flex-shrink-0">{act.icon}</span>
                  <p className="text-sm text-neutral-700 flex-1">{act.label}</p>
                  <p className="text-xs text-neutral-400 w-28 flex-shrink-0">{act.limit}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.impactBg} ${act.impactColor}`}>
                    {act.impact} impact
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              ℹ️ Activities are optional and can be completed instead of a visit. Limits prevent repeated actions.
            </p>
          </div>

          {/* What happens if not met */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">3. What happens if requirement is not met</h3>
            <p className="text-sm text-neutral-400 mb-4">Choose how to handle customers who don't meet the retention requirement.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Drop 1 level',     label: 'Drop one level',             desc: 'Move customers down by one level.', badge: 'Recommended' },
                { id: 'Drop multiple',    label: 'Drop multiple',  desc: 'Move to the level that matches their activity.', badge: '' },
                { id: 'Reset to entry',   label: 'Reset to Bronze',            desc: 'Move all inactive customers to Bronze.', badge: '' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setOnboardingField('decayRule', opt.id as any)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    decayRule === opt.id ? 'border-brand-600 bg-brand-50' : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <p className="text-xs font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                    {opt.label}
                    {opt.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-brand-600 text-white rounded-full font-bold">
                        {opt.badge}
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-neutral-400 leading-snug">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Grace period */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-neutral-200 bg-white">
              <h4 className="text-sm font-bold text-neutral-800 mb-1">4. Grace period</h4>
              <p className="text-xs text-neutral-400 mb-3">Give customers extra time before their level is downgraded.</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-neutral-600 font-medium">Enable grace period</span>
                  <div className="w-11 h-6 bg-brand-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-neutral-500">Grace period</span>
                <input
                  type="number"
                  defaultValue={7}
                  className="w-12 text-sm font-bold text-neutral-900 border border-neutral-200 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-brand-400"
                />
                <span className="text-xs text-neutral-500">Days</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white">
              <h4 className="text-sm font-bold text-neutral-800 mb-1">5. Smart notifications</h4>
              <p className="text-xs text-neutral-400 mb-3">Keep customers informed and engaged.</p>
              <div className="space-y-2">
                {[
                  'Notify when close to losing level',
                  'Notify before downgrade',
                  'Notify after downgrade',
                ].map(notif => (
                  <label key={notif} className="flex items-center gap-2 cursor-pointer">
                    <div className="w-4 h-4 rounded bg-brand-600 flex items-center justify-center flex-shrink-0">
                      <CheckSquare size={10} className="text-white" />
                    </div>
                    <span className="text-xs text-neutral-600">{notif}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Live preview & retention strength ── */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <div>
            <p className="text-xs font-bold text-neutral-700 mb-1">Live customer preview</p>
            <p className="text-[11px] text-neutral-400 mb-3">This is how it will look in the Ripple app.</p>

            <div className="rounded-3xl bg-neutral-900 p-3 shadow-card-lg">
              <div className="rounded-2xl bg-neutral-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">⭐</span>
                  <div>
                    <p className="text-[11px] font-bold text-white">Gold Status</p>
                    <p className="text-[9px] text-white/40">This month</p>
                  </div>
                </div>
                <p className="text-[10px] text-white/60 mb-1">1 of 1 visits or activities completed</p>
                <div className="h-1.5 rounded-full bg-white/10 mb-3">
                  <div className="h-full rounded-full bg-gold-500 w-full" style={{ backgroundColor: '#D97706' }} />
                </div>
                <p className="text-[9px] text-white/40">Great job! You've maintained your Gold status.</p>
                <div className="mt-3 space-y-1.5">
                  {['15% OFF on all orders', 'Free Dessert on orders ₹100+', 'Priority Seating at all times'].map(b => (
                    <p key={b} className="text-[9px] text-white/60">✓ {b}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Retention strength */}
          <div className="rounded-2xl border border-neutral-200 p-4 bg-white shadow-card">
            <p className="text-xs font-bold text-neutral-700 mb-3 flex items-center gap-1.5">
              <Shield size={13} className="text-green-500" />
              Retention strength
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#22C55E" strokeWidth="3"
                    strokeDasharray={`${92} ${100 - 92}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-black text-neutral-900">92</span>
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-green-600">Excellent</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4].map(s => <span key={s} className="text-yellow-400 text-xs">★</span>)}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {['More repeat visits', 'Higher customer retention', 'Lower customer churn', 'Stronger loyalty and lifetime value'].map(b => (
                <p key={b} className="text-[10px] text-green-600 flex items-center gap-1">
                  <span>+</span>{b}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="fixed bottom-[73px] right-8 flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-2 hover:bg-neutral-100 rounded-xl transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-brand-600/20"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
