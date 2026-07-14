import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Trophy, Tag, Users, ImagePlay,
  Settings, ChevronRight, LogOut, Bell, HelpCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import RippleLogo from '@/components/RippleLogo'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/store/dashboardStore'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Home',        path: '/dashboard/home' },
  { icon: Trophy,          label: 'Loyalty',      path: '/dashboard/loyalty' },
  { icon: Tag,             label: 'Offers',       path: '/dashboard/offers' },
  { icon: Users,           label: 'Customers',    path: '/dashboard/customers' },
  { icon: ImagePlay,       label: 'Community',    path: '/dashboard/community' },
]

const BOTTOM_ITEMS = [
  { icon: Settings,    label: 'Settings', path: '/dashboard/settings' },
  { icon: HelpCircle,  label: 'Help',     path: '#' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { profile } = useDashboardStore()

  return (
    <aside className="sidebar-bg w-64 flex-shrink-0 h-screen flex flex-col border-r border-white/[0.06] sticky top-0">
      {/* ── Logo ── */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <RippleLogo size={26} />
          <div>
            <p className="text-white font-bold text-[15px] leading-none tracking-tight">ripple</p>
            <p className="text-white/40 text-[10px] font-medium mt-0.5 leading-none">Partner Portal</p>
          </div>
        </div>
      </div>

      {/* ── Restaurant card ── */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.05]">
          <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {profile.name.slice(0, 1)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/90 text-xs font-semibold truncate">{profile.name}</p>
            <p className="text-white/40 text-[10px] mt-0.5 truncate">{profile.cuisine}</p>
          </div>
          <ChevronRight size={12} className="text-white/30 flex-shrink-0" />
        </div>
      </div>

      {/* ── Main navigation ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-none">
        <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 pb-2 pt-1">
          Menu
        </p>
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive ? 'sidebar-item-active' : 'sidebar-item'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1 h-1 rounded-full bg-brand-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Notification badge example */}
        <div className="pt-3">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 pb-2">
            Account
          </p>
          {BOTTOM_ITEMS.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive ? 'sidebar-item-active' : 'sidebar-item'
                )
              }
            >
              <Icon size={16} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Notifications teaser ── */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] cursor-pointer hover:bg-white/[0.07] transition-colors">
          <div className="relative">
            <Bell size={15} className="text-white/50" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
              3
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-xs font-medium">New churn alerts</p>
            <p className="text-white/30 text-[10px]">3 customers at risk</p>
          </div>
        </div>
      </div>

      {/* ── User footer ── */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
            <span className="text-white/80 text-xs font-bold">RK</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs font-semibold truncate">Rahul Kumar</p>
            <p className="text-white/30 text-[10px] truncate">Owner</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-white/30 hover:text-white/60 transition-colors p-1"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
