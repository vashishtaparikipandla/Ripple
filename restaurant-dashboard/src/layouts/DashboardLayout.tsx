import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Bell } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard/home':      { title: 'Dashboard',        subtitle: 'Your loyalty program at a glance' },
  '/dashboard/loyalty':   { title: 'Loyalty Builder',  subtitle: 'Customise tiers, visits & rewards' },
  '/dashboard/offers':    { title: 'Offers & Campaigns', subtitle: 'Create flash deals and seasonal promotions' },
  '/dashboard/customers': { title: 'Customer Insights', subtitle: 'Who\'s visiting, who\'s thriving, who\'s at risk' },
  '/dashboard/community': { title: 'Community',        subtitle: 'Moderate customer-generated content' },
  '/dashboard/settings':  { title: 'Settings',         subtitle: 'Restaurant profile, hours, and preferences' },
}

export default function DashboardLayout() {
  const location = useLocation()
  const meta = PAGE_TITLES[location.pathname] ?? { title: 'Dashboard', subtitle: '' }

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Top bar ── */}
        <header className="bg-white border-b border-neutral-200 px-8 h-14 flex items-center justify-between flex-shrink-0 z-10">
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-none">{meta.title}</h1>
            <p className="text-xs text-neutral-400 mt-0.5">{meta.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search customers, offers…"
                className="pl-8 pr-4 py-1.5 text-xs bg-neutral-100 rounded-lg border border-transparent focus:border-brand-600 focus:bg-white focus:outline-none transition-all w-52 text-neutral-700 placeholder:text-neutral-400"
              />
            </div>

            {/* Notifications */}
            <button className="relative w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors">
              <Bell size={14} className="text-neutral-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-600 rounded-full border border-white" />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                <span className="text-white text-xs font-bold">RK</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
