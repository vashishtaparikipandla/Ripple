import { useState } from 'react'
import { X, Plus, Percent, Star, DollarSign, Sparkles, BarChart2 } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import { TIER_CONFIG, TIERS } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface StepProps {
  onNext: () => void
  onBack: () => void
  isLastStep: boolean
}

const REWARD_STRUCTURES = [
  { id: 'visit_based' as const, icon: Percent,  label: 'Visit based',           badge: 'Popular', desc: '% discount unlocked based on visits' },
  { id: 'visit_spend' as const, icon: BarChart2, label: 'Visit + spend based',  badge: '',         desc: '% discount based on minimum spend' },
  { id: 'fixed'       as const, icon: DollarSign,label: 'Visit based (fixed)',  badge: '',         desc: 'Fixed discount based on visits' },
  { id: 'custom'      as const, icon: Sparkles,  label: 'Custom rewards',       badge: '',         desc: 'Build your own mix of discounts and perks' },
]

const PERK_SUGGESTIONS = [
  'Free Drink', 'Free Dessert', 'Priority Seating', "Chef's Special",
  'Complimentary Starter', 'Birthday Surprise', 'Early Access', 'Exclusive Offers',
]

export default function Step2Rewards({ onNext, onBack }: StepProps) {
  const { onboarding, setTierConfig, setOnboardingField } = useDashboardStore()
  const { tiers, rewardStructure } = onboarding
  const [newPerks, setNewPerks] = useState<Record<string, string>>({})

  const handleDiscountChange = (tier: typeof TIERS[number], raw: string) => {
    const val = Math.max(0, parseInt(raw) || 0)
    setTierConfig(tier, 'discount', val)
  }

  const handleDiscountTypeChange = (tier: typeof TIERS[number], type: 'percentage' | 'fixed') => {
    setTierConfig(tier, 'discountType', type)
  }

  const handleMinPurchaseChange = (tier: typeof TIERS[number], raw: string) => {
    const val = Math.max(0, parseInt(raw) || 0)
    setTierConfig(tier, 'discountMinPurchase', val)
  }

  const addPerk = (tier: typeof TIERS[number], perk: string) => {
    if (!perk.trim()) return
    const current = tiers.find(t => t.tier === tier)?.perks ?? []
    if (!current.includes(perk.trim())) {
      setTierConfig(tier, 'perks', [...current, perk.trim()])
    }
    setNewPerks(p => ({ ...p, [tier]: '' }))
  }

  const removePerk = (tier: typeof TIERS[number], perk: string) => {
    const current = tiers.find(t => t.tier === tier)?.perks ?? []
    setTierConfig(tier, 'perks', current.filter(p => p !== perk))
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)]">
      {/* ── Left sidebar ── */}
      <div className="w-72 xl:w-80 flex-shrink-0 bg-neutral-50 border-r border-neutral-200 px-8 py-10 flex flex-col">
        <p className="text-xs font-bold text-brand-600 tracking-widest uppercase mb-3">Step 2 of 5</p>
        <h2 className="text-2xl font-extrabold text-neutral-900 leading-tight mb-3 tracking-tight">
          Set up rewards your customers will love
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
          Choose a reward template and customize the discounts and perks for each level. You can always adjust these later.
        </p>

        <div>
          <p className="text-[11px] font-bold text-brand-600 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-brand-600 inline-block" />
            Why rewards matter
          </p>
          <div className="space-y-4">
            {[
              { emoji: '⭐', title: 'Better rewards = more visits',    desc: 'The right reward mix drives repeat business and higher spend.' },
              { emoji: '✅', title: 'Make every level exciting',      desc: 'Ensure each level feels better than the last with increasing value.' },
              { emoji: '❤️', title: 'Perks create emotional connection', desc: 'Perks like free items or priority access leave a lasting impression.' },
            ].map(item => (
              <div key={item.title} className="flex gap-3">
                <span className="text-base mt-0.5">{item.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">{item.title}</p>
                  <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative reward icon */}
        <div className="mt-auto flex justify-center pt-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-brand-50 flex items-center justify-center shadow-card-md">
              <Percent size={36} className="text-brand-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shadow-card">
              <Star size={14} className="text-purple-500" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 px-8 xl:px-12 py-10 overflow-y-auto flex gap-6">
        <div className="flex-1 max-w-2xl">
          {/* Reward structure selector */}
          <div className="mb-8">
            <h3 className="font-bold text-neutral-900 mb-1">Choose a rewards structure</h3>
            <p className="text-sm text-neutral-400 mb-4">Select a template that fits your business. You can customize everything.</p>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {REWARD_STRUCTURES.map(({ id, icon: Icon, label, badge, desc }) => (
                <button
                  key={id}
                  onClick={() => setOnboardingField('rewardStructure', id)}
                  className={cn(
                    'flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all',
                    rewardStructure === id
                      ? 'border-brand-600 bg-brand-50'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center mb-2',
                    rewardStructure === id ? 'bg-brand-600' : 'bg-neutral-100'
                  )}>
                    <Icon size={16} className={rewardStructure === id ? 'text-white' : 'text-neutral-500'} />
                  </div>
                  <p className="text-xs font-bold text-neutral-800 leading-tight flex items-center gap-1.5">
                    {label}
                    {badge && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-brand-600 text-white rounded-full font-bold">
                        {badge}
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1 leading-snug">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Customize rewards table */}
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">Customize rewards</h3>
            <p className="text-sm text-neutral-400 mb-4">Set discounts and perks for each level. Rewards increase as customers level up.</p>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden shadow-card">
              {/* Header */}
              <div className="grid grid-cols-[160px_1fr_1fr] bg-neutral-50 px-5 py-3 border-b border-neutral-200">
                <p className="text-xs font-semibold text-neutral-500">Level</p>
                <p className="text-xs font-semibold text-neutral-500">Discount</p>
                <p className="text-xs font-semibold text-neutral-500">Perks <span className="font-normal text-neutral-300">(optional)</span></p>
              </div>

              {TIERS.map((tier) => {
                const cfg = TIER_CONFIG[tier]
                const tierState = tiers.find(t => t.tier === tier)!
                return (
                  <div key={tier} className="grid grid-cols-[160px_1fr_1fr] px-5 py-4 border-b border-neutral-100 last:border-0 items-center gap-4">
                    {/* Level */}
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: cfg.bgColor }}>
                        {cfg.icon}
                      </span>
                      <span className="text-sm font-semibold text-neutral-800">{cfg.label}</span>
                    </div>

                    {/* Discount */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <select
                          value={tierState.discountType}
                          onChange={(e) => handleDiscountTypeChange(tier, e.target.value as 'percentage' | 'fixed')}
                          className="text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-lg px-2 py-1.5 focus:border-brand-500 focus:outline-none"
                        >
                          <option value="percentage">% OFF</option>
                          <option value="fixed">₹ OFF</option>
                        </select>
                        <input
                          type="number"
                          min={0}
                          value={tierState.discount}
                          onChange={(e) => handleDiscountChange(tier, e.target.value)}
                          className="w-16 text-sm font-bold text-neutral-900 border border-neutral-200 rounded-lg px-2 py-1.5 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all"
                        />
                      </div>
                      {tierState.discountType === 'fixed' && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-neutral-500 font-medium">Min spend: ₹</span>
                          <input
                            type="number"
                            min={0}
                            value={tierState.discountMinPurchase}
                            onChange={(e) => handleMinPurchaseChange(tier, e.target.value)}
                            className="w-14 text-xs font-semibold text-neutral-900 border border-neutral-200 rounded px-1.5 py-1 focus:border-brand-500 focus:outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Perks */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {tierState.perks.map((perk) => (
                        <span
                          key={perk}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 group"
                        >
                          {perk}
                          <button
                            onClick={() => removePerk(tier, perk)}
                            className="text-neutral-400 hover:text-red-500 transition-colors ml-0.5"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                      {/* Perk suggestions */}
                      <div className="relative group/perk">
                        <button
                          onClick={() => {
                            const available = PERK_SUGGESTIONS.filter(
                              p => !tierState.perks.includes(p)
                            )
                            if (available.length > 0) addPerk(tier, available[0])
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium border border-dashed border-neutral-300 text-neutral-400 hover:border-brand-400 hover:text-brand-600 transition-colors"
                        >
                          <Plus size={10} />
                          Add perk
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-xs text-neutral-400 mt-3 flex items-center gap-1.5">
              <span className="text-neutral-300">ℹ️</span>
              Discounts will be applied automatically when customers reach the level.
            </p>
          </div>
        </div>

        {/* ── Live preview panel ── */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-0">
            <p className="text-xs font-bold text-neutral-700 mb-1">Live preview</p>
            <p className="text-[11px] text-neutral-400 mb-3">This is how customers will see it</p>

            {/* Phone mockup */}
            <div className="rounded-3xl bg-neutral-900 p-3 shadow-card-lg">
              <div className="rounded-2xl bg-neutral-800 overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between px-4 pt-2 pb-1">
                  <span className="text-[9px] text-white/40 font-medium">9:41</span>
                  <span className="text-[9px] text-white/40">●●●</span>
                </div>
                {/* Header */}
                <div className="px-4 pb-3">
                  <p className="text-[11px] font-bold text-white tracking-widest">RIPPLE REWARDS</p>
                  <p className="text-[9px] text-white/40">Your progress, your rewards</p>
                </div>

                {/* Tier cards */}
                <div className="px-3 pb-3 space-y-1.5">
                  {TIERS.map((tier) => {
                    const cfg = TIER_CONFIG[tier]
                    const tierState = tiers.find(t => t.tier === tier)!
                    return (
                      <div
                        key={tier}
                        className="rounded-xl px-3 py-2"
                        style={{ backgroundColor: `${cfg.color}20` }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{cfg.icon}</span>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-white">{cfg.label}</p>
                            <p className="text-[9px]" style={{ color: cfg.color }}>
                              {tierState.discountType === 'percentage' 
                                ? `${tierState.discount}% OFF` 
                                : `₹${tierState.discount} OFF`
                              }
                            </p>
                          </div>
                        </div>
                        {tierState.perks.length > 0 && (
                          <div className="mt-1 ml-6">
                            {tierState.perks.slice(0, 2).map(p => (
                              <p key={p} className="text-[8px] text-white/50">+ {p}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="px-4 pb-3">
                  <p className="text-[9px] text-white/30 text-center">Keep visiting and unlock better rewards! ✨</p>
                </div>
              </div>
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
