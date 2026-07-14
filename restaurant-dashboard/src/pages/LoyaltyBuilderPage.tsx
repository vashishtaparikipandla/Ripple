import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCcw, ArrowRight, Check } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { TIER_CONFIG, TIERS, type TierName } from '@/lib/utils'

export default function LoyaltyBuilderPage() {
  const { liveTiers, setLiveTier, saveLiveTiers } = useDashboardStore()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveLiveTiers()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900">Loyalty Tiers</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Customise visits required, discounts, and perks for each tier. Changes are applied immediately.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-neutral-600 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <RefreshCcw size={14} />
            Reset defaults
          </button>
          <motion.button
            onClick={handleSave}
            animate={{ backgroundColor: saved ? '#16A34A' : '#E8431A' }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all shadow-md"
          >
            {saved ? <Check size={14} strokeWidth={3} /> : <Save size={14} />}
            {saved ? 'Saved!' : 'Save changes'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* ── Tier editor ── */}
        <div className="space-y-4">
          {TIERS.map((tier) => {
            const cfg = TIER_CONFIG[tier]
            const tierState = liveTiers.find(t => t.tier === tier)!

            return (
              <motion.div
                key={tier}
                layout
                className="bg-white rounded-2xl border border-neutral-200 shadow-card overflow-hidden"
              >
                {/* Tier header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-neutral-100">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: cfg.bgColor }}
                  >
                    {cfg.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-neutral-900">{cfg.label}</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {tierState.visitsRequired} visits required · {tierState.discount}% discount
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
                    >
                      {tierState.discount}% OFF
                    </span>
                  </div>
                </div>

                {/* Tier controls */}
                <div className="px-6 py-5 grid grid-cols-3 gap-6">
                  {/* Visits required */}
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
                      Visits Required
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={tierState.visitsRequired}
                        onChange={(e) => setLiveTier(tier as TierName, 'visitsRequired', parseInt(e.target.value))}
                        className="flex-1 accent-brand-600"
                      />
                      <span className="text-sm font-bold text-neutral-900 w-8 text-center">
                        {tierState.visitsRequired}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Total visits to unlock this tier</p>
                  </div>

                  {/* Discount % */}
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
                      Discount %
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={50}
                        value={tierState.discount}
                        onChange={(e) => setLiveTier(tier as TierName, 'discount', parseInt(e.target.value))}
                        className="flex-1 accent-brand-600"
                      />
                      <span className="text-sm font-bold text-neutral-900 w-8 text-center">
                        {tierState.discount}%
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Discount applied at this tier</p>
                  </div>

                  {/* Monthly retention */}
                  <div>
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
                      Monthly Retention
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={8}
                        value={tierState.retentionVisits}
                        onChange={(e) => setLiveTier(tier as TierName, 'retentionVisits', parseInt(e.target.value))}
                        className="flex-1 accent-brand-600"
                      />
                      <span className="text-sm font-bold text-neutral-900 w-8 text-center">
                        {tierState.retentionVisits}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">Visits/month to keep this tier</p>
                  </div>
                </div>

                {/* Perks */}
                <div className="px-6 pb-5">
                  <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Perks</p>
                  <div className="flex flex-wrap gap-2">
                    {tierState.perks.map(perk => (
                      <span
                        key={perk}
                        className="px-3 py-1 rounded-full text-xs font-medium border"
                        style={{ borderColor: cfg.color + '40', backgroundColor: cfg.bgColor, color: cfg.color }}
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Live Preview ── */}
        <div className="sticky top-6">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6 mb-4">
            <h3 className="font-bold text-neutral-900 text-sm mb-1">Customer Journey Preview</h3>
            <p className="text-xs text-neutral-400 mb-5">How a customer sees their progression</p>

            <div className="space-y-3">
              {TIERS.map((tier, i) => {
                const cfg = TIER_CONFIG[tier]
                const tierState = liveTiers.find(t => t.tier === tier)!
                return (
                  <div key={tier}>
                    <div
                      className="rounded-xl p-3 flex items-center gap-3"
                      style={{ backgroundColor: cfg.bgColor }}
                    >
                      <span className="text-xl">{cfg.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label}</p>
                          <p className="text-sm font-extrabold" style={{ color: cfg.color }}>{tierState.discount}% OFF</p>
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-0.5">
                          {tierState.visitsRequired} visit{tierState.visitsRequired > 1 ? 's' : ''} to reach
                        </p>
                      </div>
                    </div>
                    {i < TIERS.length - 1 && (
                      <div className="flex justify-center my-1">
                        <ArrowRight size={14} className="text-neutral-200 rotate-90" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-5">
            <h3 className="font-bold text-neutral-900 text-sm mb-4">Program Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Total members', value: '150' },
                { label: 'Avg visits to Platinum', value: `${liveTiers[3]?.visitsRequired ?? 7}` },
                { label: 'Max discount offered', value: `${liveTiers[3]?.discount ?? 20}%` },
                { label: 'Avg discount across tiers', value: `${Math.round(liveTiers.reduce((s, t) => s + t.discount, 0) / 4)}%` },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-1 border-b border-neutral-50 last:border-0">
                  <span className="text-xs text-neutral-500">{row.label}</span>
                  <span className="text-sm font-bold text-neutral-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
