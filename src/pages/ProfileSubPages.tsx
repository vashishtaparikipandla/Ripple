import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Check, MapPin, Edit2, Trash2 } from 'lucide-react'

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
  return (
    <SubPageTemplate title="Food Preferences">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <div className="text-4xl">🥗</div>
        <h3 className="font-black text-slate-900">Dietary Needs</h3>
        <p className="text-sm text-slate-500 font-medium">Select your allergies and preferences so we can tailor restaurant suggestions for you.</p>
        <button className="w-full bg-[#E8431A] text-white py-3 rounded-xl font-bold mt-2">Update Preferences</button>
      </div>
    </SubPageTemplate>
  )
}

export function TransactionHistoryPage() {
  return (
    <SubPageTemplate title="Transaction History">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <div className="text-4xl">💳</div>
        <h3 className="font-black text-slate-900">Your Receipts</h3>
        <p className="text-sm text-slate-500 font-medium">View all your past bookings, pre-orders, and Ripple point redemptions.</p>
        <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold mt-2">Download Statement</button>
      </div>
    </SubPageTemplate>
  )
}

export function SavedPlacesPage() {
  return (
    <SubPageTemplate title="Saved Places">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <div className="text-4xl">❤️</div>
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
  const [prefs, setPrefs] = useState({ push: true, sms: false, email: true, promos: false })

  const toggle = (key: keyof typeof prefs) => setPrefs({ ...prefs, [key]: !prefs[key] })

  return (
    <SubPageTemplate title="Notification Settings">
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-50 shadow-sm">
        {[
          { key: 'push', label: 'Push Notifications', sub: 'Receive alerts on your device' },
          { key: 'sms', label: 'SMS Alerts', sub: 'Get texts for bookings' },
          { key: 'email', label: 'Email Notifications', sub: 'Receipts and updates' },
          { key: 'promos', label: 'Promotional Offers', sub: 'Special deals and events' }
        ].map((item) => (
          <div key={item.key} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-black text-sm text-slate-900">{item.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
            </div>
            <button
              onClick={() => toggle(item.key as any)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${prefs[item.key as keyof typeof prefs] ? 'bg-[#E8431A]' : 'bg-slate-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${prefs[item.key as keyof typeof prefs] ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        ))}
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
          { id: 'light', label: 'Light Theme', icon: '☀️' },
          { id: 'dark', label: 'Dark Theme', icon: '🌙' },
          { id: 'system', label: 'System Default', icon: '⚙️' }
        ].map((t) => (
          <button key={t.id} onClick={() => setTheme(t.id)} className={`w-full bg-white p-4 rounded-3xl border ${theme === t.id ? 'border-[#E8431A]' : 'border-slate-100'} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{t.icon}</span>
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
        <div className="text-4xl">📝</div>
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
        <div className="text-4xl">🌊</div>
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
