import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Star, Phone, Navigation, X, Search,
  Globe, Clock, Users, Building, Droplets, CheckCircle,
  Share2, Heart, Copy, MessageCircle, Instagram, ChevronRight,
  AlertTriangle, UserPlus, Instagram as Insta, ThumbsUp, Award,
  ShoppingCart, Plus, Minus,
  Camera, Leaf, Map as MapIcon, Smartphone, Sparkles, Video, Wine,
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
  isOpen: true, // Mock value, can be overridden by URL param
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
    { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=400', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400', category: 'Drinks' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400', category: 'Drinks' },
  ],
  userReviews: [
    { id: 1, author: 'Sarah M.', avatar: 'https://i.pravatar.cc/80?u=1',  rating: 5, text: 'Amazing experience! The steak was cooked to perfection.', date: '2 days ago', images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'] },
    { id: 2, author: 'John D.',  avatar: 'https://i.pravatar.cc/80?u=2',  rating: 4, text: 'Great atmosphere and food. Loved the truffle fries!', date: '1 week ago', images: [] },
    { id: 3, author: 'Mia K.',   avatar: 'https://i.pravatar.cc/80?u=3',  rating: 5, text: 'Perfect anniversary dinner. Highly recommend the salmon!', date: '2 weeks ago', images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=200&h=200&fit=crop'] },
  ],
  offers: [
    { tier: 'Bronze' as Tier, perk: '5% Off Total Bill',                   visitsNeeded: 2,  unlocked: true  },
    { tier: 'Silver' as Tier, perk: '10% Off Total Bill + Free Soft Drink', visitsNeeded: 5,  unlocked: true  },
    { tier: 'Gold'   as Tier, perk: '15% Off + Priority Seating + Dessert', visitsNeeded: 10, unlocked: false },
    { tier: 'Platinum' as Tier, perk: '20% Off + Chef\'s Table Access',     visitsNeeded: 20, unlocked: false },
  ],
}

// Ripple Picks — curated must-try items
const RIPPLE_PICKS = [
  { name: 'Pan Seared Salmon', tag: "Chef's Pick", img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop', price: 28, desc: 'Quinoa, asparagus, lemon butter', veg: false },
  { name: 'Burrata',           tag: 'Most Ordered', img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=200&h=200&fit=crop', price: 16, desc: 'Heirloom tomatoes, balsamic',   veg: true },
  { name: 'Crème Brûlée',     tag: 'Fan Favorite', img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=200&h=200&fit=crop', price: 10, desc: 'Classic vanilla, caramel sugar', veg: true },
  { name: 'Truffle Fries',     tag: 'Hidden Gem',   img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop', price: 12, desc: 'Parmesan & truffle oil',        veg: true },
]

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

// ── Premium Ripple Visualization ─────────────────────────────────────────
function RippleViz({ userTier, visits, visitsForGold }: { userTier: Tier; visits: number; visitsForGold: number }) {
  const currentIdx = TIERS.indexOf(userTier)
  
  return (
    <div className="py-2">
      <div className="bg-gradient-to-br from-white via-orange-50/50 to-orange-100/50 rounded-[2.5rem] p-6 text-slate-900 shadow-[0_8px_30px_rgba(232,67,26,0.06)] border border-orange-100 relative overflow-hidden">
        {/* Animated Background Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-[200%] h-full animate-[ripple_10s_linear_infinite]">
            <path d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 L200,100 L0,100 Z" fill="currentColor" className="text-[#E8431A]" />
          </svg>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-[200%] h-full animate-[ripple_15s_linear_infinite_reverse] opacity-50">
            <path d="M0,60 Q25,80 50,60 T100,60 T150,60 T200,60 L200,100 L0,100 Z" fill="currentColor" className="text-amber-500" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-8">
          <div>
            <p className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-1">Your Ripple</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{visits}</span>
              <span className="text-sm font-medium text-slate-500">visits</span>
            </div>
            <p className="text-xs font-bold mt-1 text-[#E8431A]">{visitsForGold - visits} more to unlock Gold</p>
          </div>
          <div className="text-right bg-white/70 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/60 shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Discount</p>
            <p className="text-xl font-black text-[#E8431A]">{RESTAURANT.currentDiscount}%</p>
          </div>
        </div>
        
        {/* Horizontal Carousel */}
        <div className="relative z-10 -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
            {TIERS.map((tier, i) => {
              const isUnlocked = i <= currentIdx
              const isActive = i === currentIdx
              const cfg = TIER_CONFIG[tier]
              
              return (
                <div 
                  key={tier} 
                  className={`snap-center shrink-0 w-[85%] rounded-3xl p-5 border backdrop-blur-xl transition-all ${
                    isActive ? 'bg-white/90 border-[#E8431A]/30 shadow-[0_8px_20px_rgba(232,67,26,0.08)]' 
                    : isUnlocked ? 'bg-white/60 border-slate-200 opacity-90' 
                    : 'bg-slate-50/50 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${isUnlocked ? cfg.cls : 'bg-slate-200 text-slate-400'}`}>
                        {isUnlocked ? <CheckCircle className="w-5 h-5 text-white" /> : <span className="font-black text-sm">{i * 3 + 1}</span>}
                      </div>
                      <div>
                        <h3 className="font-black text-lg" style={{ color: isUnlocked ? cfg.color : '#64748b' }}>{tier}</h3>
                        <p className="text-xs font-medium text-slate-500">{i * 3 + 1} visits required</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#E8431A] text-white px-2.5 py-1 rounded-full shadow-sm">
                        Active
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      {isUnlocked 
                        ? `Enjoy your permanent ${i === 0 ? '5%' : i === 1 ? '10%' : '20%'} discount on all orders.`
                        : `Visit ${i * 3 + 1 - visits} more times to unlock a permanent ${i === 0 ? '5%' : i === 1 ? '10%' : '20%'} discount.`
                      }
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes ripple {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}



// ── Tier benefit row ─────────────────────────────────────────────────────────
function TierRow({ tier, perk, unlocked, visitsNeeded, isActive }: { tier: Tier; perk: string; unlocked: boolean; visitsNeeded: number; isActive: boolean }) {
  const cfg = TIER_CONFIG[tier]
  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-2xl ${isActive ? 'bg-slate-50' : unlocked ? 'bg-slate-50 opacity-50 grayscale' : 'bg-white opacity-60'}`}>
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
      {isActive && <span className="text-[10px] font-black text-green-600">Active</span>}
      {unlocked && !isActive && <span className="text-[10px] font-black text-slate-400">Completed</span>}
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
  const isClosedDemo = searchParams.get('closed') === 'true'
  
  const rest = { ...RESTAURANT, isOpen: isClosedDemo ? false : RESTAURANT.isOpen }

  const cart = useStore(state => state.cart)
  const addToCart = useStore(state => state.addToCart)
  const updateQuantity = useStore(state => state.updateQuantity)
  const [lastAdded, setLastAdded] = useState<string | null>(null)
  const [showUpsell, setShowUpsell] = useState(false)
  const [budgetFilter, setBudgetFilter] = useState<'Any' | 'Under $15' | 'Under $25'>('Any')
  const [showVegOnly, setShowVegOnly] = useState(false)

  const [reviewTab, setReviewTab] = useState<'customers' | 'influencers'>('customers')
  const [photoFilter, setPhotoFilter] = useState('All')


  const [activeTab, setActiveTab]       = useState<Tab>(isTabMenu ? 'menu' : 'ripple')
  const [showBooking, setShowBooking] = useState(false)
  const [showShare, setShowShare]     = useState(false)
  const [menuSearch, setMenuSearch]   = useState('')
  const [selectedDate, setSelectedDate] = useState('Today')
  const [selectedTime, setSelectedTime] = useState('')
  const [guestCount, setGuestCount]   = useState(2)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [hasBooked, setHasBooked] = useState(false)
  const [isSaved, setIsSaved]         = useState(false)
  const [showHoldGold, setShowHoldGold] = useState(false)
  
  const [showGoldDrawer, setShowGoldDrawer] = useState(false)
  const [hasTriggeredGold, setHasTriggeredGold] = useState(false)

  const dates     = ['Today', 'Tomorrow', 'Wed 16', 'Thu 17', 'Fri 18', 'Sat 19']
  const timeSlots = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

  useEffect(() => {
    if (lastAdded) {
      setShowUpsell(true)
      const t = setTimeout(() => { setShowUpsell(false); setLastAdded(null) }, 4000)
      return () => clearTimeout(t)
    }
  }, [lastAdded])

  const handleBook = () => {
    if (!selectedTime) return
    setHasBooked(true)
    setTimeout(() => { setBookingConfirmed(true) }, 600)
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
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-black text-white leading-tight">{rest.name}</h1>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-slate-300 text-xs font-medium">{rest.cuisine}</span>
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-white">{rest.rating}</span>
              <span className="text-xs text-slate-300">({rest.reviews})</span>
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

              {/* ── Ripple Picks Shelf ── */}
              {!menuSearch && (
                <div className="-mx-4 px-4 pb-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-black text-slate-900"><span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Ripple Picks</span></h3>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">The team at The Rustic Spoon swears by these</p>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-0">
                    {RIPPLE_PICKS.map((pick) => {
                      const storeItem = { id: pick.name, name: pick.name, desc: pick.desc, price: pick.price.toString(), image: pick.img }
                      const cartItem = cart.find(c => c.id === pick.name)
                      const TAG_COLORS: Record<string, string> = {
                        "Chef's Pick": 'bg-purple-100 text-purple-700',
                        'Most Ordered': 'bg-amber-100 text-amber-700',
                        'Fan Favorite': 'bg-rose-100 text-rose-700',
                        'Hidden Gem': 'bg-emerald-100 text-emerald-700',
                        'New on Menu': 'bg-blue-100 text-blue-700',
                      }
                      return (
                        <div key={pick.name} className="shrink-0 w-36 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                          <div className="relative">
                            <img src={pick.img} alt={pick.name} className="w-full h-24 object-cover" />
                            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black ${TAG_COLORS[pick.tag] || 'bg-slate-100 text-slate-600'}`}>
                              {pick.tag}
                            </div>
                            <div className="absolute top-2 right-2">
                              <div className={`w-3 h-3 rounded-sm border-2 ${pick.veg ? 'border-green-600' : 'border-rose-600'} flex items-center justify-center bg-white`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${pick.veg ? 'bg-green-600' : 'bg-rose-600'}`} />
                              </div>
                            </div>
                          </div>
                          <div className="p-2.5">
                            <p className="font-black text-[12px] text-slate-900 leading-tight">{pick.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5 font-medium">${pick.price}</p>
                            <div className="mt-2">
                              {cartItem ? (
                                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                  <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} className="w-5 h-5 bg-white rounded flex items-center justify-center shadow-sm">
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="text-[10px] font-black w-3 text-center">{cartItem.quantity}</span>
                                  <button onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} className="w-5 h-5 bg-white rounded flex items-center justify-center shadow-sm">
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => { addToCart(storeItem); setLastAdded(pick.name) }}
                                  className="w-full bg-[#FEF0EC] text-[#E8431A] text-[10px] font-black py-1.5 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-transform"
                                >
                                  <Plus className="w-2.5 h-2.5" /> Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Budget Filter ── */}
              {!menuSearch && (
                <div className="flex gap-2">
                  {(['Any', 'Under $15', 'Under $25'] as const).map(b => (
                    <button
                      key={b}
                      onClick={() => setBudgetFilter(b)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-black transition-colors border ${
                        budgetFilter === b
                          ? 'bg-[#E8431A] text-white border-[#E8431A]'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowVegOnly(v => !v)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200"
                  >
                    <Leaf className={`w-3.5 h-3.5 ${showVegOnly ? 'text-green-600' : 'text-slate-400'}`} />
                    <span className="text-[11px] font-black text-slate-700">Veg Only</span>
                    <div className={`w-7 h-4 rounded-full transition-colors flex items-center px-0.5 ${showVegOnly ? 'bg-green-600' : 'bg-slate-200'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${showVegOnly ? 'translate-x-3' : 'translate-x-0'}`} />
                    </div>
                  </button>
                </div>
              )}

              {budgetFilter !== 'Any' && (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                  <span className="text-[11px] text-blue-700 font-semibold">Showing options that match your budget — dimming items outside range</span>
                </div>
              )}

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
                  <p className="text-sm font-black text-slate-900">Your {rest.userTier} is fading!</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mb-3">Visit within 3 days to keep your {rest.userTier} Ripple status at this restaurant.</p>
                <button onClick={() => setShowHoldGold(p => !p)} className="text-[11px] font-black flex items-center gap-1" style={{ color: BRAND }}>
                  Hold onto {rest.userTier} <ChevronRight className="w-3 h-3" />
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
                  <TierRow key={o.tier} tier={o.tier} perk={o.perk} unlocked={o.unlocked} visitsNeeded={o.visitsNeeded} isActive={o.tier === rest.userTier} />
                ))}
              </div>

              {/* Earn Rewards Tasks */}
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="px-5 pt-5 pb-3 border-b border-slate-50">
                  <h3 className="text-sm font-black text-slate-900">Earn Rewards</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Complete tasks to unlock perks faster</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { title: 'Write a review on Google Maps', reward: 'Free Coke', icon: <MapIcon className="w-5 h-5 text-blue-500" /> },
                    { title: 'Share a photo of your meal', reward: 'Free Dessert', icon: <Camera className="w-5 h-5 text-rose-500" /> },
                    { title: 'Follow us on Instagram', reward: '+1 Visit', icon: <Smartphone className="w-5 h-5 text-purple-500" /> }
                  ].map((task, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                        {task.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-slate-900 truncate">{task.title}</p>
                        <p className="text-[11px] font-black text-green-600 mt-0.5 tracking-wide uppercase">{task.reward}</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-700 shrink-0 uppercase tracking-wide">
                        Do Task
                      </button>
                    </div>
                  ))}
                </div>
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
              
              <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                <button 
                  onClick={() => setReviewTab('customers')}
                  className={`flex-1 py-2 rounded-lg text-[12px] font-black transition-colors ${reviewTab === 'customers' ? 'bg-[#FEF0EC] text-[#E8431A]' : 'text-slate-500'}`}
                >
                  Customers
                </button>
                <button 
                  onClick={() => setReviewTab('influencers')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-black transition-colors ${reviewTab === 'influencers' ? 'bg-[#FEF0EC] text-[#E8431A]' : 'text-slate-500'}`}
                >
                  <Video className="w-3.5 h-3.5" /> Influencers
                </button>
              </div>

              {reviewTab === 'customers' ? (
                <>
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
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
                          {review.images.map((img, idx) => (
                            <img key={idx} src={img} alt="Review photo" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { author: '@foodienyc', likes: '12k', img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=300&h=533&fit=crop' },
                    { author: '@nycbites',  likes: '8.4k', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=533&fit=crop' },
                    { author: '@eatwithme', likes: '21k', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=533&fit=crop' },
                    { author: '@chef_jane', likes: '5.1k', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=533&fit=crop' },
                  ].map((vid, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 group cursor-pointer">
                      <img src={vid.img} alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                        <Heart className="w-3 h-3 text-white fill-white" />
                        <span className="text-[10px] font-bold text-white">{vid.likes}</span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-5 h-5 rounded-full bg-slate-200 border border-white/20 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/80?u=${i+20}`} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-black text-white truncate">{vid.author}</span>
                        </div>
                        <p className="text-[9px] text-white/80 font-medium line-clamp-2 leading-tight">Must try the truffle fries here! 🍟✨</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-y-transparent border-l-white ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PHOTOS */}
          {activeTab === 'photos' && (
            <motion.div key="photos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {['All', 'Interior', 'Food', 'Drinks'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setPhotoFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${photoFilter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {rest.photos
                  .filter((p: any) => photoFilter === 'All' || p.category === photoFilter)
                  .map((photo: any, i: number) => (
                  <motion.div key={i} whileTap={{ scale: 0.96 }}
                    className={`rounded-2xl overflow-hidden bg-slate-100 ${i === 0 ? 'col-span-2 h-48' : 'h-36'}`}>
                    <img src={photo.url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
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
              <div className="bg-white rounded-3xl p-5 border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-4">Meet the team behind the food</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-3">
                  {[
                    { name: 'Michael', role: 'Head Chef', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' },
                    { name: 'Sarah', role: 'Manager', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' },
                    { name: 'David', role: 'Sommelier', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
                    { name: 'Elena', role: 'Host', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop' },
                  ].map(t => (
                    <div key={t.name} className="flex items-center gap-3">
                      <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                      <div>
                        <p className="text-sm font-black text-slate-900">{t.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
        {!rest.isOpen ? (
          <div className="flex-1 rounded-2xl bg-slate-200 text-slate-500 font-black text-sm flex flex-col items-center justify-center cursor-not-allowed border border-slate-300/50">
            <span>Closed Now</span>
            <span className="text-[10px] font-semibold opacity-70">Reopens Tomorrow</span>
          </div>
        ) : hasBooked ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('menu')}
            className="flex-1 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: BRAND }}
          >
            Pre-order Food
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowBooking(true)}
            className="flex-1 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: BRAND }}
          >
            Book a Table
          </motion.button>
        )}
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
                <div className="flex-1 flex flex-col items-center justify-center py-6 gap-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-center w-full px-5">
                    <p className="font-black text-lg text-slate-900">Booking Confirmed!</p>
                    <p className="text-sm text-slate-500 mt-1 mb-5">See you {selectedDate} at {selectedTime}</p>

                    {/* Pre-order choice cards */}
                    <div className="space-y-3 mb-4 text-left">
                      <button
                        onClick={() => { setShowBooking(false); setBookingConfirmed(false); setActiveTab('menu') }}
                        className="w-full bg-gradient-to-br from-[#E8431A] to-[#C0300D] text-white rounded-2xl p-4 text-left shadow-lg"
                      >
                        <p className="font-black text-sm">🏃 Pay Now & Skip the Wait</p>
                        <p className="text-white/80 text-[11px] mt-1 leading-snug">Pre-pay for your order. Your food will be ready when you arrive — no wait, guaranteed.</p>
                        <p className="text-white/60 text-[10px] mt-2">~20 min prep time · Cancellable up to 30 min before</p>
                        <div className="mt-3 bg-white/20 rounded-xl px-3 py-2 text-[11px] font-black text-white inline-block">Pre-order &amp; Pay Now →</div>
                      </button>

                      <button
                        onClick={() => { setShowBooking(false); setBookingConfirmed(false); setActiveTab('menu') }}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-left"
                      >
                        <p className="font-black text-sm text-slate-900">💳 Decide at the Restaurant</p>
                        <p className="text-slate-500 text-[11px] mt-1 leading-snug">Browse the menu in advance, but pay when you're there. Your selections are saved.</p>
                        <p className="text-slate-400 text-[10px] mt-2">No charge until you're there</p>
                        <div className="mt-3 bg-slate-100 rounded-xl px-3 py-2 text-[11px] font-black text-slate-700 inline-block">Browse Menu &amp; Save →</div>
                      </button>
                    </div>

                    <button onClick={() => { setShowBooking(false); setBookingConfirmed(false) }} className="w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-400">Close</button>
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

      {/* ── Upsell: Pairs Well With ── */}
      <AnimatePresence>
        {showUpsell && lastAdded && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed bottom-20 left-4 right-4 bg-white rounded-3xl shadow-2xl z-50 p-4 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-black text-slate-900"><span className="flex items-center gap-1.5"><Wine className="w-4 h-4 text-rose-600" /> Pairs perfectly with</span></p>
              <button onClick={() => setShowUpsell(false)} className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar">
              {[
                { name: 'Sparkling Water', price: 4, img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=120&h=120&fit=crop' },
                { name: 'House Wine',      price: 9, img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=120&h=120&fit=crop' },
                { name: 'Garlic Bread',   price: 6, img: 'https://images.unsplash.com/photo-1619531040914-3e50a5af3e6b?w=120&h=120&fit=crop' },
              ].map(u => (
                <div key={u.name} className="shrink-0 flex items-center gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-100">
                  <img src={u.img} alt={u.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="text-[11px] font-black text-slate-900">{u.name}</p>
                    <p className="text-[10px] text-slate-500">${u.price}</p>
                    <button
                      onClick={() => { addToCart({ id: u.name, name: u.name, desc: '', price: u.price.toString(), image: u.img }); setShowUpsell(false) }}
                      className="mt-1 text-[10px] font-black text-[#E8431A] bg-[#FEF0EC] px-2 py-0.5 rounded-full flex items-center gap-0.5"
                    >
                      <Plus className="w-2.5 h-2.5" /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
