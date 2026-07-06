import { type ReactNode, useEffect, useState } from 'react'
import { NavLink, useLocation, Navigate } from 'react-router-dom'
import { Home, UtensilsCrossed, CalendarDays, User } from 'lucide-react'

interface AppLayoutProps {
  children: ReactNode
}

// Pages that skip auth check and bottom nav
const NO_AUTH_PATHS   = ['/splash', '/onboard', '/auth']
const HIDE_NAV_PATHS  = ['/splash', '/onboard', '/auth', '/restaurant/']

function isLoggedIn() {
  return localStorage.getItem('ripple_auth') === 'true'
}

export function AppLayout({ children }: AppLayoutProps) {
  const location   = useLocation()
  const hideNav    = HIDE_NAV_PATHS.some(p => location.pathname.startsWith(p))
  const skipAuth   = NO_AUTH_PATHS.some(p => location.pathname.startsWith(p))
  const needsLogin = !skipAuth && !isLoggedIn()

  // ── Compute scale to fit the phone in one viewport ──────────────────
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scaleH = (vh - 24) / 917   // 12px top + bottom breathing room
      const scaleW = (vw - 24) / 412
      setScale(Math.min(1, scaleH, scaleW))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  if (needsLogin) return <Navigate to="/auth" replace />

  return (
    /* ── Stage: dark background ── */
    <div className="h-screen w-screen bg-[#0F0F0F] flex items-start justify-center overflow-hidden"
         style={{ paddingTop: `${Math.max(0, (window.innerHeight - 917 * scale) / 2)}px` }}>

      {/* ── Phone frame: always 412×917 internally, scaled to fit ── */}
      <div
        style={{
          width:  412,
          height: 917,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          flexShrink: 0,
        }}
        className="relative bg-[#1C1C1E] rounded-[3.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.9)] ring-1 ring-white/10 overflow-hidden"
      >
        {/* Side buttons (decorative) */}
        <div className="absolute -left-0.5 top-[130px] w-1 h-9  bg-[#2C2C2E] rounded-l" />
        <div className="absolute -left-0.5 top-[185px] w-1 h-14 bg-[#2C2C2E] rounded-l" />
        <div className="absolute -left-0.5 top-[210px] w-1 h-14 bg-[#2C2C2E] rounded-l" />
        <div className="absolute -right-0.5 top-[150px] w-1 h-20 bg-[#2C2C2E] rounded-r" />

        {/*
          ── Inner screen ──
          3-row flex column (THE KEY FIX):
            Row 1: Status bar (shrink-0)
            Row 2: Scrollable content (flex-1, min-h-0)
            Row 3: Bottom nav (shrink-0)

          Also: style={{ transform: 'translateZ(0)' }} creates a new stacking
          context so child pages can use position:fixed and stay within the frame.
        */}
        <div
          className="w-full h-full bg-[#F7F5F2] rounded-[3.4rem] flex flex-col overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Status bar / notch */}
          <div className="relative flex-shrink-0 h-10 flex items-center px-6 bg-transparent z-50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[22px] bg-[#1C1C1E] rounded-b-[1rem]" />
            <span className="text-[11px] font-semibold text-slate-800 z-10">9:41</span>
            <div className="ml-auto flex items-center gap-1 z-10">
              <div className="text-[10px] text-slate-700 font-semibold">●●●</div>
            </div>
          </div>

          {/* Scrollable page content */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden hide-scrollbar relative">
            {children}
          </main>

          {/* Bottom Navigation */}
          {!hideNav && (
            <div className="flex-shrink-0 bg-white border-t border-slate-200/80 px-2 pt-2 pb-6 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
              <NavLink to="/" end className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all ${isActive ? 'text-[#E8431A]' : 'text-slate-400'}`
              }>
                {({ isActive }) => (
                  <>
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${isActive ? 'bg-brand-50' : ''}`}
                         style={isActive ? { backgroundColor: '#FEF0EC' } : {}}>
                      <Home className="w-5 h-5" style={isActive ? { color: '#E8431A' } : {}} />
                    </div>
                    <span className="text-[10px] font-black tracking-wide" style={isActive ? { color: '#E8431A' } : {}}>Home</span>
                  </>
                )}
              </NavLink>

              <NavLink to="/restaurants" className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all ${isActive ? 'text-[#E8431A]' : 'text-slate-400'}`
              }>
                {({ isActive }) => (
                  <>
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                         style={isActive ? { backgroundColor: '#FEF0EC' } : {}}>
                      <UtensilsCrossed className="w-5 h-5" style={isActive ? { color: '#E8431A' } : {}} />
                    </div>
                    <span className="text-[10px] font-black tracking-wide" style={isActive ? { color: '#E8431A' } : {}}>Explore</span>
                  </>
                )}
              </NavLink>

              <NavLink to="/bookings" className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all ${isActive ? 'text-[#E8431A]' : 'text-slate-400'}`
              }>
                {({ isActive }) => (
                  <>
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                         style={isActive ? { backgroundColor: '#FEF0EC' } : {}}>
                      <CalendarDays className="w-5 h-5" style={isActive ? { color: '#E8431A' } : {}} />
                    </div>
                    <span className="text-[10px] font-black tracking-wide" style={isActive ? { color: '#E8431A' } : {}}>Bookings</span>
                  </>
                )}
              </NavLink>

              <NavLink to="/profile" className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all ${isActive ? 'text-[#E8431A]' : 'text-slate-400'}`
              }>
                {({ isActive }) => (
                  <>
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                         style={isActive ? { backgroundColor: '#FEF0EC' } : {}}>
                      <User className="w-5 h-5" style={isActive ? { color: '#E8431A' } : {}} />
                    </div>
                    <span className="text-[10px] font-black tracking-wide" style={isActive ? { color: '#E8431A' } : {}}>Profile</span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
