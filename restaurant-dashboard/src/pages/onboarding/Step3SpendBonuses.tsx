import { TrendingUp, Zap, Gift } from 'lucide-react'
import { TIER_CONFIG, TIERS } from '@/lib/utils'

interface StepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
}

import { useDashboardStore } from '@/store/dashboardStore'

export default function Step3SpendBonuses({ onNext, onBack }: StepProps) {
  const { onboarding, setTierConfig } = useDashboardStore()
  const { tiers } = onboarding

  const handleThresholdChange = (tier: typeof TIERS[number], raw: string) => {
    const val = Math.max(0, parseInt(raw) || 0)
    setTierConfig(tier, 'spendBonusThreshold', val)
  }

  const handleBonusChange = (tier: typeof TIERS[number], raw: string) => {
    const val = Math.max(0, parseInt(raw) || 0)
    setTierConfig(tier, 'spendBonusDiscount', val)
  }
  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)]">
      {/* ── Left sidebar ── */}
      <div className="w-72 xl:w-80 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 px-8 py-10 flex flex-col">
        <p className="text-xs font-bold text-brand-600 tracking-widest uppercase mb-3">Step 3 of 5</p>
        <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-3 tracking-tight">
          Reward bigger spends with bonuses
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          Spend bonuses give customers an extra incentive to order more on each visit.
          They unlock automatically when a spend threshold is met.
        </p>

        <div>
          <p className="text-[11px] font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-600 inline-block" />
            Why spend bonuses work
          </p>
          <div className="space-y-4">
            {[
              { icon: TrendingUp, color: 'text-brand-600', bg: 'bg-brand-50',   title: 'Increases average order value', desc: 'Customers spend more to unlock their spend bonus.' },
              { icon: Zap,        color: 'text-yellow-600',bg: 'bg-yellow-50',  title: 'Instant gratification',         desc: 'Unlike tier upgrades, spend bonuses reward the current visit.' },
              { icon: Gift,       color: 'text-purple-600',bg: 'bg-purple-50',  title: 'Compound loyalty',              desc: 'Combined with tier rewards, spend bonuses create powerful value.' },
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

        {/* Illustration */}
        <div className="mt-auto pt-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center">
              <span className="text-3xl">💰</span>
            </div>
            <div className="absolute -top-1 -right-2 w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center shadow-card">
              <Zap size={14} className="text-yellow-500" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 px-8 xl:px-12 py-10 overflow-y-auto">
        <div className="max-w-2xl">
          <h3 className="font-bold text-neutral-900 mb-1">Configure spend bonuses per tier</h3>
          <p className="text-sm text-neutral-400 mb-6">
            When a customer spends above the threshold on a single visit, they unlock an extra bonus on top of their tier discount.
          </p>

          <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-card mb-6">
            <div className="grid grid-cols-[160px_1fr_1fr] bg-neutral-50 px-5 py-3 border-b border-neutral-200">
              <p className="text-xs font-semibold text-neutral-500">Level</p>
              <p className="text-xs font-semibold text-neutral-500">Minimum spend</p>
              <p className="text-xs font-semibold text-neutral-500">Bonus reward</p>
            </div>

            {TIERS.map((tier) => {
              const cfg = TIER_CONFIG[tier]
              const tierState = tiers.find(t => t.tier === tier)!
              return (
                <div key={tier} className="grid grid-cols-[160px_1fr_1fr] px-5 py-4 border-b border-neutral-100 last:border-0 items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: cfg.bgColor }}>
                      {cfg.icon}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800">{cfg.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 font-medium">Spend</span>
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                      <span className="px-2 text-xs text-neutral-400 bg-neutral-50 border-r border-neutral-200 py-1.5">₹</span>
                      <input
                        type="number"
                        min={0}
                        value={tierState.spendBonusThreshold}
                        onChange={(e) => handleThresholdChange(tier, e.target.value)}
                        className="w-16 text-sm font-bold text-neutral-900 px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-brand-400 transition-all"
                      />
                    </div>
                    <span className="text-xs text-neutral-400 font-medium">+</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Get</span>
                    <input
                      type="number"
                      min={0}
                      value={tierState.spendBonusDiscount}
                      onChange={(e) => handleBonusChange(tier, e.target.value)}
                      className="w-12 text-sm font-bold text-neutral-900 border border-neutral-200 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-brand-400 transition-all"
                    />
                    <span className="text-xs text-neutral-400">% extra discount</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Enable/disable toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div>
              <p className="text-sm font-semibold text-neutral-800">Enable spend bonuses</p>
              <p className="text-xs text-neutral-400 mt-0.5">Turn on to activate spend-based bonus rewards for all tiers</p>
            </div>
            <div className="w-11 h-6 bg-brand-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
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
