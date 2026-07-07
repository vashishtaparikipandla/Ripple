import { useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Star, Phone, Navigation, X, Search,
  Globe, Clock, Users, Building, Droplets, CheckCircle,
  Share2, Heart, Copy, MessageCircle, Instagram, ChevronRight,
  AlertTriangle, UserPlus, Instagram as Insta, ThumbsUp, Award,
  ShoppingCart, Plus, Minus
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useStore } from '../lib/store'

const BRAND = '#E8431A'

// ── Shared restaurant mock data ──────────────────────────────────────────────
const RESTAURANT = {
  id: '1',
  name: 'The Rustic Spoon',
  cuisine: 'Modern American',
  rating: 4.8,
  reviews: 342,
  address: '123 Main St, Downtown, NY',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
  description: 'Experience farm-to-table dining at its finest. The Rustic Spoon sources locally and changes its menu seasonally to bring the freshest flavours to your table.',
  memberSince: '2018',
  timings: 'Mon–Fri: 11 AM – 10 PM\nSat–Sun: 10 AM – 11 PM',
  website: 'www.therusticspoon.com',
  phone: '+1 (212) 555-0198',
  branches: ['Uptown', 'Brooklyn', 'Midtown'],
  currentDiscount: '10',
  userTier: 'Silver' as Tier,
  userVisits: 7,
  goldVisitsNeeded: 10,
  menu: [
    {
      category: 'Starters',
      items: [
        {
          name: 'Truffle Fries', desc: 'Crispy fries with parmesan & truffle oil',         price: 12, cals: 450, protein: 8,  veg: true,
          img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&h=120&fit=crop',
          rating: 4.6, reviewCount: 38,
          reviews: [
            { author: 'Jake M.', text: 'Absolutely addictive. Best truffle fries in the city!', stars: 5 },
            { author: 'Priya L.', text: 'A little salty but the truffle flavour is on point.', stars: 4 },
          ]
        },
        {
          name: 'Burrata',       desc: 'Heirloom tomatoes, balsamic glaze, fresh basil',   price: 16, cals: 320, protein: 14, veg: true,
          img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=120&h=120&fit=crop',
          rating: 4.9, reviewCount: 52,
          reviews: [
            { author: 'Sarah M.', text: 'The creamiest burrata I\'ve ever had. A must!', stars: 5 },
          ]
        },
        {
          name: 'Chicken Wings', desc: 'Crispy buffalo wings with blue cheese dip',         price: 14, cals: 620, protein: 38, veg: false,
          img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=120&h=120&fit=crop',
          rating: 4.4, reviewCount: 27,
          reviews: [
            { author: 'Derek F.', text: 'Good kick! Could use more blue cheese though.', stars: 4 },
          ]
        },
      ]
    },
    {
      category: 'Mains',
      items: [
        {
          name: 'Pan Seared Salmon', desc: 'Quinoa, asparagus, lemon butter caper sauce',   price: 28, cals: 650, protein: 42, veg: false,
          img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=120&h=120&fit=crop',
          rating: 4.8, reviewCount: 64,
          reviews: [
            { author: 'Mia K.', text: 'Perfectly seared and seasoned. One of the best I\'ve had.', stars: 5 },
            { author: 'Tom H.', text: 'The caper sauce really elevates this dish.', stars: 5 },
          ]
        },
        {
          name: 'Steak Frites',      desc: '10 oz Ribeye, compound butter, shoestring fries', price: 34, cals: 980, protein: 55, veg: false,
          img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=120&h=120&fit=crop',
          rating: 4.7, reviewCount: 89,
          reviews: [
            { author: 'John D.', text: 'Juicy, well-cooked steak. The compound butter is heavenly.', stars: 5 },
          ]
        },
        {
          name: 'Garden Risotto',    desc: 'Wild mushroom risotto, truffle oil, parmesan',    price: 22, cals: 520, protein: 12, veg: true,
          img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=120&h=120&fit=crop',
          rating: 4.3, reviewCount: 33,
          reviews: [
            { author: 'Amy R.', text: 'Creamy and rich. Perfect for a rainy evening!', stars: 4 },
          ]
        },
      ]
    },
    {
      category: 'Desserts',
      items: [
        {
          name: 'Crème Brûlée', desc: 'Classic vanilla custard with caramelised sugar', price: 10, cals: 380, protein: 6, veg: true,
          img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=120&h=120&fit=crop',
          rating: 4.9, reviewCount: 77,
          reviews: [
            { author: 'Nina S.', text: 'Flawless execution. The crack of the sugar crust is perfection.', stars: 5 },
          ]
        },
      ]
    },
  ],
  photos: [
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400',
  ],
  userReviews: [
    { id: 1, author: 'Sarah M.', avatar: 'https://i.pravatar.cc/80?u=1',  rating: 5, text: 'Amazing experience! The steak was cooked to perfection.', date: '2 days ago' },
    { id: 2, author: 'John D.',  avatar: 'https://i.pravatar.cc/80?u=2',  rating: 4, text: 'Great atmosphere and food. Loved the truffle fries!', date: '1 week ago' },
    { id: 3, author: 'Mia K.',   avatar: 'https://i.pravatar.cc/80?u=3',  rating: 5, text: 'Perfect anniversary dinner. Highly recommend the salmon!', date: '2 weeks ago' },
  ],
  offers: [
    { tier: 'Bronze' as Tier, perk: '5% Off Total Bill',                   visitsNeeded: 2,  unlocked: true  },
    { tier: 'Silver' as Tier, perk: '10% Off Total Bill + Free Soft Drink', visitsNeeded: 5,  unlocked: true  },
    { tier: 'Gold'   as Tier, perk: '15% Off + Priority Seating + Dessert', visitsNeeded: 10, unlocked: false },
    { tier: 'Platinum' as Tier, perk: '20% Off + Chef\'s Table Access',     visitsNeeded: 20, unlocked: false },
  ],
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Tier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
type Tab  = 'menu' | 'ripple' | 'reviews' | 'photos' | 'about'

// ── Tier styling helpers ──────────────────────────────────────────────────────
const TIER_CONFIG: Record<Tier, { cls: string; color: string; label: string; idx: number }> = {
  Bronze:   { cls: 'badge-bronze',   color: '#92400E', label: '5% off',  idx: 0 },
  Silver:   { cls: 'badge-silver',   color: '#475569', label: '10% off', idx: 1 },
  Gold:     { cls: 'badge-gold',     color: '#854D0E', label: '15% off', idx: 2 },
  Platinum: { cls: 'badge-platinum', color: '#6D28D9', label: '20% off', idx: 3 },
}
const TIERS: Tier[] = ['Bronze', 'Silver', 'Gold', 'Platinum']

function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    left: `${Math.random() * 90 + 5}%`,
    color: ['#E8431A','#F59E0B','#10B981','#6366F1','#EC4899','#FDE047'][i % 6],
    delay: (Math.random() * 0.6).toFixed(2),
    dur: (1.4 + Math.random() * 0.8).toFixed(2),
    size: 5 + Math.random() * 7,
    round: Math.random() > 0.5,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-3xl z-50">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: p.left,
            top: '-4px',
            width:  p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.round ? '50%' : '2px',
            '--delay': `${p.delay}s`,
            '--dur':   `${p.dur}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ── Concentric Ripple Visualization ─────────────────────────────────────────
function RippleViz({ userTier, visits, visitsForGold }: { userTier: Tier; visits: number; visitsForGold: number }) {
  const currentIdx = TIERS.indexOf(userTier)

  const rings = [
    { r: 28,  label: 'Bronze',   color: '#B45309', stroke: '#F59E0B', dashed: false },
    { r: 52,  label: 'Silver',   color: '#64748B', stroke: '#CBD5E1', dashed: false },
    { r: 76,  label: 'Gold',     color: '#CA8A04', stroke: '#FDE047', dashed: true  },
    { r: 100, label: 'Platinum', color: '#7C3AED', stroke: '#DDD6FE', dashed: true  },
  ]

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative flex items-center justify-center" style={{ width: 230, height: 230 }}>
        <svg width="230" height="230" viewBox="0 0 230 230">
          {/* Background glow circles */}
          {rings.map((ring, i) => (
            i <= currentIdx && (
              <circle
                key={`glow-${i}`}
                cx="115" cy="115"
                r={ring.r + 4}
                fill={ring.stroke + '18'}
              />
            )
          ))}

          {/* Rings */}
          {rings.map((ring, i) => {
            const isActive = i === currentIdx
            const isUnlocked = i <= currentIdx
            return (
              <circle
                key={ring.label}
                cx="115" cy="115"
                r={ring.r}
                fill="none"
                stroke={isUnlocked ? ring.stroke : '#E2E8F0'}
                strokeWidth={isActive ? 10 : 5}
                strokeDasharray={ring.dashed && !isUnlocked ? '6 4' : 'none'}
                opacity={isUnlocked ? 1 : 0.35}
                className={isActive ? 'ripple-ring-pulse' : ''}
              />
            )
          })}

          {/* Center dot */}
          <circle cx="115" cy="115" r="14" fill={BRAND} />
          <circle cx="115" cy="115" r="7" fill="white" opacity="0.6" />

          {/* Tier labels at top of each ring */}
          {rings.map((ring, i) => {
            const isUnlocked = i <= currentIdx
            const x = 115
            const y = 115 - ring.r - 8
            return (
              <text
                key={`label-${ring.label}`}
                x={x} y={y}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill={isUnlocked ? ring.color : '#CBD5E1'}
                opacity={isUnlocked ? 1 : 0.6}
              >
                {ring.label}
              </text>
            )
          })}
        </svg>

        {/* Center info */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mt-2">
            <p className="text-[11px] font-black text-slate-700 mt-1">{RESTAURANT.currentDiscount}% OFF</p>
          </div>
        </div>
      </div>

      {/* Visit progress */}
      <div className="w-full px-4 mt-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5">
          <span>{visits} visits</span>
          <span>Gold at {visitsForGold}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.min(100, (visits / visitsForGold) * 100)}%`, background: 'linear-gradient(90deg, #E8431A, #F59E0B)' }}
          />
        </div>
        <p className="text-[10px] text-slate-400 font-semibold mt-1.5">{visitsForGold - visits} more visits to unlock Gold</p>
      </div>
    </div>
  )
}

