import type { TierName } from './utils'

/* ─── Types ───────────────────────────────────────────────── */
export interface Customer {
  id: string
  name: string
  avatar: string
  email: string
  tier: TierName
  visits: number
  lastVisit: Date
  joinedAt: Date
  totalSpend: number
  monthlyVisits: number
  isChurnRisk: boolean
}

export interface DayVisit {
  date: string        // 'YYYY-MM-DD'
  visits: number
  revenue: number
}

export interface Offer {
  id: string
  type: 'flash' | 'event' | 'seasonal'
  title: string
  description: string
  discount: number
  targetTier: TierName | 'all'
  startDate: Date
  endDate: Date
  status: 'active' | 'scheduled' | 'expired'
  redemptions: number
  views: number
}

export interface CommunityPost {
  id: string
  customerId: string
  customerName: string
  customerTier: TierName
  customerAvatar: string
  imageUrl: string
  caption: string
  postedAt: Date
  status: 'pending' | 'approved' | 'flagged'
  likes: number
}

export interface RecentActivity {
  id: string
  type: 'visit' | 'tier_up' | 'redemption' | 'new_member'
  customerName: string
  customerAvatar: string
  tier: TierName
  description: string
  timestamp: Date
}

/* ─── Seed helpers ────────────────────────────────────────── */
const FIRST_NAMES = [
  'Arjun','Priya','Rahul','Sneha','Vikram','Ananya','Rohan','Kavya',
  'Aditya','Pooja','Siddharth','Meera','Karthik','Divya','Nikhil',
  'Shreya','Rajesh','Sunita','Amit','Nisha','Dev','Tanya','Suresh','Anjali',
  'Manish','Rekha','Gaurav','Swati','Varun','Deepika','Tarun','Lavanya',
  'Sachin','Bhavna','Sanjay','Ritu','Akash','Puja','Vivek','Suma',
]
const LAST_NAMES = [
  'Mehta','Sharma','Patel','Gupta','Iyer','Nair','Singh','Reddy',
  'Verma','Joshi','Chopra','Malhotra','Kapoor','Rao','Krishnan',
  'Pillai','Sinha','Mishra','Banerjee','Das','Chatterjee','Bose',
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}


function daysBack(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

/* ─── Customers ───────────────────────────────────────────── */
function generateCustomers(): Customer[] {
  const customers: Customer[] = []
  const tierDist: TierName[] = [
    ...Array(70).fill('bronze'),
    ...Array(40).fill('silver'),
    ...Array(25).fill('gold'),
    ...Array(10).fill('platinum'),
    ...Array(5).fill('diamond'),
  ]

  for (let i = 0; i < 150; i++) {
    const r = seededRandom(i * 7)
    const tier = tierDist[i % tierDist.length] as TierName
    const visitMap: Record<TierName, [number, number]> = {
      bronze:   [1,  5],
      silver:   [3,  10],
      gold:     [6,  18],
      platinum: [12, 35],
      diamond:  [20, 50],
    }
    const [minV, maxV] = visitMap[tier]
    const visits = Math.floor(minV + r * (maxV - minV))
    const lastVisitDays = Math.floor(seededRandom(i * 13) * 60)
    const isChurnRisk = (tier === 'gold' || tier === 'platinum' || tier === 'diamond') && lastVisitDays > 28
    const fn = FIRST_NAMES[i % FIRST_NAMES.length]
    const ln = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]
    const name = `${fn} ${ln}`

    customers.push({
      id: `cust-${i + 1}`,
      name,
      avatar: `https://i.pravatar.cc/48?img=${(i % 70) + 1}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@email.com`,
      tier,
      visits,
      lastVisit: daysBack(lastVisitDays),
      joinedAt: daysBack(Math.floor(30 + seededRandom(i * 19) * 300)),
      totalSpend: Math.floor(visits * (280 + seededRandom(i * 3) * 400)),
      monthlyVisits: Math.floor(seededRandom(i * 11) * 4),
      isChurnRisk,
    })
  }
  return customers
}

