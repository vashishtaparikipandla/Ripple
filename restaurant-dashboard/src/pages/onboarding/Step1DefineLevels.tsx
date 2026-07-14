import { Minus, Plus, Info, TrendingUp, Gift, Shield } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { TIER_CONFIG, TIERS } from '@/lib/utils'

interface StepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
}

const WHY_ITEMS = [
  { icon: TrendingUp, color: 'text-brand-600', bg: 'bg-brand-50',   title: 'Drives more visits',      desc: 'Clear progression encourages customers to keep coming back.' },
  { icon: Gift,       color: 'text-purple-600',bg: 'bg-purple-50',  title: 'Increases engagement',    desc: 'Unlocking new levels creates excitement and builds habit.' },
  { icon: Shield,     color: 'text-green-600', bg: 'bg-green-50',   title: 'Strengthens loyalty',     desc: 'Retention rules help protect the value of your program.' },
]

export default function Step1DefineLevels({ onNext, onBack }: StepProps) {
  const { onboarding, setTierConfig, setOnboardingField } = useDashboardStore()
  const { tiers, qualificationPeriod } = onboarding

  const updateVisits = (tier: typeof TIERS[number], delta: number) => {
    const current = tiers.find(t => t.tier === tier)?.visitsRequired ?? 1
    const next = Math.max(1, Math.min(20, current + delta))
    setTierConfig(tier, 'visitsRequired', next)
  }

  const updateRetention = (tier: typeof TIERS[number], delta: number) => {
    const current = tiers.find(t => t.tier === tier)?.retentionVisits ?? 1
    const next = Math.max(0, Math.min(10, current + delta))
    setTierConfig(tier, 'retentionVisits', next)
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)]">
      {/* ── Left sidebar ── */}
      <div className="w-72 xl:w-80 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 px-8 py-10 flex flex-col">
        <p className="text-xs font-bold text-brand-600 tracking-widest uppercase mb-3">Step 1 of 5</p>
        <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-3 tracking-tight">
          Define your loyalty levels
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          Build a level structure that motivates customers to visit more often and stay loyal to your restaurant.
        </p>

        {/* Why this matters */}
        <div className="mb-8">
          <p className="text-[11px] font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-600 inline-block" />
            Why this matters
          </p>
          <div className="space-y-4">
            {WHY_ITEMS.map((item) => (
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

        {/* Tier pedestals illustration */}
        <div className="mt-auto flex items-end justify-center gap-3 h-32">
          {TIERS.map((tier, i) => {
            const heights = [48, 64, 80, 96, 112]
            const cfg = TIER_CONFIG[tier]
            return (
              <div key={tier} className="flex flex-col items-center gap-1.5">
                <span className="text-lg">{cfg.icon}</span>
                <div
                  className="w-12 rounded-t-lg flex items-end justify-center pb-1.5"
                  style={{
                    height: heights[i],
                    backgroundColor: cfg.bgColor,
                    border: `1px solid ${cfg.color}30`,
                  }}
                >
                  <p className="text-[9px] font-bold" style={{ color: cfg.color }}>
                    {cfg.minVisits}v
                  </p>
                </div>
                <p className="text-[9px] font-semibold text-neutral-400 uppercase">{cfg.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 px-8 xl:px-12 py-10 overflow-y-auto flex gap-6">
        <div className="flex-1 max-w-2xl">
          {/* Method selector */}
          <div className="mb-8">
            <h3 className="font-bold text-neutral-900 mb-4">Choose how to create your levels</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-start gap-3 p-4 rounded-xl border-2 border-brand-600 bg-brand-50 text-left">
                <TrendingUp size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-brand-700">Define your own levels</p>
                  <p className="text-xs text-brand-500 mt-0.5">Customize levels, visits, and retention</p>
                </div>
              </button>
              <button className="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 bg-white text-left hover:border-neutral-300 transition-colors">
                <span className="text-lg mt-0.5">⭐</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-700">Use a template</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Choose from proven templates</p>
                </div>
              </button>
            </div>
          </div>

          {/* Section 1 — Qualification Period */}
          <div className="mb-8">
            <h3 className="font-bold text-neutral-900 mb-1">1. Choose your qualification period</h3>
            <p className="text-sm text-neutral-400 mb-4">How often do visits reset or decay?</p>
            <select 
              value={qualificationPeriod}
              onChange={(e) => setOnboardingField('qualificationPeriod', e.target.value as any)}
              className="w-full max-w-sm px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-900 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
            >
              <option value="Monthly">Monthly</option>
              <option value="Every 2 Months">Every 2 Months</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Semi-Annual">Semi-Annual</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          {/* Section 2 — Configure progression */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">2. Configure level progression &amp; retention</h3>
            <p className="text-sm text-neutral-400 mb-4">Set the number of visits required to reach and maintain each level.</p>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-card">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-0 bg-neutral-50 px-5 py-3 border-b border-neutral-200">
                <p className="text-xs font-semibold text-neutral-500">Level</p>
                <p className="text-xs font-semibold text-neutral-500 w-52 text-center flex items-center gap-1">
                  Visits required to reach this level
                  <span className="text-neutral-300"><Info size={11} /></span>
                  <span className="text-neutral-400 font-normal">(Total visits)</span>
                </p>
                <p className="text-xs font-semibold text-neutral-500 w-52 text-center flex items-center gap-1 ml-4">
                  Visits per month to maintain this level
                  <span className="text-neutral-300"><Info size={11} /></span>
                </p>
              </div>

              {/* Tier rows */}
              {TIERS.map((tier) => {
                const cfg = TIER_CONFIG[tier]
                const tierState = tiers.find(t => t.tier === tier)!
                return (
                  <div
                    key={tier}
                    className="grid grid-cols-[1fr_auto_auto] gap-0 px-5 py-4 border-b border-neutral-100 last:border-0 items-center hover:bg-neutral-50/50 transition-colors"
                  >
                    {/* Tier label */}
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: cfg.bgColor }}
                      >
                        {cfg.icon}
                      </span>
                      <span className="text-sm font-semibold text-neutral-800">{cfg.label}</span>
                    </div>

                    {/* Visits required */}
                    <div className="flex items-center gap-2 w-52 justify-center">
                      <button
                        onClick={() => updateVisits(tier, -1)}
                        className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Minus size={11} className="text-neutral-500" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-neutral-900">
                        {tierState.visitsRequired}
                      </span>
                      <button
                        onClick={() => updateVisits(tier, 1)}
                        className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Plus size={11} className="text-neutral-500" />
                      </button>
                      <span className="text-xs text-neutral-400 ml-1">
                        {tierState.visitsRequired === 1 ? 'visit' : 'visits'}
                      </span>
                    </div>

                    {/* Retention visits */}
                    <div className="flex items-center gap-2 w-52 justify-center ml-4">
                      <button
                        onClick={() => updateRetention(tier, -1)}
                        className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Minus size={11} className="text-neutral-500" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-neutral-900">
                        {tierState.retentionVisits}
                      </span>
                      <button
                        onClick={() => updateRetention(tier, 1)}
                        className="w-7 h-7 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                      >
                        <Plus size={11} className="text-neutral-500" />
                      </button>
                      <span className="text-xs text-neutral-400 ml-1">
                        {tierState.retentionVisits === 1 ? 'visit' : 'visits'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-neutral-400 mt-3 flex items-center gap-1.5">
              <span className="text-neutral-300">🔒</span>
              Customers must complete the required visits in the selected period ({qualificationPeriod.toLowerCase()}) to maintain their level.
            </p>
          </div>
        </div>

        {/* ── Right tips panel ── */}
        <div className="w-64 flex-shrink-0">
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
              <p className="text-xs font-bold text-blue-700">Tips for setting the right visits</p>
            </div>
            <ul className="space-y-3">
              {[
                'Keep early levels easy to reach (1–2 visits) to get customers started.',
                'Increase gradually for higher levels to maintain excitement.',
                'Platinum should feel rewarding but achievable for your best customers.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 text-xs">✓</span>
                  <p className="text-xs text-blue-600 leading-snug">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Navigation buttons ── */}
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
