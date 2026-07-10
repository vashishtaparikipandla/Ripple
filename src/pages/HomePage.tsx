import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, MapPin, Search, Star, Heart, Droplets,
  AlertTriangle, X, ChevronRight, ChevronDown, TrendingUp, Award,
  PartyPopper, Sparkles, Coffee, Music, UtensilsCrossed,
  Sunset, Moon, Salad, Zap, Clock
} from 'lucide-react'

const BRAND = '#E8431A'

const STORIES = [
  { id: 1, handle: '@foodienyc', name: 'Emma Chen', avatar: 'https://i.pravatar.cc/80?u=10', restaurant: 'The Rustic Spoon', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=400&fit=crop', caption: '"The truffle risotto changed my life. Gold status well earned 🥇"', tag: 'Gold Member' },
  { id: 2, handle: '@nycbites',  name: 'Marcus J.',  avatar: 'https://i.pravatar.cc/80?u=11', restaurant: 'Sushi Nami',       image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=400&fit=crop', caption: '"Omakase for 2 — Ripple made it 20% cheaper. Platinum goals 🍣"', tag: 'Platinum Member' },
  { id: 3, handle: '@eatwithme', name: 'Priya S.',   avatar: 'https://i.pravatar.cc/80?u=12', restaurant: 'Bloom Bistro',     image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=400&fit=crop', caption: '"Brunch every Sunday here — Silver already in month 1!"',        tag: 'Silver Member' },
]

const FLASH_DEALS = [
  { id: '1', name: 'The Rustic Spoon', off: '20% OFF', expires: 47, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=180&fit=crop', badge: 'Flash Deal' },
  { id: '4', name: 'Rooftop Garden',   off: '30% OFF', expires: 23, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=180&fit=crop', badge: 'Tonight Only' },
  { id: '2', name: 'Sushi Nami',       off: '15% OFF', expires: 89, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=180&fit=crop', badge: 'Lunch Special' },
]

function FlashTimer({ minutes }: { minutes: number }) {
  const [mins, setMins] = useState(minutes)
  useEffect(() => {
    const t = setInterval(() => setMins(m => Math.max(0, m - 1)), 60000)
    return () => clearInterval(t)
  }, [])
  const urgent = mins <= 30
  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black ${urgent ? 'bg-red-500 text-white animate-pulse' : 'bg-black/50 text-white backdrop-blur-sm'}`}>
      <Clock className="w-2.5 h-2.5" />
      <span>{mins}m left</span>
    </div>
  )
}

const MOODS = [
  { id: 'drink-dine',  Icon: Droplets,        label: 'Drink & Dine',  bg: '#FEF0EC', color: '#E8431A' },
  { id: 'fine-dining', Icon: Award,            label: 'Fine Dining',   bg: '#FFFBEB', color: '#B45309' },
  { id: 'fresh-finds', Icon: Salad,            label: 'Fresh Finds',   bg: '#ECFDF5', color: '#059669' },
  { id: 'rooftops',    Icon: Sunset,           label: 'Rooftops',      bg: '#EFF6FF', color: '#2563EB' },
  { id: 'party-vibes', Icon: Music,            label: 'Party Vibes',   bg: '#FDF4FF', color: '#9333EA' },
  { id: 'cozy-cafes',  Icon: Coffee,           label: 'Cozy Cafes',    bg: '#FFF7ED', color: '#D97706' },
  { id: 'buffet',      Icon: UtensilsCrossed,  label: 'Buffet',        bg: '#ECFDF5', color: '#16A34A' },
  { id: 'date-night',  Icon: Moon,             label: 'Date Night',    bg: '#FFF1F2', color: '#E11D48' },
]

const DEALS = [
  { id: '1', name: 'The Rustic Spoon', cuisine: 'Modern American', discount: '10% off', tag: 'Silver Ripple',   tagCls: 'badge-silver', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=180&fit=crop' },
  { id: '4', name: 'Rooftop Garden',   cuisine: 'Contemporary',    discount: '30% off', tag: 'Tonight only',    tagCls: 'badge-gold',   image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=180&fit=crop' },
  { id: '5', name: 'Cozy Corner Cafe', cuisine: 'Cafe & Brunch',   discount: '15% off', tag: 'Gold member',     tagCls: 'badge-gold',   image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=180&fit=crop' },
  { id: '2', name: 'Sushi Nami',       cuisine: 'Japanese',        discount: '12% off', tag: 'New on Ripple',   tagCls: 'badge-bronze', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=180&fit=crop' },
]

const TRENDING = [
  { id: '1', name: 'The Rustic Spoon', cuisine: 'Modern American', rating: 4.8, dist: '0.8 mi', isSaved: true,  tier: 'Silver', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=120&fit=crop' },
  { id: '2', name: 'Sushi Nami',       cuisine: 'Japanese',        rating: 4.9, dist: '1.2 mi', isSaved: false, tier: null,     image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=120&h=120&fit=crop' },
  { id: '3', name: 'Bloom Bistro',     cuisine: 'French',          rating: 4.7, dist: '2.1 mi', isSaved: false, tier: 'Bronze', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&h=120&fit=crop' },
  { id: '4', name: 'Rooftop Garden',   cuisine: 'Contemporary',    rating: 4.6, dist: '0.5 mi', isSaved: false, tier: null,     image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=120&h=120&fit=crop' },
]

const CURATED = [
  { id: 1, title: 'Top 10 Romantic Spots', subtitle: 'Perfect for date night', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=200&fit=crop' },
  { id: 2, title: 'Best Asian Fusion', subtitle: 'Spice up your week', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=200&fit=crop' },
]

const COMMUNITY_POSTS = [
  { id: 1, handle: '@biteswithbella', name: 'Bella R.', avatar: 'https://i.pravatar.cc/80?u=20', restaurant: 'Bloom Bistro', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=500&fit=crop', caption: '"Literally the best brunch spot in the city right now"', tier: 'Gold', likes: 3241, saves: 187 },
  { id: 2, handle: '@manhattaneats', name: 'Tyler V.', avatar: 'https://i.pravatar.cc/80?u=21', restaurant: 'Rooftop Garden', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=500&fit=crop', caption: '"Sunsets + cocktails. Ripple got me 30% off this view 🌅"', tier: 'Platinum', likes: 8912, saves: 441 },
  { id: 3, handle: '@spicyspoonful', name: 'Nadia K.', avatar: 'https://i.pravatar.cc/80?u=22', restaurant: 'Sushi Nami', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=500&fit=crop', caption: '"Omakase season has arrived. This is life 🍣"', tier: 'Silver', likes: 2105, saves: 98 },
]

const MEMBER_LOVES = [
  { id: 1, member: 'Jamie L.', avatar: 'https://i.pravatar.cc/80?u=30', restaurant: 'The Rustic Spoon', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop', quote: '"My go-to for client dinners. The Silver Ripple discount literally pays for itself."', tier: 'Silver', visits: 8 },
  { id: 2, member: 'Priya M.', avatar: 'https://i.pravatar.cc/80?u=31', restaurant: 'Cozy Corner Cafe', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=300&fit=crop', quote: '"Started going every Sunday. Gold in 2 months. The croissants are worth it."', tier: 'Gold', visits: 14 },
  { id: 3, member: 'Carlos D.', avatar: 'https://i.pravatar.cc/80?u=32', restaurant: 'Rooftop Garden', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=300&fit=crop', quote: '"Best date night spot. Platinum status means chef\'s table access every time."', tier: 'Platinum', visits: 22 },
]

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
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
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

export function HomePage() {
  const [saved, setSaved]             = useState<Record<string, boolean>>({ '1': true })
  const [showDegradation, setShowDeg] = useState(true)
  const [showLevelUp, setShowLevelUp] = useState(true)
  const [levelUpClicked, setLevelUpClicked] = useState(false)
  const navigate = useNavigate()
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll logic for carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        const maxScroll = scrollWidth - clientWidth
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' })
        }
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setSaved(p => ({ ...p, [id]: !p[id] }))
  }

  return (
    <div className="bg-[#F7F5F2] min-h-full pb-4">

      {/* ── Top Bar ── */}
      <div className="bg-white px-5 pt-2 pb-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: BRAND }}>
            <Droplets className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-none">Ripple</h1>
            <Link to="/location" className="flex items-center gap-1 mt-0.5 active:opacity-50">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500 font-semibold">Manhattan, NY</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/search" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <Search className="w-4.5 h-4.5 text-slate-600" />
          </Link>
          <Link to="/notifications" className="relative w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <Bell className="w-4.5 h-4.5 text-slate-600" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: BRAND }} />
          </Link>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">

        {/* ── Top Carousel ── */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-2"
        >
          {/* Slide 1: Current Booking */}
          <div className="shrink-0 w-[85%] snap-center">
            <motion.div
              onClick={() => navigate('/restaurant/1?demo=gold')}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm relative overflow-hidden cursor-pointer h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-1.5 bg-green-100 px-2 py-1 rounded-md mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">Current Booking</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex gap-3 relative z-10 mb-4 flex-1">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=120&fit=crop" alt="The Rustic Spoon" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div>
                  <h3 className="font-black text-slate-900 leading-tight">The Rustic Spoon</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Today at 19:30 · 2 guests</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Droplets className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600">1 visit away from Gold!</span>
                  </div>
                </div>
              </div>
              
              {/* Action CTAs */}
              <div className="flex gap-2 relative z-10 mt-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); alert('Checked in successfully!') }}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8431A] text-[#E8431A] text-xs font-black bg-[#FEF0EC]"
                >
                  Check-in
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/restaurant/1?tab=menu') }}
                  className="flex-1 py-2.5 rounded-xl text-white text-xs font-black"
                  style={{ backgroundColor: BRAND }}
                >
                  Pre-order
                </button>
              </div>
            </motion.div>
          </div>

          {/* Slide 2: Degradation Warning Card */}
          <AnimatePresence>
            {showDegradation && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '85%' }}
                exit={{ opacity: 0, width: 0 }}
                className="shrink-0 snap-center overflow-hidden"
              >
                <Link to="/restaurant/1" className="block h-full">
                  <div className="rounded-3xl p-4 border border-[#E8431A]/20 relative overflow-hidden h-full flex flex-col justify-center"
                       style={{ background: 'linear-gradient(135deg, #FEF0EC, #FFF)' }}>
                    <button
                      onClick={e => { e.preventDefault(); setShowDeg(false) }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center"
                    >
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                           style={{ backgroundColor: '#E8431A' }}>
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pr-6">
                        <p className="text-sm font-black text-slate-900 leading-tight">Your Silver is fading at The Rustic Spoon</p>
                        <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                          Visit within 3 days or share with a friend to keep your Silver status.
                        </p>
                        <div className="flex items-center gap-1 mt-2" style={{ color: BRAND }}>
                          <span className="text-[11px] font-black">Tap to hold your Silver</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide 3: Level Up Congratulations Card */}
          <AnimatePresence>
            {showLevelUp && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '85%' }}
                exit={{ opacity: 0, width: 0 }}
                className="shrink-0 snap-center overflow-hidden"
              >
                <Link to="/restaurant/2" className="block h-full">
                  <motion.div
                    onClick={() => setLevelUpClicked(true)}
                    className="rounded-3xl p-4 relative overflow-hidden h-full flex flex-col justify-center"
                    style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}
                  >
                    {levelUpClicked && <Confetti />}
                    <button
                      onClick={e => { e.preventDefault(); setShowLevelUp(false) }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center z-10"
                    >
                      <X className="w-3.5 h-3.5 text-white/60" />
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl badge-silver flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pr-6">
                        <p className="text-sm font-black text-white leading-tight">You've Rippled to Silver! 🎉</p>
                        <p className="text-[11px] text-white/60 font-medium mt-1 leading-tight">
                          5 visits to Sushi Nami this month. Unlock 10% off + free soft drink.
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-amber-400">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-black">View your new Ripple status</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide 4: Ripple Points Banner */}
          <div className="shrink-0 w-[85%] snap-center">
            <div className="rounded-3xl p-4 flex flex-col justify-center gap-4 h-full"
                 style={{ background: 'linear-gradient(135deg, #E8431A, #C0300D)' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-wider">Ripple Points</p>
                  <p className="text-white text-2xl font-black leading-tight">1,250 <span className="text-base font-bold opacity-70">pts</span></p>
                  <p className="text-white/60 text-[10px] font-semibold">≈ $12.50 value</p>
                </div>
                <Link to="/profile/redeem" className="px-4 py-2 bg-white rounded-xl text-xs font-black" style={{ color: BRAND }}>
                  Redeem
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── USP Tagline ── */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-slate-200" />
          <p className="text-xs font-black text-slate-400 whitespace-nowrap tracking-wide uppercase">Save while you savour</p>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* ── Mood Carousel ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">What's the vibe?</h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
            {MOODS.map(m => (
              <Link key={m.id} to={`/restaurants?mood=${m.id}`}>
                <motion.div whileTap={{ scale: 0.93 }} className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                       style={{ backgroundColor: m.bg }}>
                    <m.Icon className="w-7 h-7" style={{ color: m.color }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 text-center leading-tight w-16">{m.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Hot Deals ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">Hot deals near you</h2>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
            {DEALS.map(d => (
              <Link key={d.id} to={`/restaurant/${d.id}`}>
                <motion.div whileTap={{ scale: 0.97 }} className="shrink-0 w-52 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                  <div className="h-32 relative">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    {d.tagCls && (
                      <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-black text-white ${d.tagCls}`}>
                        {d.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-black text-[13px] text-slate-900 truncate">{d.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{d.cuisine}</p>
                    <p className="text-xs font-bold mt-1" style={{ color: BRAND }}>{d.discount}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Trending Near You ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">Trending near you</h2>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="space-y-3">
            {TRENDING.map((r, i) => (
              <Link key={r.id} to={`/restaurant/${r.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-3xl flex items-center gap-3 p-3 border border-slate-100 shadow-sm mb-3"
                >
                  <div className="relative shrink-0">
                    <img src={r.image} alt={r.name} className="w-16 h-16 rounded-2xl object-cover" />
                    {r.tier && (
                      <div className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black text-white shadow-md badge-${r.tier.toLowerCase()}`}>
                        {r.tier}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-[14px] text-slate-900 truncate">{r.name}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-800">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{r.cuisine}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] text-slate-400 font-semibold">{r.dist}</span>
                    </div>
                  </div>
                  <button onClick={e => toggleSave(e, r.id)} className="shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                    <Heart className={`w-4 h-4 ${saved[r.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
                  </button>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Spotted by Your Community ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Spotted by your community</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Real visits, real vibes — from Ripple members near you</p>
            </div>
            <Link to="/restaurants" className="text-xs font-black shrink-0" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
            {COMMUNITY_POSTS.map(post => (
              <motion.div key={post.id} whileTap={{ scale: 0.97 }} className="shrink-0 w-44 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                <div className="relative" style={{ height: 260 }}>
                  <img src={post.image} alt={post.restaurant} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {/* Tier badge */}
                  <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-black text-white badge-${post.tier.toLowerCase()}`}>
                    {post.tier} Rippler
                  </div>
                  {/* Author info */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <img src={post.avatar} alt={post.name} className="w-6 h-6 rounded-full border border-white/60 object-cover" />
                      <div>
                        <p className="text-white text-[10px] font-black leading-none">{post.name}</p>
                        <p className="text-white/60 text-[9px] font-semibold">{post.handle}</p>
                      </div>
                    </div>
                    <p className="text-white text-[10px] font-medium leading-snug">{post.caption}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-white/60 text-[9px] font-bold">❤️ {post.likes.toLocaleString()}</span>
                      <span className="text-white/60 text-[9px] font-bold">🔖 {post.saves}</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2.5 flex items-center justify-between">
                  <p className="text-[11px] font-black text-slate-700 truncate">{post.restaurant}</p>
                  <Link to="/restaurant/1" className="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: '#FEF0EC', color: BRAND }}>Visit →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Quick Explore by Theme ── */}
        <div>
          <h2 className="text-lg font-black text-slate-900 mb-3">Explore by theme</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Best for Date Night', icon: Moon, path: '/restaurants?mood=date-night', bg: '#FFF1F2', color: '#E11D48' },
              { label: 'Top Rated This Week', icon: TrendingUp, path: '/restaurants', bg: '#FEF0EC', color: '#E8431A' },
              { label: 'Happy Hour Deals',    icon: PartyPopper, path: '/restaurants?mood=drink-dine', bg: '#F5F3FF', color: '#7C3AED' },
              { label: 'Quick Bites Under $30', icon: Sparkles, path: '/restaurants', bg: '#ECFDF5', color: '#059669' },
            ].map((t, i) => (
              <Link key={i} to={t.path}>
                <motion.div whileTap={{ scale: 0.96 }}
                  className="rounded-3xl p-4 flex flex-col gap-3 border border-slate-100 shadow-sm"
                  style={{ backgroundColor: t.bg }}>
                  <t.icon className="w-6 h-6" style={{ color: t.color }} />
                  <p className="text-[12px] font-black text-slate-800 leading-tight">{t.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── What Members Are Loving ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">What members are loving</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Recommended by regulars in your neighborhood</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
            {MEMBER_LOVES.map(m => (
              <Link key={m.id} to="/restaurant/1">
                <motion.div whileTap={{ scale: 0.97 }} className="shrink-0 w-72 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                  <div className="h-36 relative">
                    <img src={m.image} alt={m.restaurant} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black text-white badge-${m.tier.toLowerCase()}`}>
                      {m.tier} · {m.visits} visits
                    </div>
                    <p className="absolute bottom-3 left-4 right-4 text-white text-[11px] font-black leading-snug">{m.restaurant}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-[12px] text-slate-600 font-medium leading-relaxed italic">{m.quote}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <img src={m.avatar} alt={m.member} className="w-7 h-7 rounded-full object-cover border-2" style={{ borderColor: '#FEF0EC' }} />
                      <div>
                        <p className="text-[11px] font-black text-slate-900">{m.member}</p>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Verified Ripple Member</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── New on Ripple ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">New on Ripple</h2>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
            {TRENDING.slice().reverse().map(r => (
              <Link key={`new-${r.id}`} to="/restaurant">
                <motion.div whileTap={{ scale: 0.96 }} className="w-48 shrink-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
                  <div className="h-28 relative">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-black text-[13px] text-slate-900 truncate">{r.name}</h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{r.cuisine}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black text-slate-800">{r.rating}</span>
                      </div>
                      <span className="text-slate-300">·</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{r.dist}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Hidden Gems ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">Hidden Gems</h2>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="space-y-3">
            {TRENDING.slice(1, 3).map(r => (
              <Link key={`gem-${r.id}`} to={`/restaurant/${r.id}`}>
                <motion.div whileTap={{ scale: 0.98 }} className="bg-white rounded-3xl flex items-center gap-3 p-3 border border-slate-100 shadow-sm">
                  <div className="relative shrink-0">
                    <img src={r.image} alt={r.name} className="w-16 h-16 rounded-2xl object-cover" />
                    {r.tier && (
                      <div className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black text-white shadow-md badge-${r.tier.toLowerCase()}`}>
                        {r.tier}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-[14px] text-slate-900 truncate">{r.name}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-800">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{r.cuisine}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] text-slate-400 font-semibold">{r.dist}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Fast Casual ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">Fast Casual</h2>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
            {TRENDING.slice(0, 3).map(r => (
              <Link key={`fast-${r.id}`} to="/restaurant">
                <motion.div whileTap={{ scale: 0.96 }} className="w-48 shrink-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col">
                  <div className="h-28 relative">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-black text-[13px] text-slate-900 truncate">{r.name}</h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{r.cuisine}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black text-slate-800">{r.rating}</span>
                      </div>
                      <span className="text-slate-300">·</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{r.dist}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Late Night Bites ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-slate-900">Late Night Bites</h2>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="space-y-3">
            {TRENDING.slice(2, 4).map(r => (
              <Link key={`late-${r.id}`} to={`/restaurant/${r.id}`}>
                <motion.div whileTap={{ scale: 0.98 }} className="bg-white rounded-3xl flex items-center gap-3 p-3 border border-slate-100 shadow-sm">
                  <div className="relative shrink-0">
                    <img src={r.image} alt={r.name} className="w-16 h-16 rounded-2xl object-cover" />
                    {r.tier && (
                      <div className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black text-white shadow-md badge-${r.tier.toLowerCase()}`}>
                        {r.tier}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-black text-[14px] text-slate-900 truncate">{r.name}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-slate-800">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{r.cuisine}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] text-slate-400 font-semibold">{r.dist}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Curated For You ── */}
        <div>
          <h2 className="text-lg font-black text-slate-900 mb-3">Curated for you</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
            {CURATED.map(c => (
              <Link key={c.id} to="/restaurants">
                <motion.div whileTap={{ scale: 0.97 }} className="shrink-0 w-64 rounded-3xl overflow-hidden shadow-sm relative h-36">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-black text-white text-lg leading-tight">{c.title}</p>
                    <p className="text-[11px] text-white/80 font-medium mt-0.5">{c.subtitle}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>


        {/* ── Ripple Stories ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Ripple Stories</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Real diners, real savings</p>
            </div>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
            {STORIES.map(s => (
              <motion.div key={s.id} whileTap={{ scale: 0.97 }} className="shrink-0 w-52 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                <div className="h-48 relative">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className={`px-2 py-0.5 rounded-full text-[9px] font-black text-white ${s.tag.includes('Gold') ? 'badge-gold' : s.tag.includes('Platinum') ? 'badge-platinum' : 'badge-silver'}`}>
                      {s.tag}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                      <div>
                        <p className="text-white text-[11px] font-black leading-none">{s.name}</p>
                        <p className="text-white/60 text-[9px] font-semibold">{s.handle}</p>
                      </div>
                    </div>
                    <p className="text-white text-[10px] font-medium leading-snug">{s.caption}</p>
                  </div>
                </div>
                <div className="px-3 py-2.5 flex items-center justify-between">
                  <p className="text-[11px] font-black text-slate-700 truncate">{s.restaurant}</p>
                  <Link to={`/restaurant/${s.id}`} className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ backgroundColor: '#FEF0EC', color: BRAND }}>
                    Visit →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Flash Deals ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
            <h2 className="text-lg font-black text-slate-900">Flash Deals</h2>
            <span className="ml-auto text-xs font-black" style={{ color: BRAND }}>Limited time</span>
          </div>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-5 px-5">
            {FLASH_DEALS.map(d => (
              <Link key={d.id} to={`/restaurant/${d.id}`}>
                <motion.div whileTap={{ scale: 0.97 }} className="shrink-0 w-52 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                  <div className="h-32 relative">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <FlashTimer minutes={d.expires} />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{d.badge}</span>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-black text-[13px] text-slate-900 truncate">{d.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">Limited time offer</p>
                    </div>
                    <span className="text-base font-black" style={{ color: BRAND }}>{d.off}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Budget Picks ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Best Under $25</h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Great meals, even better value</p>
            </div>
            <Link to="/restaurants" className="text-xs font-black" style={{ color: BRAND }}>See all</Link>
          </div>
          <div className="space-y-3">
            {TRENDING.slice(1, 4).map((r, i) => (
              <Link key={`budget-${r.id}`} to={`/restaurant/${r.id}`}>
                <motion.div whileTap={{ scale: 0.98 }} className="bg-white rounded-3xl flex items-center gap-3 p-3 border border-slate-100 shadow-sm mb-3">
                  <div className="relative shrink-0">
                    <img src={r.image} alt={r.name} className="w-16 h-16 rounded-2xl object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                      ${[18, 22, 14][i]} avg
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[14px] text-slate-900 truncate">{r.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{r.cuisine}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-slate-800">{r.rating}</span>
                      <span className="text-slate-300">·</span>
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] text-slate-400 font-semibold">{r.dist}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Daily Food Quote ── */}

        <div className="py-6 px-4 text-center pb-24">
          <p className="text-xl font-black text-slate-300">"</p>
          <p className="text-sm font-semibold text-slate-500 italic mt-1 leading-relaxed">People who love to eat are always the best people.</p>
          <p className="text-xs font-black text-slate-400 mt-2 uppercase tracking-widest">— Julia Child</p>
        </div>

      </div>
    </div>
  )
}
