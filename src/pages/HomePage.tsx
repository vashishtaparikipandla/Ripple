import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, MapPin, Search, Star, Heart, Droplets,
  AlertTriangle, X, ChevronRight, TrendingUp, Award,
  PartyPopper, Sparkles, Coffee, Music, UtensilsCrossed,
  Sunset, Moon, Salad
} from 'lucide-react'

const BRAND = '#E8431A'

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
  { id: '1', name: 'The Rustic Spoon', discount: '10% off', tag: 'Silver Ripple',   tagCls: 'badge-silver', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=180&fit=crop' },
  { id: '4', name: 'Rooftop Garden',   discount: '30% off', tag: 'Tonight only',    tagCls: 'badge-gold',   image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=180&fit=crop' },
  { id: '5', name: 'Cozy Corner Cafe', discount: '15% off', tag: 'Gold member',     tagCls: 'badge-gold',   image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=180&fit=crop' },
  { id: '2', name: 'Sushi Nami',       discount: '12% off', tag: 'New on Ripple',   tagCls: 'badge-bronze', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=180&fit=crop' },
]

const TRENDING = [
  { id: '1', name: 'The Rustic Spoon', cuisine: 'Modern American', rating: 4.8, dist: '0.8 mi', isSaved: true,  tier: 'Silver', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=120&fit=crop' },
  { id: '2', name: 'Sushi Nami',       cuisine: 'Japanese',        rating: 4.9, dist: '1.2 mi', isSaved: false, tier: null,     image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=120&h=120&fit=crop' },
  { id: '3', name: 'Bloom Bistro',     cuisine: 'French',          rating: 4.7, dist: '2.1 mi', isSaved: false, tier: 'Bronze', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&h=120&fit=crop' },
  { id: '4', name: 'Rooftop Garden',   cuisine: 'Contemporary',    rating: 4.6, dist: '0.5 mi', isSaved: false, tier: null,     image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=120&h=120&fit=crop' },
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
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500 font-semibold">Manhattan, NY</span>
            </div>
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

        {/* ── Current Booking (Demo Flow) ── */}
        <Link to="/restaurant/1?demo=gold">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="flex items-center gap-1.5 bg-green-100 px-2 py-1 rounded-md mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">Current Booking</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
            <div className="flex gap-3 relative z-10">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=120&fit=crop" alt="The Rustic Spoon" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
              <div>
                <h3 className="font-black text-slate-900 leading-tight">The Rustic Spoon</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Today at 19:30 · 2 guests</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Droplets className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600">You're 1 visit away from Gold!</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* ── Degradation Warning Card ── */}
        <AnimatePresence>
          {showDegradation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Link to="/restaurant/1">
                <div className="rounded-3xl p-4 border border-[#E8431A]/20 relative overflow-hidden"
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
                      <p className="text-sm font-black text-slate-900">Your Gold is fading at The Rustic Spoon</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">
                        Visit within 3 days or share with a friend to keep your Gold Ripple status.
                      </p>
                      <div className="flex items-center gap-1 mt-2" style={{ color: BRAND }}>
                        <span className="text-[11px] font-black">Tap to hold your Gold</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Level Up Congratulations Card ── */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="overflow-hidden"
            >
              <Link to="/restaurant/2">
                <motion.div
                  onClick={() => setLevelUpClicked(true)}
                  className="rounded-3xl p-4 relative overflow-hidden"
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
                      <p className="text-sm font-black text-white">You've Rippled to Silver! 🎉</p>
                      <p className="text-[11px] text-white/60 font-medium mt-1">
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

        {/* ── Ripple Points Banner ── */}
        <div className="rounded-3xl p-4 flex items-center gap-4"
             style={{ background: 'linear-gradient(135deg, #E8431A, #C0300D)' }}>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/70 text-[10px] font-black uppercase tracking-wider">Ripple Points</p>
            <p className="text-white text-2xl font-black leading-tight">1,250 <span className="text-base font-bold opacity-70">pts</span></p>
            <p className="text-white/60 text-[10px] font-semibold">≈ $12.50 value</p>
          </div>
          <Link to="/profile" className="px-4 py-2 bg-white rounded-xl text-xs font-black" style={{ color: BRAND }}>
            Redeem
          </Link>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-black text-white ${d.tagCls}`}>
                      {d.tag}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-black text-[13px] text-slate-900 truncate">{d.name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: BRAND }}>{d.discount}</p>
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

      </div>
    </div>
  )
}