export const mockCustomers = generateCustomers()

/* ─── Tier Counts ─────────────────────────────────────────── */
export const tierCounts = {
  bronze:   mockCustomers.filter(c => c.tier === 'bronze').length,
  silver:   mockCustomers.filter(c => c.tier === 'silver').length,
  gold:     mockCustomers.filter(c => c.tier === 'gold').length,
  platinum: mockCustomers.filter(c => c.tier === 'platinum').length,
  diamond:  mockCustomers.filter(c => c.tier === 'diamond').length,
}

/* ─── Visit time series (last 30 days) ──────────────────────── */
export function generateVisitSeries(days = 30): DayVisit[] {
  const series: DayVisit[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = daysBack(i)
    const label = d.toISOString().slice(0, 10)
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const base = isWeekend ? 52 : 35
    const r = seededRandom(i * 17)
    const visits = Math.floor(base + r * 30)
    series.push({
      date: label,
      visits,
      revenue: visits * Math.floor(280 + seededRandom(i * 3) * 150),
    })
  }
  return series
}

export const visitSeries = generateVisitSeries(30)

/* ─── KPI summary ─────────────────────────────────────────── */
export const kpiSummary = {
  activeMembers: mockCustomers.length,
  visitsToday: 38,
  revenueInfluenced: visitSeries.reduce((s, d) => s + d.revenue, 0),
  retentionRate: 71,
  avgTierScore: 2.1,   // weighted average 1–4
  churnRisks: mockCustomers.filter(c => c.isChurnRisk).length,
}

/* ─── Offers ──────────────────────────────────────────────── */
export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    type: 'flash',
    title: '🔥 Flash Friday: Double Loyalty',
    description: 'Visit on Friday and count it as two visits for tier progression.',
    discount: 0,
    targetTier: 'all',
    startDate: daysBack(-1),
    endDate: daysBack(-2),
    status: 'active',
    redemptions: 24,
    views: 189,
  },
  {
    id: 'offer-2',
    type: 'flash',
    title: 'Gold Member Appreciation',
    description: '25% off on all orders above ₹500 for Gold members this week.',
    discount: 25,
    targetTier: 'gold',
    startDate: daysBack(0),
    endDate: daysBack(-5),
    status: 'active',
    redemptions: 11,
    views: 73,
  },
  {
    id: 'offer-3',
    type: 'event',
    title: 'Monsoon Feast Night',
    description: 'Special 6-course set menu at ₹999 only for Silver+ members.',
    discount: 0,
    targetTier: 'silver',
    startDate: daysBack(-7),
    endDate: daysBack(-8),
    status: 'scheduled',
    redemptions: 0,
    views: 44,
  },
  {
    id: 'offer-4',
    type: 'seasonal',
    title: 'Diwali Loyalty Bonus',
    description: 'Earn 3x tier progress on every visit during Diwali week.',
    discount: 0,
    targetTier: 'all',
    startDate: daysBack(45),
    endDate: daysBack(38),
    status: 'expired',
    redemptions: 98,
    views: 512,
  },
  {
    id: 'offer-5',
    type: 'flash',
    title: 'New Year Platinum Special',
    description: 'Platinum members get a free bottle of wine on NY Eve.',
    discount: 0,
    targetTier: 'platinum',
    startDate: daysBack(15),
    endDate: daysBack(14),
    status: 'expired',
    redemptions: 7,
    views: 28,
  },
]

