import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Star, Heart, MessageSquare, Share2,
  CheckSquare, Palette, HelpCircle, Info, LogOut,
  Settings, ChevronRight, Edit3, Camera, Bell, X, CreditCard, MapPin
} from "lucide-react";

const BRAND = '#E8431A'

const USER = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/150?u=alex-ripple-2024",
  memberSince: "March 2023",
  points: 1250,
  pointsValue: 12.50,
  level: "Gold Rippler",
  totalSaved: 84.50,
  reviewCount: 12,
  savedCount: 8,
  beenHereCount: 24,
  sharedCount: 5,
};

const WISHLIST = [
  { id: "2", name: "Sushi Nami",     cuisine: "Japanese",   rating: 4.9, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=120&fit=crop" },
  { id: "3", name: "Bloom Bistro",   cuisine: "French",     rating: 4.7, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=120&fit=crop" },
];

type ProfileTab = "activity" | "wallet" | "saved";
type FlowItem = { id: string; icon: any; label: string; sub: string; color: string; bg: string; danger?: boolean; isSupport?: boolean };

const SECTION_LINKS: { section: string; items: FlowItem[] }[] = [
  {
    section: "My Activity",
    items: [
      { id: 'reviews', icon: MessageSquare, label: "Your Reviews",   sub: `${USER.reviewCount} reviews written`,  color: "text-blue-600",   bg: "bg-blue-50" },
      { id: 'saved',   icon: Heart,         label: "Saved Places",   sub: `${USER.savedCount} saved`,             color: "text-rose-500",   bg: "bg-rose-50" },
      { id: 'visited', icon: CheckSquare,   label: "Been Here",      sub: `${USER.beenHereCount} places visited`, color: "text-green-600",  bg: "bg-green-50" },
      { id: 'shared',  icon: Share2,        label: "Shared",         sub: `${USER.sharedCount} shares`,           color: "text-purple-600", bg: "bg-purple-50" },
    ]
  },
  {
    section: "Preferences",
    items: [
      { id: 'notifs',  icon: Bell,       label: "Notifications",   sub: "Manage alerts",         color: "text-orange-500", bg: "bg-orange-50" },
      { id: 'payment', icon: CreditCard, label: "Payment Methods", sub: "Cards, Apple Pay",      color: "text-cyan-600",   bg: "bg-cyan-50" },
      { id: 'address', icon: MapPin,     label: "Addresses",       sub: "Home, Work",            color: "text-amber-600",  bg: "bg-amber-50" },
      { id: 'theme',   icon: Palette,    label: "Theme",           sub: "Dark / Light / System", color: "text-indigo-600", bg: "bg-indigo-50" },
    ]
  },
  {
    section: "Support",
    items: [
      { id: 'help',     icon: HelpCircle, label: "Help & Support", sub: "FAQs, Chat, Tickets", color: "text-teal-600",  bg: "bg-teal-50", isSupport: true },
      { id: 'feedback', icon: MessageSquare, label: "Share Feedback", sub: "Help us improve",    color: "text-sky-600",   bg: "bg-sky-50" },
      { id: 'about',    icon: Info,       label: "About Ripple",   sub: "Version 2.1.0",       color: "text-slate-600", bg: "bg-slate-100" },
    ]
  },
  {
    section: "Account",
    items: [
      { id: 'settings', icon: Settings, label: "Account Settings", sub: "Security, privacy", color: "text-slate-600", bg: "bg-slate-100" },
      { id: 'logout',   icon: LogOut,   label: "Log Out",          sub: "",                  color: "text-rose-500",  bg: "bg-rose-50", danger: true },
    ]
  }
];

export function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>("activity");
  const [openFlow, setOpenFlow]   = useState<FlowItem | null>(null);

  const handleItemClick = (item: FlowItem) => {
    if (item.id === 'logout') {
      localStorage.removeItem('ripple_auth');
      navigate('/splash', { replace: true });
    } else {
      setOpenFlow(item);
    }
  };

  return (
    <div className="bg-[#F8F7F5] min-h-full flex flex-col">
      <div className="flex-1 pb-4">
        {/* ── Profile Header ── */}
        <div className="bg-white px-5 pt-4 pb-6 relative">
          <button onClick={() => setOpenFlow({ id: 'edit', icon: Edit3, label: 'Edit Profile', sub: '', color: 'text-slate-500', bg: 'bg-slate-100' })}
                  className="absolute top-4 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <Edit3 className="w-4 h-4 text-slate-500" />
          </button>

          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2" style={{ borderColor: '#FEF0EC' }}>
                <img src={USER.avatar} alt={USER.name} className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white" style={{ backgroundColor: BRAND }}>
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">{USER.name}</h1>
              <p className="text-xs text-slate-400 mt-0.5">{USER.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Droplets className="w-3.5 h-3.5" style={{ color: BRAND }} />
                <span className="text-xs font-black" style={{ color: BRAND }}>{USER.level}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-400">Since {USER.memberSince}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
              <p className="text-lg font-black text-slate-900">{USER.reviewCount}</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Reviews</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
              <p className="text-lg font-black text-slate-900">{USER.beenHereCount}</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Places</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center border border-green-100">
              <p className="text-lg font-black text-green-700">${USER.totalSaved}</p>
              <p className="text-[10px] text-green-600 font-semibold mt-0.5">Saved</p>
            </div>
          </div>
        </div>

        {/* ── Ripple Wallet Card ── */}
        <div className="px-4 -mt-2 mb-4">
          <div className="rounded-3xl p-5 text-white shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8431A, #C0300D)', boxShadow: '0 20px 25px -5px rgba(232,67,26,0.3)' }}>
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-lg" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />

            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/80 text-xs font-semibold mb-0.5">Ripple Points</p>
                  <div className="flex items-end gap-1.5">
                    <span className="text-4xl font-black">{USER.points.toLocaleString()}</span>
                    <span className="text-white/70 text-sm mb-1 font-semibold">pts</span>
                  </div>
                  <p className="text-white/80 text-xs mt-0.5">≈ ${USER.pointsValue.toFixed(2)} redeemable value</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl bg-white/20 text-xs font-black text-white backdrop-blur-sm">
                  Redeem Points
                </button>
                <button className="flex-1 py-2 rounded-xl bg-white text-xs font-black" style={{ color: BRAND }}>
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="px-4 mb-4 flex gap-2">
          {([
            { id: "activity", label: "Activity" },
            { id: "wallet",   label: "Rewards" },
            { id: "saved",    label: "Saved" },
          ] as { id: ProfileTab; label: string }[]).map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-colors ${
                activeTab === t.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Activity Tab ── */}
        {activeTab === "activity" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 space-y-4">
            {SECTION_LINKS.map(section => (
              <div key={section.section}>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">{section.section}</h3>
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
                  {section.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-slate-50 ${item.danger ? 'opacity-90' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                        <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${item.danger ? 'text-rose-500' : 'text-slate-800'}`}>{item.label}</p>
                        {item.sub && <p className="text-[11px] text-slate-400 mt-0.5">{item.sub}</p>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Wallet / Rewards Tab ── */}
        {activeTab === "wallet" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 p-5">
              <h3 className="text-sm font-black text-slate-900 mb-4">How to Earn 🌊</h3>
              <div className="space-y-3">
                {[
                  { emoji: "🍽️", action: "Dine at a restaurant",       points: "+50 pts" },
                  { emoji: "⭐", action: "Write a review",              points: "+20 pts" },
                  { emoji: "📅", action: "Book through Ripple",         points: "+30 pts" },
                  { emoji: "👥", action: "Refer a friend",              points: "+100 pts" },
                  { emoji: "📸", action: "Share a photo",               points: "+10 pts" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <p className="text-sm text-slate-700 font-medium">{item.action}</p>
                    </div>
                    <span className="text-sm font-black" style={{ color: BRAND }}>{item.points}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-5">
              <h3 className="text-sm font-black text-slate-900 mb-4">Redeem Points</h3>
              <div className="space-y-3">
                {[
                  { emoji: "🎁", label: "$10 Amazon Gift Card",  pts: 1000 },
                  { emoji: "🍕", label: "Free Pizza (any partner restaurant)", pts: 800 },
                  { emoji: "💳", label: "$5 Bill Credit",        pts: 500 },
                  { emoji: "🚕", label: "$10 Uber Credit",       pts: 1000 },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{r.emoji}</span>
                      <p className="text-xs font-semibold text-slate-700">{r.label}</p>
                    </div>
                    <button disabled={USER.points < r.pts} className={`px-3 py-1.5 rounded-xl text-xs font-black text-white ${USER.points >= r.pts ? '' : 'opacity-30'}`} style={USER.points >= r.pts ? { backgroundColor: BRAND } : { backgroundColor: '#94a3b8' }}>
                      {r.pts.toLocaleString()} pts
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Saved Tab ── */}
        {activeTab === "saved" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 space-y-3">
            {WISHLIST.map(place => (
              <Link to={`/restaurant/${place.id}`} key={place.id}>
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex shadow-sm mb-3">
                  <img src={place.image} alt={place.name} className="w-24 h-24 object-cover shrink-0" />
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h4 className="font-black text-[15px] text-slate-900 leading-tight">{place.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{place.cuisine}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-slate-700">{place.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center pr-4">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </div>
                </div>
              </Link>
            ))}
            <Link to="/restaurants" className="block text-center py-3 text-sm font-bold" style={{ color: BRAND }}>
              + Explore more restaurants
            </Link>
          </motion.div>
        )}
      </div>

      {/* ── Dummy Flow Drawer ── */}
      <AnimatePresence>
        {openFlow && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenFlow(null)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: '85%' }}
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              <div className="px-5 py-3 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${openFlow.bg} flex items-center justify-center shrink-0`}>
                    <openFlow.icon className={`w-4 h-4 ${openFlow.color}`} />
                  </div>
                  <h2 className="text-lg font-black text-slate-900">{openFlow.label}</h2>
                </div>
                <button onClick={() => setOpenFlow(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>

              <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-8">
                {openFlow.isSupport ? (
                  // Support specifically
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 font-semibold mb-2">How can we help you today?</p>
                    {[
                      'I have a question about a booking',
                      'I need an invoice or receipt',
                      'How do Ripple points work?',
                      'Chat with a support agent',
                      'Call us toll-free (1-800-RIPPLE)',
                    ].map((opt, i) => (
                      <button key={i} className="w-full text-left bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 active:bg-slate-100 transition-colors">
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  // Generic Dummy Flow
                  <div className="flex flex-col items-center justify-center h-full text-center py-10 gap-4">
                    <div className={`w-20 h-20 rounded-full ${openFlow.bg} flex items-center justify-center`}>
                      <openFlow.icon className={`w-10 h-10 ${openFlow.color}`} />
                    </div>
                    <div>
                      <p className="font-black text-xl text-slate-900">{openFlow.label}</p>
                      <p className="text-sm text-slate-500 mt-2 font-medium">This is a prototype flow for {openFlow.label.toLowerCase()}. In the full app, you would manage your {openFlow.label.toLowerCase()} here.</p>
                    </div>
                    <button onClick={() => setOpenFlow(null)} className="mt-4 px-8 py-3 rounded-2xl font-black text-white" style={{ backgroundColor: BRAND }}>Close</button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
