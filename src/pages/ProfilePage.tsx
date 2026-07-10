import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Heart, MessageSquare, Share2,
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

type FlowItem = { id: string; icon: any; label: string; sub: string; color: string; bg: string; danger?: boolean; isSupport?: boolean; path?: string };

const SECTION_LINKS: { section: string; items: FlowItem[] }[] = [
  {
    section: "My Activity",
    items: [
      { id: 'reviews', icon: MessageSquare, label: "Your Reviews",   sub: `${USER.reviewCount} reviews written`,  color: "text-blue-600",   bg: "bg-blue-50", path: "/profile/reviews" },
      { id: 'saved',   icon: Heart,         label: "Saved Places",   sub: `${USER.savedCount} saved`,             color: "text-rose-500",   bg: "bg-rose-50", path: "/profile/saved" },
      { id: 'visited', icon: CheckSquare,   label: "Been Here",      sub: `${USER.beenHereCount} places visited`, color: "text-green-600",  bg: "bg-green-50" },
      { id: 'shared',  icon: Share2,        label: "Shared",         sub: `${USER.sharedCount} shares`,           color: "text-purple-600", bg: "bg-purple-50", path: "/profile/shared" },
    ]
  },
  {
    section: "Preferences",
    items: [
      { id: 'notifs',  icon: Bell,       label: "Notifications",   sub: "Manage alerts",         color: "text-orange-500", bg: "bg-orange-50", path: "/profile/notifications" },
      { id: 'payment', icon: CreditCard, label: "Payment Methods", sub: "Cards, Apple Pay",      color: "text-cyan-600",   bg: "bg-cyan-50" },
      { id: 'address', icon: MapPin,     label: "Addresses",       sub: "Home, Work",            color: "text-amber-600",  bg: "bg-amber-50", path: "/profile/addresses" },
      { id: 'theme',   icon: Palette,    label: "Theme",           sub: "Dark / Light / System", color: "text-indigo-600", bg: "bg-indigo-50", path: "/profile/theme" },
      { id: 'food',    icon: Heart,      label: "Dietary Needs",   sub: "Allergies & preferences", color: "text-rose-600", bg: "bg-rose-50", path: "/profile/preferences" },
    ]
  },
  {
    section: "Support",
    items: [
      { id: 'tutorial', icon: HelpCircle, label: "How Ripple Works", sub: "Replay the app tutorial", color: "text-amber-600", bg: "bg-amber-50", path: "/welcome" },
      { id: 'help',     icon: HelpCircle, label: "Help & Support", sub: "FAQs, Chat, Tickets", color: "text-teal-600",  bg: "bg-teal-50", path: "/support" },
      { id: 'feedback', icon: MessageSquare, label: "Share Feedback", sub: "Help us improve",    color: "text-sky-600",   bg: "bg-sky-50", path: "/profile/feedback" },
      { id: 'about',    icon: Info,       label: "About Ripple",   sub: "Version 2.1.0",       color: "text-slate-600", bg: "bg-slate-100", path: "/profile/about" },
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
  const [openFlow, setOpenFlow]   = useState<FlowItem | null>(null);

  const handleItemClick = (item: FlowItem) => {
    if (item.id === 'logout') {
      localStorage.removeItem('ripple_auth');
      navigate('/splash', { replace: true });
    } else if (item.path) {
      navigate(item.path);
    } else {
      setOpenFlow(item);
    }
  };

  return (
    <div className="bg-[#F8F7F5] min-h-full flex flex-col">
      <div className="flex-1 pb-4">
        {/* ── Profile Header ── */}
        <div className="bg-white px-5 pt-4 pb-6 relative">
          <button onClick={() => navigate('/profile/edit')}
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

          <div className="grid grid-cols-4 gap-2">
            <Link to="/profile/tier/platinum" className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full badge-platinum" />
              <p className="text-base font-black text-slate-900">0</p>
              <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide text-slate-500">Plat</p>
            </Link>
            <Link to="/profile/tier/gold" className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full badge-gold" />
              <p className="text-base font-black text-slate-900">2</p>
              <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide text-slate-500">Gold</p>
            </Link>
            <Link to="/profile/tier/silver" className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full badge-silver" />
              <p className="text-base font-black text-slate-900">5</p>
              <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide text-slate-500">Silver</p>
            </Link>
            <Link to="/profile/tier/bronze" className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full badge-bronze" />
              <p className="text-base font-black text-slate-900">12</p>
              <p className="text-[9px] font-bold mt-0.5 uppercase tracking-wide text-slate-500">Bronze</p>
            </Link>
          </div>
        </div>

        {/* ── Ripple Points Banner ── */}
        <div className="mx-4 mb-4 mt-4 rounded-3xl p-4 relative overflow-hidden shadow-xl"
             style={{ background: 'linear-gradient(135deg, #E8431A, #C0300D)', boxShadow: '0 20px 25px -5px rgba(232,67,26,0.3)' }}>
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-lg" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white/70 text-[10px] font-black uppercase tracking-wider">Ripple Points</p>
                <p className="text-white text-2xl font-black leading-tight">{USER.points.toLocaleString()} <span className="text-base font-bold opacity-70">pts</span></p>
                <p className="text-white/60 text-[10px] font-semibold">≈ ${(USER.points / 100).toFixed(2)} value</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/profile/earn" className="flex-1 bg-white/10 hover:bg-white/20 transition-colors py-2.5 rounded-xl text-center text-xs font-black text-white">
                How to Earn
              </Link>
              <Link to="/profile/redeem" className="flex-1 bg-white hover:bg-slate-50 transition-colors py-2.5 rounded-xl text-center text-xs font-black" style={{ color: BRAND }}>
                Redeem
              </Link>
            </div>
          </div>
        </div>

        {/* ── Settings Sections ── */}
        <div className="px-4 space-y-4">
          {SECTION_LINKS.map(section => (
            <div key={section.section}>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">{section.section}</h3>
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100 shadow-sm">
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
        </div>
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
