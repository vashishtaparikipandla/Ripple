import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Zap, Calendar, Sparkles, Eye, BarChart2, Clock } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import TierBadge from '@/components/TierBadge'
import type { Offer } from '@/lib/mockData'
import { type TierName } from '@/lib/utils'

const TABS = ['All', 'Flash Deals', 'Events', 'Seasonal'] as const
type Tab = typeof TABS[number]

const TYPE_MAP: Record<Offer['type'], Tab> = {
  flash:    'Flash Deals',
  event:    'Events',
  seasonal: 'Seasonal',
}

const STATUS_STYLES: Record<Offer['status'], string> = {
  active:    'bg-green-50 text-green-700',
  scheduled: 'bg-blue-50 text-blue-700',
  expired:   'bg-neutral-100 text-neutral-400',
}

const TYPE_ICONS: Record<Offer['type'], React.ReactNode> = {
  flash:    <Zap size={14} className="text-yellow-500" />,
  event:    <Calendar size={14} className="text-blue-500" />,
  seasonal: <Sparkles size={14} className="text-purple-500" />,
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function OffersPage() {
  const { offers, removeOffer, addOffer } = useDashboardStore()
  const [activeTab, setActiveTab] = useState<Tab>('All')
  const [showCreate, setShowCreate] = useState(false)

  // New offer form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'flash' as Offer['type'],
    discount: 0,
    targetTier: 'all' as TierName | 'all',
  })

  const filtered = offers.filter(o =>
    activeTab === 'All' ? true : TYPE_MAP[o.type] === activeTab
  )

  const handleCreate = () => {
    const now = new Date()
    const end = new Date(now)
    end.setDate(end.getDate() + 7)

    addOffer({
      id: `offer-${Date.now()}`,
      ...form,
      startDate: now,
      endDate: end,
      status: 'active',
      redemptions: 0,
      views: 0,
    })
    setShowCreate(false)
    setForm({ title: '', description: '', type: 'flash', discount: 0, targetTier: 'all' })
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900">Offers & Campaigns</h2>
          <p className="text-sm text-neutral-400 mt-1">Create time-limited deals and seasonal promotions for your Ripple members</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-md shadow-brand-600/20 active:scale-95"
        >
          <Plus size={16} />
          Create Offer
        </button>
      </div>

      {/* ── Stats summary ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active Offers',       value: offers.filter(o => o.status === 'active').length,    color: 'text-green-600',   bg: 'bg-green-50' },
          { label: 'Total Redemptions',   value: offers.reduce((s, o) => s + o.redemptions, 0),       color: 'text-brand-600',   bg: 'bg-brand-50' },
          { label: 'Total Reach',         value: offers.reduce((s, o) => s + o.views, 0),             color: 'text-purple-600',  bg: 'bg-purple-50' },
        ].map(stat => (
          <div key={stat.label} className={`rounded-2xl border border-neutral-200 p-5 shadow-card bg-white`}>
            <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value.toLocaleString()}</p>
            <p className="text-xs text-neutral-500 mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-white text-neutral-900 shadow-card'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Offers Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((offer, i) => (
            <motion.div
              key={offer.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl border border-neutral-200 shadow-card p-5 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center">
                    {TYPE_ICONS[offer.type]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">{offer.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[offer.status]}`}>
                        {offer.status}
                      </span>
                      {offer.discount > 0 && (
                        <span className="text-[10px] font-semibold text-brand-600">{offer.discount}% off</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeOffer(offer.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-neutral-300 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">{offer.description}</p>

              {/* Meta row */}
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                {offer.targetTier !== 'all' ? (
                  <TierBadge tier={offer.targetTier as TierName} size="sm" />
                ) : (
                  <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
                    All tiers
                  </span>
                )}
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                  <Clock size={10} />
                  {formatDate(offer.startDate)} – {formatDate(offer.endDate)}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <Eye size={12} className="text-neutral-400" />
                  <span className="text-xs font-semibold text-neutral-700">{offer.views}</span>
                  <span className="text-[10px] text-neutral-400">views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart2 size={12} className="text-neutral-400" />
                  <span className="text-xs font-semibold text-neutral-700">{offer.redemptions}</span>
                  <span className="text-[10px] text-neutral-400">redemptions</span>
                </div>
                {offer.views > 0 && (
                  <span className="ml-auto text-[10px] font-semibold text-neutral-500">
                    {Math.round(offer.redemptions / offer.views * 100)}% conversion
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Create Offer Modal ── */}
      <AnimatePresence>
        {showCreate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setShowCreate(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-2xl shadow-card-lg w-full max-w-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-extrabold text-neutral-900">Create New Offer</h3>
                  <button onClick={() => setShowCreate(false)} className="text-neutral-400 hover:text-neutral-700">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Title</label>
                    <input
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Flash Friday: Double Loyalty"
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Description</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="What's special about this offer?"
                      rows={3}
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Type</label>
                      <select
                        value={form.type}
                        onChange={e => setForm(f => ({ ...f, type: e.target.value as Offer['type'] }))}
                        className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                      >
                        <option value="flash">Flash Deal</option>
                        <option value="event">Event</option>
                        <option value="seasonal">Seasonal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Discount %</label>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={form.discount}
                        onChange={e => setForm(f => ({ ...f, discount: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1.5">Target Tier</label>
                    <select
                      value={form.targetTier}
                      onChange={e => setForm(f => ({ ...f, targetTier: e.target.value as TierName | 'all' }))}
                      className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                    >
                      <option value="all">All tiers</option>
                      <option value="bronze">Bronze only</option>
                      <option value="silver">Silver only</option>
                      <option value="gold">Gold only</option>
                      <option value="platinum">Platinum only</option>
                      <option value="diamond">Diamond only</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCreate(false)}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-neutral-600 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!form.title}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Create Offer
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