// ── Tier benefit row ─────────────────────────────────────────────────────────
function TierRow({ tier, perk, unlocked, visitsNeeded }: { tier: Tier; perk: string; unlocked: boolean; visitsNeeded: number }) {
  const cfg = TIER_CONFIG[tier]
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-2xl ${unlocked ? 'bg-slate-50' : 'bg-white opacity-60'}`}>
      <div className={`w-9 h-9 rounded-full ${cfg.cls} flex items-center justify-center shrink-0`}>
        {unlocked
          ? <CheckCircle className="w-5 h-5 text-white" />
          : <span className="text-[10px] font-black text-white">{visitsNeeded}</span>
        }
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-black`} style={{ color: cfg.color }}>{tier}</span>
          {!unlocked && <span className="text-[10px] text-slate-400">{visitsNeeded} visits</span>}
        </div>
        <p className="text-[11px] text-slate-600 mt-0.5 font-medium">{perk}</p>
      </div>
      {unlocked && <span className="text-[10px] font-black text-green-600">Active</span>}
    </div>
  )
}

// ── Menu item card ──────────────────────────────────────────────────────────
function MenuItemCard({ item }: { item: typeof RESTAURANT.menu[0]['items'][0] }) {
  const [expanded, setExpanded] = useState(false)
  const cart = useStore(state => state.cart)
  const addToCart = useStore(state => state.addToCart)
  const updateQuantity = useStore(state => state.updateQuantity)

  const cartItem = cart.find(c => c.name === item.name)

  const handleAdd = () => {
    addToCart({ id: item.name, name: item.name, desc: item.desc, price: item.price.toString(), image: item.img })
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex gap-3 p-3">
        <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <div className={`w-3 h-3 rounded-sm border-2 shrink-0 ${item.veg ? 'border-green-600' : 'border-rose-600'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full m-auto mt-px ${item.veg ? 'bg-green-600' : 'bg-rose-600'}`} />
                </div>
                <h4 className="font-black text-[13px] text-slate-900 truncate">{item.name}</h4>
              </div>
              <span className="font-black text-sm text-slate-900 shrink-0">${item.price}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2 font-medium">{item.desc}</p>
          </div>
          
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.cals} kcal</span>
              <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-black text-slate-600">{item.rating}</span>
              </button>
            </div>
            
            {cartItem ? (
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1 shadow-sm">
                <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-black w-3 text-center">{cartItem.quantity}</span>
                <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button onClick={handleAdd} className="bg-[#FEF0EC] text-[#E8431A] text-[11px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                <Plus className="w-3 h-3" /> Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Inline reviews */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-slate-50"
          >
            <div className="px-4 py-3 space-y-2.5">
              {item.reviews.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-black text-slate-700">{r.author}</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-2.5 h-2.5 ${s <= r.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-snug">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
export function RestaurantPage() {
  const { id: _id } = useParams()
  const [searchParams] = useSearchParams()
  const isDemoGold = searchParams.get('demo') === 'gold'
  const isTabMenu = searchParams.get('tab') === 'menu'
  
  const rest = RESTAURANT

  const cart = useStore(state => state.cart)

  const [activeTab, setActiveTab]       = useState<Tab>(isTabMenu ? 'menu' : 'ripple')
  const [showBooking, setShowBooking] = useState(false)
  const [showShare, setShowShare]     = useState(false)
  const [menuSearch, setMenuSearch]   = useState('')
  const [selectedDate, setSelectedDate] = useState('Today')
  const [selectedTime, setSelectedTime] = useState('')
  const [guestCount, setGuestCount]   = useState(2)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [isSaved, setIsSaved]         = useState(false)
  const [showHoldGold, setShowHoldGold] = useState(false)
  
  const [showGoldDrawer, setShowGoldDrawer] = useState(false)
  const [hasTriggeredGold, setHasTriggeredGold] = useState(false)

  const dates     = ['Today', 'Tomorrow', 'Wed 16', 'Thu 17', 'Fri 18', 'Sat 19']
  const timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

  const handleBook = () => {
    if (!selectedTime) return
    setTimeout(() => { setBookingConfirmed(true); setTimeout(() => { setBookingConfirmed(false); setShowBooking(false) }, 2000) }, 600)
  }

  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId)
    if (tabId === 'ripple' && isDemoGold && !hasTriggeredGold) {
      setHasTriggeredGold(true)
      setShowGoldDrawer(true)
    }
  }

  const allMenuItems = rest.menu.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })))
  const filteredMenu = menuSearch.trim()
    ? allMenuItems.filter(i => i.name.toLowerCase().includes(menuSearch.toLowerCase()) || i.desc.toLowerCase().includes(menuSearch.toLowerCase()))
    : null

  const tabs: { id: Tab; label: string }[] = [
    { id: 'menu',    label: 'Menu' },
    { id: 'ripple',  label: 'My Ripple' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'photos',  label: 'Photos' },
    { id: 'about',   label: 'About' },
  ]

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">

      {/* ── Hero ── */}
      <div className="h-56 w-full relative flex-shrink-0">
        <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Back */}
        <Link to="/" className="absolute top-4 left-4 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
          <ArrowLeft className="w-4 h-4 text-white" />
        </Link>

        {/* Share + Save */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => setShowShare(true)} className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <Share2 className="w-4 h-4 text-white" />
          </button>
          <button onClick={() => setIsSaved(p => !p)} className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400 text-rose-400' : 'text-white'}`} />
          </button>
        </div>

        {/* Tier badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg badge-silver">
          <Droplets className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-[11px] font-black">{rest.userTier} · {rest.currentDiscount}% OFF</span>
        </div>

        {/* Restaurant info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-2xl font-black text-white leading-tight">{rest.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-slate-300 text-xs font-medium">{rest.cuisine}</span>
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-white">{rest.rating}</span>
              <span className="text-xs text-slate-300">({rest.reviews})</span>
            </div>
            {/* Inline tier callout */}
            <div className="badge-silver px-2 py-0.5 rounded-full">
              <span className="text-[10px] font-black text-white">Silver Ripple</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 flex overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`py-3.5 px-4 text-[11px] font-black border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === tab.id ? 'border-[#E8431A] text-[#E8431A]' : 'border-transparent text-slate-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 pb-28">
        <AnimatePresence mode="wait">

          {/* MENU */}
          {activeTab === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={menuSearch}
                  onChange={e => setMenuSearch(e.target.value)}
                  placeholder="Search this menu…"
                  className="pl-9 bg-slate-50 border-slate-200 rounded-xl text-sm"
                />
                {menuSearch && <button onClick={() => setMenuSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-slate-400" /></button>}
              </div>

              {filteredMenu ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 font-semibold">{filteredMenu.length} results</p>
                  {filteredMenu.map((item, j) => <MenuItemCard key={j} item={item} />)}
                </div>
              ) : (
                rest.menu.map((cat, i) => (
                  <div key={i}>
                    <h3 className="text-base font-black text-slate-900 mb-3">{cat.category}</h3>
                    <div className="space-y-3">{cat.items.map((item, j) => <MenuItemCard key={j} item={item} />)}</div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {/* MY RIPPLE */}
          {activeTab === 'ripple' && (
            <motion.div key="ripple" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">

              {/* Degradation warning */}
              <div className="rounded-3xl p-4 border border-[#E8431A]/20" style={{ background: 'linear-gradient(135deg, #FEF0EC, #FFF)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4" style={{ color: BRAND }} />
                  <p className="text-sm font-black text-slate-900">Your Gold is fading!</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mb-3">Visit within 3 days to keep your Gold Ripple status at this restaurant.</p>
                <button onClick={() => setShowHoldGold(p => !p)} className="text-[11px] font-black flex items-center gap-1" style={{ color: BRAND }}>
                  Hold onto Gold <ChevronRight className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {showHoldGold && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pt-4 space-y-2">
                        {[
                          { Icon: UserPlus,  label: 'Send a friend with your discount', sub: 'They dine → your status extends by 7 days' },
                          { Icon: Insta,     label: 'Follow on Instagram',              sub: 'Complete social task to extend by 3 days' },
                          { Icon: ThumbsUp,  label: 'Leave a review',                  sub: 'Write a review to earn 30-day extension' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-3 border border-slate-100">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FEF0EC' }}>
                              <item.Icon className="w-4 h-4" style={{ color: BRAND }} />
                            </div>
                            <div>
                              <p className="text-[12px] font-black text-slate-800">{item.label}</p>
                              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Concentric visualization */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-1 flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Your Ripple</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Loyalty at The Rustic Spoon</p>
                  </div>
                  <div className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black text-white ${TIER_CONFIG[rest.userTier].cls}`}>
                    {rest.userTier}
                  </div>
                </div>
                <RippleViz userTier={rest.userTier} visits={rest.userVisits} visitsForGold={rest.goldVisitsNeeded} />
              </div>

              {/* Tier perks list */}
              <div className="bg-white rounded-3xl border border-slate-100 p-4 space-y-2.5">
                <h3 className="text-sm font-black text-slate-900 mb-1">All Ripple Tiers</h3>
                {rest.offers.map(o => (
                  <TierRow key={o.tier} tier={o.tier} perk={o.perk} unlocked={o.unlocked} visitsNeeded={o.visitsNeeded} />
                ))}
              </div>

              {/* Share status CTA */}
              <button onClick={() => setShowShare(true)} className="w-full flex items-center justify-between px-5 py-4 rounded-3xl text-white shadow-md text-left" style={{ background: 'linear-gradient(135deg, #E8431A, #C0300D)' }}>
                <div className="flex-1 pr-4">
                  <p className="font-black text-sm">Share your Silver status</p>
                  <p className="text-[11px] text-white/70 mt-0.5">Gift your 10% discount to a friend for one visit</p>
                </div>
                <Share2 className="w-5 h-5 text-white/70" />
              </button>
            </motion.div>
          )}

          {/* REVIEWS */}
          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
              <div className="bg-white rounded-3xl p-5 flex items-center gap-5 border border-slate-100">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-900">{rest.rating}</p>
                  <div className="flex gap-0.5 mt-1 justify-center">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">{rest.reviews} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(n => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 w-3">{n}</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: n === 5 ? '65%' : n === 4 ? '25%' : n === 3 ? '7%' : '3%', backgroundColor: BRAND }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-slate-200 border-dashed">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/80?u=0" alt="me" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-slate-400 font-medium">Share your experience…</span>
              </button>

              {rest.userReviews.map(review => (
                <div key={review.id} className="bg-white p-4 rounded-3xl border border-slate-100">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-black text-slate-900">{review.author}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{review.text}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* PHOTOS */}
          {activeTab === 'photos' && (
            <motion.div key="photos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {rest.photos.map((photo, i) => (
                  <motion.div key={i} whileTap={{ scale: 0.96 }}
                    className={`rounded-2xl overflow-hidden bg-slate-100 ${i === 0 ? 'col-span-2 h-48' : 'h-36'}`}>
                    <img src={photo} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ABOUT */}
          {activeTab === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{rest.description}</p>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
                <div className="p-4 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-700 mb-1">Opening Hours</p>
                    {rest.timings.split('\n').map((line, i) => <p key={i} className="text-xs text-slate-500 font-medium">{line}</p>)}
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-700">Phone</p>
                    <p className="text-xs font-bold" style={{ color: BRAND }}>{rest.phone}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-700">Website</p>
                    <p className="text-xs font-bold" style={{ color: BRAND }}>{rest.website}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-700">On Ripple Since</p>
                    <p className="text-xs text-slate-500 font-medium">{rest.memberSince}</p>
                  </div>
                </div>
                <div className="p-4 flex items-start gap-3">
                  <Building className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-700 mb-2">Other Branches</p>
                    <div className="flex flex-wrap gap-2">
                      {rest.branches.map(b => (
                        <button key={b} className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1">
                          {b} <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Bottom Action Bar ── */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex gap-3 z-30">
        <a href={`tel:${rest.phone}`} className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-slate-600" />
        </a>
        <button className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
          <Navigation className="w-5 h-5 text-slate-600" />
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowBooking(true)}
          className="flex-1 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg"
          style={{ backgroundColor: BRAND }}
        >
          Book a Table
        </motion.button>
      </div>

      {/* ── Booking Drawer ── */}
      <AnimatePresence>
        {showBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBooking(false)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: '85%' }}
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              <div className="px-5 py-3 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900">Book a Table</h2>
                <button onClick={() => setShowBooking(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {bookingConfirmed ? (
                <div className="flex-1 flex flex-col items-center justify-center py-10 gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-lg text-slate-900">Booking Confirmed!</p>
                    <p className="text-sm text-slate-500 mt-1">See you {selectedDate} at {selectedTime}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-4 space-y-5">
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-3">Select Date</h3>
                      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                        {dates.map(d => (
                          <button key={d} onClick={() => setSelectedDate(d)}
                            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${selectedDate === d ? 'text-white' : 'bg-slate-100 text-slate-600'}`}
                            style={selectedDate === d ? { backgroundColor: BRAND } : {}}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-3">Select Time</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`py-2.5 rounded-xl text-xs font-bold transition-colors ${selectedTime === t ? 'text-white shadow-md' : 'bg-slate-100 text-slate-700'}`}
                            style={selectedTime === t ? { backgroundColor: BRAND } : {}}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-3">Guests</h3>
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2">
                        <button onClick={() => setGuestCount(g => Math.max(1, g-1))} className="w-10 h-10 bg-white rounded-xl shadow-sm text-lg font-black text-slate-600">−</button>
                        <span className="font-black text-slate-900 text-lg">{guestCount} <span className="text-xs font-medium text-slate-400">guests</span></span>
                        <button onClick={() => setGuestCount(g => Math.min(12, g+1))} className="w-10 h-10 bg-white rounded-xl shadow-sm text-lg font-black text-slate-600">+</button>
                      </div>
                    </div>
                    {selectedTime && (
                      <div className="rounded-2xl p-4 border" style={{ backgroundColor: '#FEF0EC', borderColor: '#E8431A20' }}>
                        <p className="text-xs font-black mb-1" style={{ color: BRAND }}>Booking Summary</p>
                        <p className="text-sm font-semibold text-slate-700">{rest.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{selectedDate} · {selectedTime} · {guestCount} guests</p>
                        <p className="text-xs font-bold mt-1 text-green-600">Silver discount (10% off) will apply</p>
                      </div>
                    )}
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100">
                    <motion.button whileTap={{ scale: 0.98 }} onClick={handleBook} disabled={!selectedTime}
                      className={`w-full py-4 rounded-2xl font-black text-base transition-colors ${selectedTime ? 'text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      style={selectedTime ? { backgroundColor: BRAND } : {}}>
                      {selectedTime ? `Confirm · ${selectedDate} ${selectedTime}` : 'Select a time slot'}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Share Drawer ── */}
      <AnimatePresence>
        {showShare && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowShare(false)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50"
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              <div className="px-5 py-3 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900">Gift your discount</h2>
                <button onClick={() => setShowShare(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>
              <div className="px-5 py-4">
                {/* Explainer */}
                <div className="rounded-2xl p-4 mb-4 border" style={{ backgroundColor: '#FEF0EC', borderColor: '#E8431A20' }}>
                  <p className="text-xs font-black text-slate-800 mb-1">How sharing works</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Your friend gets <span className="font-black" style={{ color: BRAND }}>one visit with your Silver discount (10% off)</span> at The Rustic Spoon. After dining, they start at Bronze tier. Your status is unaffected.
                  </p>
                </div>

                {/* Preview card */}
                <div className="rounded-3xl p-5 text-white mb-5" style={{ background: 'linear-gradient(135deg, #E8431A, #C0300D)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="font-black text-base">Ripple</span>
                  </div>
                  <p className="font-bold text-sm">A Silver gift from your friend at</p>
                  <p className="font-black text-lg mt-0.5">{rest.name}</p>
                  <p className="text-white/70 text-xs mt-1">Enjoy 10% off your next visit — valid for one dine-in</p>
                  <div className="badge-silver inline-flex px-3 py-1 rounded-full mt-3">
                    <span className="text-[10px] font-black text-white">Silver Ripple · 10% OFF</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => navigator.clipboard?.writeText('Hey! Enjoy 10% off at The Rustic Spoon — my Silver gift to you! https://ripple.app/share/abc123')}
                    className="flex flex-col items-center gap-2 bg-slate-50 rounded-2xl py-4 border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                      <Copy className="w-5 h-5 text-slate-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Copy Link</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 bg-green-50 rounded-2xl py-4 border border-green-100">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">WhatsApp</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 bg-pink-50 rounded-2xl py-4 border border-pink-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">Instagram</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Gold Upgrade Drawer (Demo) ── */}
      <AnimatePresence>
        {showGoldDrawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGoldDrawer(false)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 overflow-hidden"
            >
              <Confetti />
              <div className="flex justify-center pt-3 pb-1 relative z-10"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              
              <div className="px-5 py-8 flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 rounded-full badge-gold flex items-center justify-center shadow-lg shadow-yellow-600/30 mb-5">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">You Rippled to Gold!</h2>
                <p className="text-sm font-medium text-slate-500 mb-6">
                  Congratulations! You've made your 10th visit to <span className="font-bold text-slate-700">{rest.name}</span>. 
                  Your loyalty has unlocked Gold status.
                </p>
                
                <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 text-left">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">New Perks Unlocked</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">15% off your total bill</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">Complimentary dessert</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">Priority seating & waitlist</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => setShowGoldDrawer(false)} className="w-full py-4 rounded-2xl font-black text-white text-base shadow-lg" style={{ backgroundColor: BRAND }}>
                  Awesome!
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Floating Cart ── */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-4 left-4 right-4 z-50">
            <Link to="/cart" className="bg-[#E8431A] text-white p-4 rounded-3xl flex items-center justify-between shadow-[0_8px_30px_rgb(232,67,26,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{cart.length} item{cart.length > 1 ? 's' : ''}</p>
                  <p className="text-xs font-bold text-white/70">${cart.reduce((a,b) => a + parseFloat(b.price) * b.quantity, 0).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black">View Cart</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
