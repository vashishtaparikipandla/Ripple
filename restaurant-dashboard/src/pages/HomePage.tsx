import { Users, TrendingUp, DollarSign, Activity, ArrowRight, Clock } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { motion } from 'framer-motion'
import StatCard from '@/components/StatCard'
import TierBadge from '@/components/TierBadge'
import { kpiSummary, visitSeries, mockCustomers, tierCounts, recentActivity } from '@/lib/mockData'
import { formatCurrency, formatRelativeDate, TIER_CONFIG, type TierName } from '@/lib/utils'

const TIER_PIE_DATA = [
  { name: 'Bronze',   value: tierCounts.bronze,   color: '#B45309' },
  { name: 'Silver',   value: tierCounts.silver,   color: '#64748B' },
  { name: 'Gold',     value: tierCounts.gold,     color: '#D97706' },
  { name: 'Platinum', value: tierCounts.platinum, color: '#7C3AED' },
  { name: 'Diamond',  value: tierCounts.diamond,  color: '#0284C7' },
]

const TOP_CUSTOMERS = mockCustomers
  .filter(c => c.tier === 'diamond' || c.tier === 'platinum' || c.tier === 'gold')
  .sort((a, b) => b.visits - a.visits)
  .slice(0, 6)

const ACTIVITY_COLORS: Record<string, string> = {
  visit:      'bg-brand-50 text-brand-600',
  tier_up:    'bg-gold-50 text-gold-600',
  redemption: 'bg-purple-50 text-purple-600',
  new_member: 'bg-green-50 text-green-600',
}

const ACTIVITY_ICONS: Record<string, string> = {
  visit:      '🍽️',
  tier_up:    '⬆️',
  redemption: '🎁',
  new_member: '👋',
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function formatTimestamp(date: Date) {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  return `${Math.floor(mins / 60)}h ago`
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{value: number}>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-neutral-200 rounded-xl px-3 py-2 shadow-card-md">
        <p className="text-xs font-semibold text-neutral-700">{label}</p>
        <p className="text-sm font-bold text-brand-600">{payload[0].value} visits</p>
      </div>
    )
  }
  return null
}

export default function HomePage() {
  return (
    <div className="p-8 space-y-6 max-w-[1400px]">
      {/* ── KPI Cards ── */}
      <motion.div
        className="grid grid-cols-2 xl:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {[
          {
            label: 'Active Ripple Members',
            value: kpiSummary.activeMembers.toLocaleString(),
            delta: 12,
            icon: Users,
            iconColor: 'text-brand-600',
            iconBg: 'bg-brand-50',
          },
          {
            label: 'Visits Today',
            value: kpiSummary.visitsToday,
            delta: 8,
            icon: Activity,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-50',
          },
          {
            label: 'Revenue Influenced',
            value: formatCurrency(kpiSummary.revenueInfluenced),
            delta: 23,
            icon: DollarSign,
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-50',
          },
          {
            label: 'Retention Rate',
            value: `${kpiSummary.retentionRate}%`,
            delta: 5,
            icon: TrendingUp,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-50',
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
          >
            <StatCard {...card} deltaLabel="vs last week" />
          </motion.div>
        ))}
      </motion.div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-[1fr_300px] gap-4">
        {/* Visit Trend */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Visit Trend</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Last 30 days</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />
              Visits
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={visitSeries} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#E8431A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E8431A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
                tickFormatter={formatDate}
                interval={4}
              />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#E8431A"
                strokeWidth={2}
                fill="url(#visitGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Breakdown */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <div className="mb-4">
            <h3 className="font-bold text-neutral-900 text-sm">Tier Breakdown</h3>
            <p className="text-xs text-neutral-400 mt-0.5">{kpiSummary.activeMembers} total members</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={TIER_PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={3}
                dataKey="value"
              >
                {TIER_PIE_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {TIER_PIE_DATA.map(entry => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-neutral-600">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{entry.value}</span>
                  <span className="text-[10px] text-neutral-400">
                    ({Math.round(entry.value / kpiSummary.activeMembers * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Top Members + Activity Feed ── */}
      <div className="grid grid-cols-[1fr_320px] gap-4">
        {/* Top Members */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Top Ripple Members</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Gold & Platinum tier customers</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-brand-600 font-semibold hover:text-brand-700 transition-colors">
              View all <ArrowRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  {['Customer', 'Tier', 'Visits', 'Total Spend', 'Last Visit'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider first:pl-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_CUSTOMERS.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors group"
                  >
                    <td className="py-3 px-3 first:pl-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-semibold text-neutral-900">{c.name}</p>
                          <p className="text-[10px] text-neutral-400">{c.email.split('@')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <TierBadge tier={c.tier as TierName} size="sm" />
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-sm font-bold text-neutral-900">{c.visits}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-semibold text-neutral-700">
                        {formatCurrency(c.totalSpend)}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <Clock size={10} />
                        {formatRelativeDate(c.lastVisit)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-neutral-900 text-sm">Recent Activity</h3>
            <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
              Live
            </span>
          </div>

          <div className="space-y-3">
            {recentActivity.map((act, i) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="relative">
                  <img src={act.customerAvatar} alt={act.customerName} className="w-8 h-8 rounded-full object-cover" />
                  <span
                    className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] ${ACTIVITY_COLORS[act.type]}`}
                    style={{ width: 16, height: 16 }}
                  >
                    {ACTIVITY_ICONS[act.type]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-900 truncate">{act.customerName}</p>
                  <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">{act.description}</p>
                </div>
                <span className="text-[10px] text-neutral-300 flex-shrink-0">{formatTimestamp(act.timestamp)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
