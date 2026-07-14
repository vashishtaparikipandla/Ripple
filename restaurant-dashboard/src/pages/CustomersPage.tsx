import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, ArrowUpDown, Search } from 'lucide-react'
import { mockCustomers, generateHeatmapData } from '@/lib/mockData'
import TierBadge from '@/components/TierBadge'
import { formatCurrency, formatRelativeDate, type TierName } from '@/lib/utils'

type SortKey = 'visits' | 'lastVisit' | 'tier' | 'totalSpend'

const HEATMAP_DATA = generateHeatmapData()
const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function heatColor(value: number): string {
  if (value < 0.2) return '#F3F4F6'
  if (value < 0.4) return '#FDDDD5'
  if (value < 0.6) return '#F78E76'
  if (value < 0.8) return '#F26A4C'
  return '#E8431A'
}

export default function CustomersPage() {
  const [sortKey, setSortKey] = useState<SortKey>('visits')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [search, setSearch] = useState('')

  const churnRisks = mockCustomers.filter(c => c.isChurnRisk)

  const sorted = [...mockCustomers]
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let av: number, bv: number
      if (sortKey === 'visits')     { av = a.visits;     bv = b.visits }
      else if (sortKey === 'lastVisit') { av = a.lastVisit.getTime(); bv = b.lastVisit.getTime() }
      else if (sortKey === 'totalSpend') { av = a.totalSpend; bv = b.totalSpend }
      else { // tier
        const order = { bronze: 0, silver: 1, gold: 2, platinum: 3, diamond: 4 }
        av = order[a.tier]
        bv = order[b.tier]
      }
      return sortDir === 'desc' ? bv - av : av - bv
    })
    .slice(0, 50)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
  }

  return (
    <div className="p-8 max-w-[1400px] space-y-6">
      {/* ── Churn Risk Alerts ── */}
      {churnRisks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={15} className="text-yellow-500" />
            <h3 className="font-bold text-neutral-900 text-sm">
              Churn Risk Alerts
              <span className="ml-2 text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                {churnRisks.length} at risk
              </span>
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mb-4">
            These Gold or Platinum members haven't visited in 28+ days. A gentle nudge could win them back.
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {churnRisks.slice(0, 5).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border-2 border-yellow-200 p-4 min-w-[240px] flex-shrink-0 shadow-card"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover border-2 border-yellow-200" />
                  <div>
                    <p className="text-xs font-bold text-neutral-900">{c.name}</p>
                    <TierBadge tier={c.tier as TierName} size="sm" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-yellow-600 bg-yellow-50 rounded-lg px-2 py-1.5 mb-3">
                  <Clock size={11} />
                  <span className="font-semibold">
                    Last visited {formatRelativeDate(c.lastVisit)}
                  </span>
                </div>
                <button className="w-full py-2 text-xs font-bold text-brand-600 border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors">
                  Send Re-engagement Nudge
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Visit Heatmap ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
        <div className="mb-4">
          <h3 className="font-bold text-neutral-900 text-sm">Visit Frequency Heatmap</h3>
          <p className="text-xs text-neutral-400 mt-0.5">Last 12 weeks — darker = more visits</p>
        </div>
        <div className="flex gap-2">
          {/* Day labels */}
          <div className="flex flex-col gap-1.5 pt-6">
            {DAYS_SHORT.map(d => (
              <span key={d} className="text-[9px] text-neutral-400 font-medium w-4 text-right">{d}</span>
            ))}
          </div>
          {/* Grid */}
          <div className="flex gap-1">
            {Array.from({ length: 12 }, (_, w) => (
              <div key={w} className="flex flex-col gap-1.5">
                <span className="text-[9px] text-neutral-300 font-medium text-center">
                  {w % 2 === 0 ? `W${w + 1}` : ''}
                </span>
                {Array.from({ length: 7 }, (_, d) => {
                  const entry = HEATMAP_DATA.find(e => e.week === w && e.day === d)
                  return (
                    <div
                      key={d}
                      className="w-5 h-5 rounded-sm transition-all hover:ring-2 hover:ring-brand-300 cursor-pointer"
                      style={{ backgroundColor: heatColor(entry?.value ?? 0) }}
                      title={`W${w + 1} ${DAYS_SHORT[d]}: ${Math.round((entry?.value ?? 0) * 60)} visits`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-col justify-end ml-4 gap-1">
            <span className="text-[9px] text-neutral-400">More</span>
            {['#F3F4F6','#FDDDD5','#F78E76','#F26A4C','#E8431A'].map(c => (
              <div key={c} className="w-5 h-5 rounded-sm" style={{ backgroundColor: c }} />
            ))}
            <span className="text-[9px] text-neutral-400">Less</span>
          </div>
        </div>
      </div>

      {/* ── Customer Table ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">All Members</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Showing top 50 by {sortKey}</p>
          </div>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="pl-8 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-brand-400 transition-all w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                {[
                  { label: 'Customer', key: null },
                  { label: 'Tier', key: 'tier' as SortKey },
                  { label: 'Visits', key: 'visits' as SortKey },
                  { label: 'Monthly', key: null },
                  { label: 'Total Spend', key: 'totalSpend' as SortKey },
                  { label: 'Last Visit', key: 'lastVisit' as SortKey },
                ].map(col => (
                  <th
                    key={col.label}
                    className="text-left py-2.5 px-3 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider first:pl-0"
                  >
                    {col.key ? (
                      <button
                        onClick={() => col.key && handleSort(col.key)}
                        className="flex items-center gap-1 hover:text-neutral-700 transition-colors"
                      >
                        {col.label}
                        <ArrowUpDown size={10} className={sortKey === col.key ? 'text-brand-600' : ''} />
                      </button>
                    ) : col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="py-3 px-3 first:pl-0">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-xs font-semibold text-neutral-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <TierBadge tier={c.tier as TierName} size="sm" />
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm font-bold text-neutral-900">{c.visits}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs text-neutral-500">{c.monthlyVisits}/mo</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-semibold text-neutral-700">{formatCurrency(c.totalSpend)}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className={`flex items-center gap-1 text-xs ${c.isChurnRisk ? 'text-yellow-600' : 'text-neutral-400'}`}>
                      {c.isChurnRisk && <AlertTriangle size={10} />}
                      {formatRelativeDate(c.lastVisit)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
