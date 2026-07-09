import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Plus, Check, MapPin, Edit2, Trash2, ChevronRight,
  Sun, Moon, Settings as SettingsIcon, MessageSquare, 
  Droplets, CreditCard, Heart, Leaf, UtensilsCrossed, 
  Star, Calendar, Users, Camera, Gift, Pizza, Car, Info
} from 'lucide-react'

// Generic wrapper for the placeholder pages
function SubPageTemplate({ title, children }: { title: string, children: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900">{title}</h1>
      </div>
      <div className="p-5 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export function FoodPreferencesPage() {
  const preferences = [
    { id: 1, type: 'Allergy', name: 'Peanuts' },
    { id: 2, type: 'Diet', name: 'Vegetarian' },
    { id: 3, type: 'Dislike', name: 'Cilantro' }
  ]

  return (
    <SubPageTemplate title="Dietary Needs">
      <div className="space-y-4">
        {preferences.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">{p.type}</p>
                <p className="text-xs text-slate-500 mt-0.5">{p.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500"><Edit2 className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50">
          <Plus className="w-6 h-6 mb-1 text-slate-400" />
          <span className="text-sm font-black text-slate-600">Add New Preference</span>
        </button>
      </div>
    </SubPageTemplate>
  )
}

export function TransactionHistoryPage() {
  return (
    <SubPageTemplate title="Transaction History">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <CreditCard className="w-10 h-10 mx-auto text-slate-300" />
        <h3 className="font-black text-slate-900">Your Receipts</h3>
        <p className="text-sm text-slate-500 font-medium">View all your past bookings, pre-orders, and Ripple point redemptions.</p>
        <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold mt-2">Download Statement</button>
      </div>
    </SubPageTemplate>
  )
}

export function PaymentMethodsPage() {
  const [cards, setCards] = useState([
    { id: 1, brand: 'visa',       last4: '4242', exp: '12/28', default: true },
    { id: 2, brand: 'mastercard', last4: '8899', exp: '10/27', default: false },
    { id: 3, brand: 'amex',       last4: '0021', exp: '06/26', default: false },
  ])

  const setDefault = (id: number) => setCards(prev => prev.map(c => ({ ...c, default: c.id === id })))
  const removeCard = (id: number) => setCards(prev => prev.filter(c => c.id !== id))

  const CardLogo = ({ brand }: { brand: string }) => {
    if (brand === 'visa') return (
      <svg viewBox="0 0 48 16" className="h-4">
        <text x="0" y="13" fontSize="16" fontWeight="900" fill="#1A1F71" fontFamily="Arial">VISA</text>
      </svg>
    )
    if (brand === 'mastercard') return (
      <svg viewBox="0 0 38 24" className="h-6">
        <circle cx="14" cy="12" r="12" fill="#EB001B"/>
        <circle cx="24" cy="12" r="12" fill="#F79E1B"/>
        <path d="M19 5.27a12 12 0 0 1 0 13.46A12 12 0 0 1 19 5.27z" fill="#FF5F00"/>
      </svg>
    )
    if (brand === 'amex') return (
      <svg viewBox="0 0 48 16" className="h-4">
        <text x="0" y="13" fontSize="12" fontWeight="900" fill="#006FCF" fontFamily="Arial">AMEX</text>
      </svg>
    )
    return <CreditCard className="w-6 h-6 text-slate-400" />
  }

  return (
    <SubPageTemplate title="Payment Methods">
      <div className="space-y-5">

        {/* Express Pay */}
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Express Pay</p>
          <div className="space-y-2">
            <button className="w-full bg-black text-white rounded-2xl py-3.5 px-5 flex items-center justify-center gap-3 font-bold text-sm active:scale-98 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Pay with Apple Pay
            </button>
            <button className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-5 flex items-center justify-center gap-3 font-bold text-sm text-slate-900 active:scale-98 transition-transform shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Pay with Google Pay
            </button>
            <button className="w-full bg-[#003087] text-white rounded-2xl py-3.5 px-5 flex items-center justify-center gap-3 font-bold text-sm active:scale-98 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.315 2.29 1.227 3.977-.102 2.966-2.198 4.707-5.5 4.836H11.9c-.45 0-.83.31-.907.756L9.88 17.14l-.54 3.434a.655.655 0 0 1-.647.549z"/></svg>
              Pay with PayPal
            </button>
          </div>
        </div>

        {/* Saved Cards */}
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Saved Cards</p>
          <div className="space-y-3">
            {cards.map(c => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 flex items-center gap-3">
                  <div className="w-14 h-9 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                    <CardLogo brand={c.brand} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-900 text-sm capitalize">{c.brand} •••• {c.last4}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Expires {c.exp}{c.default ? ' · Default' : ''}</p>
                  </div>
                  <div className="flex gap-2">
                    {!c.default && (
                      <button onClick={() => setDefault(c.id)} className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-600">
                        Set Default
                      </button>
                    )}
                    {c.default && <span className="px-2 py-1 rounded-full bg-green-100 text-[10px] font-black text-green-700">✓ Default</span>}
                    <button onClick={() => removeCard(c.id)} className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:bg-slate-50">
          <Plus className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-black text-slate-600">Add New Card</span>
        </button>

        <div className="flex items-start gap-2 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Your card details are encrypted with <strong>PCI-DSS Level 1</strong> security. We never store your CVV. Payments are authenticated with Face ID / Touch ID.
          </p>
        </div>
      </div>
    </SubPageTemplate>
  )
}

export function SavedPlacesPage() {
  return (
    <SubPageTemplate title="Saved Places">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <Heart className="w-10 h-10 mx-auto text-rose-400" />
        <h3 className="font-black text-slate-900">Your Wishlist</h3>
        <p className="text-sm text-slate-500 font-medium">You have 8 saved restaurants. We'll notify you if any of them run a special offer!</p>
        <button className="w-full bg-[#E8431A] text-white py-3 rounded-xl font-bold mt-2">Explore Saved</button>
      </div>
    </SubPageTemplate>
  )
}

export function SharedDiscountsPage() {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent')

  return (
    <SubPageTemplate title="Shared Discounts">
      <div className="flex gap-2 mb-5">
        <button onClick={() => setActiveTab('sent')} className={`flex-1 py-2 rounded-xl text-xs font-black ${activeTab === 'sent' ? 'bg-[#E8431A] text-white' : 'bg-slate-200 text-slate-500'}`}>Sent</button>
        <button onClick={() => setActiveTab('received')} className={`flex-1 py-2 rounded-xl text-xs font-black ${activeTab === 'received' ? 'bg-[#E8431A] text-white' : 'bg-slate-200 text-slate-500'}`}>Received</button>
      </div>

      {activeTab === 'sent' ? (
        <div className="space-y-3">
          {[
            { to: 'Emma W.', tier: 'Gold', rest: 'Cozy Corner Cafe', date: 'Expires in 2 days' },
            { to: 'Michael T.', tier: 'Silver', rest: 'The Rustic Spoon', date: 'Used yesterday' }
          ].map((gift, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 text-sm">To: {gift.to}</p>
                <p className="text-xs text-slate-500 mt-0.5">{gift.tier} Status • {gift.rest}</p>
              </div>
              <p className={`text-[10px] font-bold ${gift.date.includes('Expires') ? 'text-amber-500' : 'text-slate-400'}`}>{gift.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {[
            { from: 'Sarah L.', tier: 'Platinum', rest: 'Rooftop Garden', date: 'Expires today!' }
          ].map((gift, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 text-sm">From: {gift.from}</p>
                <p className="text-xs text-slate-500 mt-0.5">{gift.tier} Status • {gift.rest}</p>
              </div>
              <button className="bg-[#E8431A] text-white text-[10px] font-black px-3 py-1.5 rounded-full">Redeem</button>
            </div>
          ))}
        </div>
      )}
    </SubPageTemplate>
  )
}

export function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState({
    booking_confirm: true,
    preorder_status: true,
    booking_reminder: true,
    points_earned: true,
    tier_change: true,
    points_expiry: true,
    flash_deals: false,
    new_restaurants: false,
    seasonal: false,
    saved_events: false,
    menu_updates: false,
  })

  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const Toggle = ({ k, locked }: { k: keyof typeof prefs; locked?: boolean }) => (
    <button
      onClick={() => !locked && toggle(k)}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${locked ? 'opacity-60 cursor-not-allowed' : ''} ${prefs[k] ? 'bg-[#E8431A]' : 'bg-slate-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${prefs[k] ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  )

  const Section = ({ title, items }: { title: string; items: Array<{ key: keyof typeof prefs; label: string; sub: string; locked?: boolean }> }) => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-slate-50">
        <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{title}</p>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map(item => (
          <div key={item.key} className="px-4 py-3.5 flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-black text-sm text-slate-900">{item.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{item.sub}</p>
            </div>
            <Toggle k={item.key} locked={item.locked} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <SubPageTemplate title="Notifications">
      <div className="space-y-4">
        <Section
          title="Booking & Orders"
          items={[
            { key: 'booking_confirm',  label: 'Booking Confirmations',  sub: 'Always on — required for service', locked: true },
            { key: 'preorder_status',  label: 'Pre-order Status',        sub: 'Kitchen updates on your food order', locked: true },
            { key: 'booking_reminder', label: 'Booking Reminders',       sub: '1 hour before your reservation' },
          ]}
        />
        <Section
          title="Ripple Rewards"
          items={[
            { key: 'points_earned',  label: 'Points Earned',        sub: 'When you earn Ripple Points' },
            { key: 'tier_change',    label: 'Tier Status Changes',   sub: 'Level up or expiry alerts' },
            { key: 'points_expiry',  label: 'Points Expiry Warning', sub: 'Notify before points expire (important!)' },
          ]}
        />
        <Section
          title="Deals & Promotions"
          items={[
            { key: 'flash_deals',      label: 'Flash Deals Near Me',  sub: 'Time-sensitive offers (opt-in)' },
            { key: 'new_restaurants',  label: 'New Restaurants',      sub: 'New places on Ripple in your area' },
            { key: 'seasonal',         label: 'Seasonal Offers',       sub: 'Holiday and event-based promotions' },
          ]}
        />
        <Section
          title="From Restaurants"
          items={[
            { key: 'saved_events',  label: 'Events at Saved Spots', sub: 'Special events at your saved restaurants' },
            { key: 'menu_updates',  label: 'Menu Updates',          sub: "New items at restaurants you've visited" },
          ]}
        />

        {/* Do Not Disturb */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Do Not Disturb</p>
          </div>
          <div className="p-4">
            <p className="text-sm font-black text-slate-900 mb-1">Quiet Hours</p>
            <p className="text-[11px] text-slate-500 mb-3 font-medium">No notifications sent during these hours</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-slate-900">10:00 PM</div>
              <span className="text-xs text-slate-400 font-semibold">to</span>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-slate-900">8:00 AM</div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center font-medium px-4">
          Promotional notifications are opt-in only, in compliance with CCPA (California Consumer Privacy Act).
        </p>
      </div>
    </SubPageTemplate>
  )
}

export function ThemeSettingsPage() {
  const [theme, setTheme] = useState('system')

  return (
    <SubPageTemplate title="Theme Settings">
      <div className="space-y-3">
        {[
          { id: 'light', label: 'Light Theme', icon: Sun },
          { id: 'dark', label: 'Dark Theme', icon: Moon },
          { id: 'system', label: 'System Default', icon: SettingsIcon }
        ].map((t) => (
          <button key={t.id} onClick={() => setTheme(t.id)} className={`w-full bg-white p-4 rounded-3xl border ${theme === t.id ? 'border-[#E8431A]' : 'border-slate-100'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <t.icon className="w-5 h-5 text-slate-500" />
              <span className="font-black text-sm text-slate-900">{t.label}</span>
            </div>
            {theme === t.id && <div className="w-5 h-5 bg-[#E8431A] rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
          </button>
        ))}
      </div>
    </SubPageTemplate>
  )
}

export function AddressesPage() {
  const addresses = [
    { id: 1, type: 'Home', address: '123 Apple St, NY 10001' },
    { id: 2, type: 'Work', address: '456 Business Blvd, NY 10002' }
  ]

  return (
    <SubPageTemplate title="Saved Addresses">
      <div className="space-y-4">
        {addresses.map(a => (
          <div key={a.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">{a.type}</p>
                <p className="text-xs text-slate-500 mt-0.5">{a.address}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500"><Edit2 className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}

        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50">
          <Plus className="w-6 h-6 mb-1 text-slate-400" />
          <span className="text-sm font-black text-slate-600">Add New Address</span>
        </button>
      </div>
    </SubPageTemplate>
  )
}

export function FeedbackPage() {
  return (
    <SubPageTemplate title="Share Feedback">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <MessageSquare className="w-10 h-10 mx-auto text-slate-300" />
        <h3 className="font-black text-slate-900">Tell us what you think</h3>
        <p className="text-sm text-slate-500 font-medium">Found a bug? Have a feature request? Let our team know.</p>
        <textarea className="w-full bg-slate-50 rounded-xl p-3 border border-slate-200 mt-2 h-24 text-sm" placeholder="Type your feedback here..."></textarea>
        <button className="w-full bg-[#E8431A] text-white py-3 rounded-xl font-bold mt-2">Submit</button>
      </div>
    </SubPageTemplate>
  )
}

export function AboutPage() {
  return (
    <SubPageTemplate title="About Ripple">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <Droplets className="w-10 h-10 mx-auto text-slate-300" />
        <h3 className="font-black text-slate-900">Ripple v2.1.0</h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Save while you savour. Ripple is built to reward your loyalty and connect you with the best dining experiences.
        </p>
        <div className="text-xs text-slate-400 font-semibold pt-4">
          © 2026 Ripple Inc. All rights reserved.
        </div>
      </div>
    </SubPageTemplate>
  )
}

export function HowToEarnPage() {
  return (
    <SubPageTemplate title="How to Earn Points">
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
          <Droplets className="w-4 h-4 text-[#E8431A]" />
          Earn Ripple Points
        </h3>
        <div className="space-y-4">
          {[
            { icon: UtensilsCrossed, action: "Dine at a restaurant", points: "+50 pts", color: "text-blue-500" },
            { icon: Star, action: "Write a review", points: "+20 pts", color: "text-amber-500" },
            { icon: Calendar, action: "Book through Ripple", points: "+30 pts", color: "text-green-500" },
            { icon: Users, action: "Refer a friend", points: "+100 pts", color: "text-purple-500" },
            { icon: Camera, action: "Share a photo", points: "+10 pts", color: "text-pink-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <p className="text-sm text-slate-700 font-medium">{item.action}</p>
              </div>
              <span className="text-sm font-black text-[#E8431A]">{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </SubPageTemplate>
  )
}

export function RedeemPointsPage() {
  const points = 1250

  return (
    <SubPageTemplate title="Redeem Points">
      <div className="bg-[#E8431A]/10 p-4 rounded-3xl mb-4 border border-[#E8431A]/20 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
          <Droplets className="w-6 h-6 text-[#E8431A]" />
        </div>
        <div>
          <p className="text-xs font-black text-[#E8431A] uppercase tracking-wider">Available Balance</p>
          <p className="text-2xl font-black text-slate-900">{points.toLocaleString()} <span className="text-sm opacity-60">pts</span></p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 mb-4">Rewards</h3>
        <div className="space-y-3">
          {[
            { icon: Gift, label: "$10 Amazon Gift Card", pts: 1000 },
            { icon: Pizza, label: "Free Pizza", pts: 800 },
            { icon: CreditCard, label: "$5 Bill Credit", pts: 500 },
            { icon: Car, label: "$10 Uber Credit", pts: 1000 },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <r.icon className="w-5 h-5 text-slate-500" />
                <p className="text-xs font-semibold text-slate-700">{r.label}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide">{r.pts.toLocaleString()} pts</span>
                <button disabled={points < r.pts} className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-colors ${points >= r.pts ? 'bg-[#E8431A] text-white hover:bg-[#C0300D] shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageTemplate>
  )
}

export function PrivacySettingsPage() {
  const [locationPrecise, setLocationPrecise] = useState(true)
  const [shareAnonymous, setShareAnonymous] = useState(false)

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-12 h-6 rounded-full p-1 transition-colors ${value ? 'bg-[#E8431A]' : 'bg-slate-200'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${value ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  )

  return (
    <SubPageTemplate title="Privacy & Data">
      <div className="space-y-4">
        {/* Your Rights */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Your Data Rights</p>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { label: 'Download My Data',       sub: 'Get a copy of all your Ripple data (CCPA)', icon: '📥' },
              { label: 'Manage Ad Preferences',  sub: 'Control how your data is used for ads',     icon: '🎯' },
              { label: 'Cookie Preferences',     sub: 'Manage tracking and analytics cookies',      icon: '🍪' },
              { label: 'Delete My Account',      sub: 'Permanently delete your account and data',   icon: '🗑️', danger: true },
            ].map((item, i) => (
              <button key={i} className={`w-full px-4 py-4 flex items-center gap-3 text-left ${'danger' in item ? 'hover:bg-rose-50' : 'hover:bg-slate-50'}`}>
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <p className={`font-black text-sm ${'danger' in item ? 'text-rose-600' : 'text-slate-900'}`}>{item.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{item.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Location</p>
          </div>
          <div className="divide-y divide-slate-50">
            <div className="px-4 py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="font-black text-sm text-slate-900">Precise Location</p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Used to find restaurants near you</p>
              </div>
              <Toggle value={locationPrecise} onChange={() => setLocationPrecise(p => !p)} />
            </div>
          </div>
        </div>

        {/* Sharing */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Data Sharing</p>
          </div>
          <div className="px-4 py-3.5 flex items-center justify-between gap-4">
            <div>
              <p className="font-black text-sm text-slate-900">Share Anonymized Data</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Help restaurants improve — no personal info shared. Off by default.</p>
            </div>
            <Toggle value={shareAnonymous} onChange={() => setShareAnonymous(p => !p)} />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 text-center font-medium px-4">
          Your privacy is protected under CCPA and applicable US federal law. We never sell your personal data.
        </p>
      </div>
    </SubPageTemplate>
  )
}
