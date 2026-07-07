import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

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
  return (
    <SubPageTemplate title="Shared Discounts">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <div className="text-4xl">🎁</div>
        <h3 className="font-black text-slate-900">Gifts Sent</h3>
        <p className="text-sm text-slate-500 font-medium">You've shared your Gold status with 3 friends this month.</p>
      </div>
    </SubPageTemplate>
  )
}

export function NotificationSettingsPage() {
  return (
    <SubPageTemplate title="Notification Settings">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <div className="text-4xl">🔔</div>
        <h3 className="font-black text-slate-900">Stay Updated</h3>
        <p className="text-sm text-slate-500 font-medium">Manage push notifications, SMS alerts, and promotional emails.</p>
      </div>
    </SubPageTemplate>
  )
}

export function ThemeSettingsPage() {
  return (
    <SubPageTemplate title="Theme Settings">
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 text-center">
        <div className="text-4xl">🎨</div>
        <h3 className="font-black text-slate-900">App Appearance</h3>
        <p className="text-sm text-slate-500 font-medium">Toggle between Light, Dark, and System default themes.</p>
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