/* ─── Community posts ─────────────────────────────────────── */
const POST_CAPTIONS = [
  'Amazing butter chicken! Came back for my 5th visit 🍛',
  'Can\'t get enough of this place. Gold member and loving it!',
  'The ambiance is just perfect. Highly recommend the biryani 🌟',
  'Birthday dinner here was absolutely magical ✨',
  'My go-to spot every Friday evening. Best dals in the city!',
  'Finally hit Platinum! The chef\'s special was worth every visit 👑',
  'Family lunch tradition — we\'ve been coming here for 3 years now',
  'The paneer tikka here is unreal. Never disappoints 🔥',
  'Celebrating our anniversary. They remembered our preferences!',
  'Quick lunch but always feels like a treat. The team is so warm.',
  'Just unlocked Silver! The free drink perk is awesome 🥈',
  'Date night done right. Ripple rewards make it even sweeter',
]

const POST_IMAGES = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=75',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=75',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=75',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=75',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=75',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=75',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=75',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=75',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=75',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=75',
]

const POST_STATUSES: Array<'pending' | 'approved' | 'flagged'> = [
  'pending','pending','pending','approved','approved','approved','approved','approved','approved','pending','pending','flagged',
]

export const mockCommunityPosts: CommunityPost[] = Array.from({ length: 12 }, (_, i) => {
  const customer = mockCustomers[i * 10]
  return {
    id: `post-${i + 1}`,
    customerId: customer.id,
    customerName: customer.name,
    customerTier: customer.tier,
    customerAvatar: customer.avatar,
    imageUrl: POST_IMAGES[i],
    caption: POST_CAPTIONS[i],
    postedAt: daysBack(Math.floor(seededRandom(i * 5) * 14)),
    status: POST_STATUSES[i],
    likes: Math.floor(seededRandom(i * 7) * 40 + 3),
  }
})

/* ─── Recent activity feed ────────────────────────────────── */
export const recentActivity: RecentActivity[] = [
  {
    id: 'act-1', type: 'tier_up', customerName: 'Priya Sharma',
    customerAvatar: 'https://i.pravatar.cc/36?img=5',
    tier: 'gold', description: 'Upgraded to Gold tier 🎉',
    timestamp: new Date(Date.now() - 12 * 60000),
  },
  {
    id: 'act-2', type: 'visit', customerName: 'Rohan Patel',
    customerAvatar: 'https://i.pravatar.cc/36?img=8',
    tier: 'silver', description: 'Visited — 2 visits to Gold',
    timestamp: new Date(Date.now() - 28 * 60000),
  },
  {
    id: 'act-3', type: 'new_member', customerName: 'Sneha Iyer',
    customerAvatar: 'https://i.pravatar.cc/36?img=12',
    tier: 'bronze', description: 'Joined Ripple as a Bronze member',
    timestamp: new Date(Date.now() - 45 * 60000),
  },
  {
    id: 'act-4', type: 'redemption', customerName: 'Vikram Gupta',
    customerAvatar: 'https://i.pravatar.cc/36?img=15',
    tier: 'platinum', description: 'Redeemed 30% Platinum discount',
    timestamp: new Date(Date.now() - 72 * 60000),
  },
  {
    id: 'act-5', type: 'visit', customerName: 'Ananya Nair',
    customerAvatar: 'https://i.pravatar.cc/36?img=20',
    tier: 'bronze', description: 'First visit — welcomed to Ripple!',
    timestamp: new Date(Date.now() - 95 * 60000),
  },
  {
    id: 'act-6', type: 'tier_up', customerName: 'Karthik Singh',
    customerAvatar: 'https://i.pravatar.cc/36?img=25',
    tier: 'platinum', description: 'Reached Platinum status!',
    timestamp: new Date(Date.now() - 130 * 60000),
  },
]

/* ─── Heatmap data (12 weeks) ────────────────────────────── */
export function generateHeatmapData(): Array<{ week: number; day: number; value: number }> {
  const data = []
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      const r = seededRandom(w * 7 + d)
      const isWeekend = d === 0 || d === 6
      const base = isWeekend ? 0.6 : 0.35
      data.push({ week: w, day: d, value: Math.min(1, base + r * 0.55) })
    }
  }
  return data
}
