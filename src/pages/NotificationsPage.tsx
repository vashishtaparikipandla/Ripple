import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, PartyPopper, CalendarDays, Users, Tag, Award, Droplets } from 'lucide-react'
import { motion } from 'framer-motion'

type Notif = {
  id: number
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>
  iconBg: string
  iconColor: string
  title: string
  body: string
  time: string
  group: 'Today' | 'Yesterday' | 'This Week'
  read: boolean
  path?: string
}

const NOTIFICATIONS: Notif[] = [
  {
    id: 1, icon: AlertTriangle, iconBg: '#FEF0EC', iconColor: '#E8431A',
    title: 'Your Gold status is expiring!',
    body: 'Visit The Rustic Spoon in the next 3 days to keep your Gold Ripple — or send a friend instead.',
    time: '2 min ago', group: 'Today', read: false, path: '/restaurant/1',
  },
  {
    id: 2, icon: PartyPopper, iconBg: '#ECFDF5', iconColor: '#059669',
    title: 'You\'ve Rippled to Silver! 🎉',
    body: 'Congrats — 5 visits to Sushi Nami! You now get 10% off every visit plus a free soft drink.',
    time: '1 hr ago', group: 'Today', read: false, path: '/restaurant/2',
  },
  {
    id: 3, icon: CalendarDays, iconBg: '#EFF6FF', iconColor: '#2563EB',
    title: 'Booking reminder',
    body: 'Your table at Bloom Bistro is tonight at 19:00. Don\'t be late — your Silver discount awaits!',
    time: '3 hrs ago', group: 'Today', read: true, path: '/bookings',
  },
  {
    id: 4, icon: Users, iconBg: '#F5F3FF', iconColor: '#7C3AED',
    title: 'Sarah used your Ripple share!',
    body: 'Your friend Sarah dined at The Rustic Spoon using your Silver discount. You earned 50 bonus points!',
    time: 'Yesterday', group: 'Yesterday', read: true,
  },
  {
    id: 5, icon: Tag, iconBg: '#FFFBEB', iconColor: '#D97706',
    title: 'New deal: 30% off tonight only',
    body: 'Rooftop Garden is offering 30% off for walk-ins tonight after 8 PM. Tap to reserve your table.',
    time: 'Yesterday', group: 'Yesterday', read: true, path: '/restaurant/4',
  },
  {
    id: 6, icon: Droplets, iconBg: '#FEF0EC', iconColor: '#E8431A',
    title: 'You earned 120 Ripple points',
    body: 'Last night\'s dinner at The Rustic Spoon earned you 120 points. Your balance is now 1,370 pts.',
    time: '2 days ago', group: 'This Week', read: true,
  },
  {
    id: 7, icon: Award, iconBg: '#FFFBEB', iconColor: '#CA8A04',
    title: 'Gold tier unlocked at Cozy Corner!',
    body: 'You\'ve visited 10 times — Gold tier unlocked! Enjoy 15% off, priority seating, and a free dessert.',
    time: '3 days ago', group: 'This Week', read: true, path: '/restaurant/5',
  },
]

const GROUPS = ['Today', 'Yesterday', 'This Week'] as const

export function NotificationsPage() {
  const navigate = useNavigate()
  const [notifs, setNotifs] = useState(NOTIFICATIONS)

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })))
  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <div className="bg-[#F7F5F2] min-h-full">

      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 sticky top-0 z-20 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
              <ArrowLeft className="w-4.5 h-4.5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-none">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#E8431A' }}>{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-black" style={{ color: '#E8431A' }}>
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="py-4 space-y-6">
        {GROUPS.map(group => {
          const items = notifs.filter(n => n.group === group)
          if (!items.length) return null
          return (
            <div key={group}>
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-5 mb-2">{group}</h2>
              <div className="space-y-px">
                {items.map((n, i) => (
                  <motion.button
                    key={n.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))
                      if (n.path) navigate(n.path)
                    }}
                    className={`w-full flex items-start gap-3.5 px-5 py-4 text-left transition-colors ${n.read ? 'bg-white' : 'bg-[#FEF0EC]/40'}`}
                  >
                    {/* Unread dot */}
                    <div className="relative shrink-0 mt-0.5">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: n.iconBg }}>
                        <n.icon className="w-5 h-5" style={{ color: n.iconColor }} />
                      </div>
                      {!n.read && (
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                             style={{ backgroundColor: '#E8431A' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${n.read ? 'font-semibold text-slate-800' : 'font-black text-slate-900'}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">{n.body}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1.5">{n.time}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
