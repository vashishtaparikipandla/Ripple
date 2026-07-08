import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, MapPin, RefreshCcw, X, ChevronRight, Droplets, Clock, HelpCircle, MessageSquare, PhoneCall } from 'lucide-react'

const BRAND = '#E8431A'

type BookingStatus = 'active' | 'upcoming' | 'past' | 'cancelled'
type ModifyStep    = 'choice' | 'reschedule' | 'cancel-reason' | 'cancel-confirm' | 'reschedule-confirm'

interface Booking {
  id: number
  restaurant: string
  restaurantId: string
  date: string
  time: string
  guests: number
  status: BookingStatus
  image: string
  address: string
  confirmationCode: string
  tierDiscount: string | null
}

const ALL_BOOKINGS: Booking[] = [
  { id: 1, restaurant: 'The Rustic Spoon', restaurantId: '1', date: 'Today',        time: '19:30', guests: 2, status: 'active',    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop', address: '123 Main St, Downtown', confirmationCode: 'RS-7891', tierDiscount: '10% off (Silver)' },
  { id: 2, restaurant: 'Sushi Nami',       restaurantId: '2', date: 'Sat, 19 Jul',  time: '20:00', guests: 4, status: 'upcoming',   image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop', address: '45 River Rd, Westside', confirmationCode: 'SN-4523', tierDiscount: null },
  { id: 3, restaurant: 'Bloom Bistro',     restaurantId: '3', date: 'Fri, 11 Jul',  time: '19:00', guests: 2, status: 'upcoming',   image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop', address: '88 Elm Ave, Midtown',   confirmationCode: 'BB-2210', tierDiscount: '5% off (Bronze)' },
  { id: 4, restaurant: 'The Rustic Spoon', restaurantId: '1', date: 'Mon, 30 Jun',  time: '20:30', guests: 3, status: 'past',       image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop', address: '123 Main St, Downtown', confirmationCode: 'RS-6543', tierDiscount: '10% off (Silver)' },
  { id: 5, restaurant: 'Rooftop Garden',   restaurantId: '4', date: 'Wed, 25 Jun',  time: '18:00', guests: 2, status: 'cancelled',  image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&h=200&fit=crop', address: '10 Sky Blvd, Uptown',  confirmationCode: 'RG-9912', tierDiscount: null },
]

const TABS: { id: BookingStatus; label: string }[] = [
  { id: 'active',    label: 'Active' },
  { id: 'upcoming',  label: 'Upcoming' },
  { id: 'past',      label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
]

const STATUS_LABEL: Record<BookingStatus, string> = {
  active:    'Active',
  upcoming:  'Upcoming',
  past:      'Completed',
  cancelled: 'Cancelled',
}

const CANCEL_REASONS = [
  'Change of plans',
  'Found a better option',
  'Restaurant not available',
  'Unexpected schedule conflict',
  'Other',
]

const DATES     = ['Today', 'Tomorrow', 'Wed 16', 'Thu 17', 'Fri 18', 'Sat 19']
const TIME_SLOTS = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']

export function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus>('active')
  const [modifyBooking, setModifyBooking] = useState<Booking | null>(null)
  const [modifyStep, setModifyStep]       = useState<ModifyStep>('choice')
  const [cancelReason, setCancelReason]   = useState('')
  const [otherReason, setOtherReason]     = useState('')
  const [reschedDate, setReschedDate]     = useState('Tomorrow')
  const [reschedTime, setReschedTime]     = useState('')
  const [supportBooking, setSupportBooking] = useState<Booking | null>(null)

  const filtered = ALL_BOOKINGS.filter(b => b.status === activeTab)

  const openModify = (b: Booking) => {
    setModifyBooking(b)
    setModifyStep('choice')
    setCancelReason('')
    setOtherReason('')
    setReschedDate('Tomorrow')
    setReschedTime('')
  }

  const closeModify = () => setModifyBooking(null)

  return (
    <div className="bg-[#F7F5F2] min-h-full">

      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-0 border-b border-slate-100 sticky top-0 z-20">
        <h1 className="text-2xl font-black text-slate-900 mb-4">My Bookings</h1>
        <div className="flex">
          {TABS.map(tab => {
            const count = ALL_BOOKINGS.filter(b => b.status === tab.id).length
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-[11px] font-black border-b-2 transition-colors flex justify-center items-center gap-1.5 ${
                  activeTab === tab.id ? 'text-[#E8431A] border-[#E8431A]' : 'text-slate-400 border-transparent'
                }`}>
                {tab.label}
                {count > 0 && (
                  <span className="w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center shrink-0"
                        style={{ backgroundColor: activeTab === tab.id ? BRAND : '#CBD5E1' }}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* List */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <CalendarDays className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="font-black text-slate-700 text-base">No {activeTab} bookings</p>
                {(activeTab === 'upcoming' || activeTab === 'active') && (
                  <Link to="/restaurants" className="mt-4 inline-block px-6 py-3 rounded-2xl font-bold text-white text-sm" style={{ backgroundColor: BRAND }}>
                    Explore Restaurants
                  </Link>
                )}
              </div>
            ) : (
              filtered.map(booking => (
                <div key={booking.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                  <div className="p-4">
                    <div className="flex gap-3 mb-4">
                      <Link to={`/restaurant/${booking.restaurantId}`}>
                        <img src={booking.image} alt={booking.restaurant} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <Link to={`/restaurant/${booking.restaurantId}`}>
                            <h4 className="font-black text-[15px] text-slate-900 leading-tight">{booking.restaurant}</h4>
                          </Link>
                          {/* Simple badge, no color coding */}
                          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                            {STATUS_LABEL[booking.status]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5">
                          <CalendarDays className="w-3 h-3" />
                          <span className="font-semibold">{booking.date} · {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="font-medium">{booking.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3 mb-4">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-semibold">Guests</p>
                        <p className="font-black text-slate-900 text-sm">{booking.guests}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200" />
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-semibold">Code</p>
                        <p className="font-black text-slate-900 text-sm font-mono">{booking.confirmationCode}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200" />
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400 font-semibold">Discount</p>
                        {booking.tierDiscount ? (
                          <div className="flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-green-600" />
                            <p className="font-black text-green-600 text-[10px]">{booking.tierDiscount}</p>
                          </div>
                        ) : (
                          <p className="font-bold text-slate-400 text-[11px]">None</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {(booking.status === 'active' || booking.status === 'upcoming') && (
                      <div className="flex gap-2 mb-2">
                        <button 
                          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> Check-in
                        </button>
                        <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1"
                                style={{ backgroundColor: BRAND }}>
                          Directions
                        </button>
                      </div>
                    )}
                    {booking.status === 'past' && (
                      <div className="flex gap-2 mb-2">
                        <Link to={`/restaurant/${booking.restaurantId}`} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 text-center">
                          Write Review
                        </Link>
                        <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1"
                                style={{ backgroundColor: BRAND }}>
                          <RefreshCcw className="w-3 h-3" /> Rebook
                        </button>
                      </div>
                    )}
                    {booking.status === 'cancelled' && (
                      <div className="flex gap-2 mb-2">
                        <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1"
                                style={{ backgroundColor: BRAND }}>
                          <RefreshCcw className="w-3 h-3" /> Book Again
                        </button>
                      </div>
                    )}
                    
                    <button onClick={() => setSupportBooking(booking)} className="w-full py-2.5 rounded-xl bg-slate-50 text-xs font-bold text-slate-500 flex items-center justify-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> Help & Support
                    </button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* ── Support Drawer ── */}
      <AnimatePresence>
        {supportBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSupportBooking(null)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: '90%' }}
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900">Help & Support</h2>
                <button onClick={() => setSupportBooking(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>
              <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-4">
                <div className="bg-slate-50 rounded-2xl px-4 py-3 mb-5 flex items-center gap-3">
                  <img src={supportBooking.image} alt="Restaurant" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-black text-slate-800 leading-tight">{supportBooking.restaurant}</p>
                    <p className="text-xs text-slate-500 font-medium">{supportBooking.date} · {supportBooking.time}</p>
                  </div>
                </div>
                
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Self Service</h3>
                <div className="space-y-3 mb-6">
                  {supportBooking.status !== 'cancelled' && (
                    <button onClick={() => {
                      setSupportBooking(null);
                      if (supportBooking.status === 'active' || supportBooking.status === 'upcoming') {
                        openModify(supportBooking);
                      }
                    }} className="w-full flex items-center gap-3 bg-white border border-slate-200 p-4 rounded-2xl active:bg-slate-50 transition-colors text-left">
                      <Clock className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">Modify Booking</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Reschedule or cancel your table</p>
                      </div>
                    </button>
                  )}
                  <button className="w-full flex items-center gap-3 bg-white border border-slate-200 p-4 rounded-2xl active:bg-slate-50 transition-colors text-left">
                    <CalendarDays className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Get an Invoice / Receipt</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Download a PDF copy to your device</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 bg-white border border-slate-200 p-4 rounded-2xl active:bg-slate-50 transition-colors text-left">
                    <HelpCircle className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">FAQs</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">Common questions about this booking</p>
                    </div>
                  </button>
                </div>

                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Contact Us</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 bg-[#FEF0EC] p-4 rounded-2xl active:opacity-90 transition-colors text-left">
                    <MessageSquare className="w-5 h-5" style={{ color: BRAND }} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: BRAND }}>Chat with an Agent / Raise Ticket</p>
                      <p className="text-xs font-medium" style={{ color: `${BRAND}99` }}>We'll get back to you within 24 hours</p>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 bg-slate-100 p-4 rounded-2xl active:opacity-90 transition-colors text-left">
                    <PhoneCall className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Toll-Free Number</p>
                      <p className="text-xs font-medium text-slate-500">1-800-RIPPLE-US (Available 24/7)</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Modify Drawer ── */}
      <AnimatePresence>
        {modifyBooking && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModify} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: '90%' }}
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>

              {/* ── Step: Choose action ── */}
              {modifyStep === 'choice' && (
                <>
                  <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-black text-slate-900">Modify Booking</h2>
                    <button onClick={closeModify} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="px-5 pt-3 pb-2">
                    <div className="bg-slate-50 rounded-2xl px-4 py-3 mb-5">
                      <p className="text-sm font-black text-slate-800">{modifyBooking.restaurant}</p>
                      <p className="text-xs text-slate-500 font-medium">{modifyBooking.date} · {modifyBooking.time} · {modifyBooking.guests} guests · {modifyBooking.confirmationCode}</p>
                    </div>
                    <div className="space-y-3">
                      <button onClick={() => setModifyStep('reschedule')}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-200 text-left">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#FEF0EC' }}>
                          <CalendarDays className="w-5 h-5" style={{ color: BRAND }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900">Reschedule</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Pick a new date and time</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </button>
                      <button onClick={() => setModifyStep('cancel-reason')}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border border-rose-100 text-left bg-rose-50/50">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                          <X className="w-5 h-5 text-rose-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-rose-600">Cancel Booking</p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Release your table — this cannot be undone</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-rose-300" />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ── Step: Reschedule ── */}
              {modifyStep === 'reschedule' && (
                <>
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3">
                    <button onClick={() => setModifyStep('choice')} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-slate-600 rotate-180" />
                    </button>
                    <h2 className="text-lg font-black text-slate-900">Reschedule</h2>
                    <button onClick={closeModify} className="ml-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-4 space-y-5">
                    {/* Current booking */}
                    <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-500 font-medium">
                      <span className="font-black text-slate-700">Currently: </span>
                      {modifyBooking.date} · {modifyBooking.time}
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-3">New Date</h3>
                      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                        {DATES.map(d => (
                          <button key={d} onClick={() => setReschedDate(d)}
                            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors ${reschedDate === d ? 'text-white' : 'bg-slate-100 text-slate-600'}`}
                            style={reschedDate === d ? { backgroundColor: BRAND } : {}}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-900 mb-3">New Time</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map(t => (
                          <button key={t} onClick={() => setReschedTime(t)}
                            className={`py-2.5 rounded-xl text-xs font-bold transition-colors ${reschedTime === t ? 'text-white' : 'bg-slate-100 text-slate-700'}`}
                            style={reschedTime === t ? { backgroundColor: BRAND } : {}}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {reschedTime && (
                      <div className="rounded-2xl p-4 border" style={{ backgroundColor: '#FEF0EC', borderColor: '#E8431A20' }}>
                        <p className="text-xs font-black mb-1" style={{ color: BRAND }}>New Booking</p>
                        <p className="text-sm font-semibold text-slate-700">{reschedDate} · {reschedTime} · {modifyBooking.guests} guests</p>
                        {modifyBooking.tierDiscount && <p className="text-xs font-bold text-green-600 mt-1">{modifyBooking.tierDiscount} still applies</p>}
                      </div>
                    )}
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100">
                    <button
                      onClick={() => reschedTime && setModifyStep('reschedule-confirm')}
                      disabled={!reschedTime}
                      className={`w-full py-4 rounded-2xl font-black text-base transition-colors ${reschedTime ? 'text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      style={reschedTime ? { backgroundColor: BRAND } : {}}>
                      Confirm Reschedule
                    </button>
                  </div>
                </>
              )}

              {/* ── Step: Reschedule confirmed ── */}
              {modifyStep === 'reschedule-confirm' && (
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF0EC' }}>
                    <CalendarDays className="w-8 h-8" style={{ color: BRAND }} />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-xl text-slate-900">Rescheduled!</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">Your booking at <span className="font-black text-slate-700">{modifyBooking.restaurant}</span> is now on {reschedDate} at {reschedTime}.</p>
                  </div>
                  <button onClick={closeModify} className="mt-4 px-8 py-3 rounded-2xl font-black text-white" style={{ backgroundColor: BRAND }}>Done</button>
                </div>
              )}

              {/* ── Step: Cancel Reason ── */}
              {modifyStep === 'cancel-reason' && (
                <>
                  <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3">
                    <button onClick={() => setModifyStep('choice')} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-slate-600 rotate-180" />
                    </button>
                    <h2 className="text-lg font-black text-slate-900">Why are you cancelling?</h2>
                    <button onClick={closeModify} className="ml-auto w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-4">
                    <p className="text-xs text-slate-400 font-semibold mb-4">Help us improve by selecting a reason</p>
                    <div className="space-y-2.5">
                      {CANCEL_REASONS.map(reason => (
                        <button key={reason} onClick={() => setCancelReason(reason)}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-colors ${
                            cancelReason === reason ? 'border-[#E8431A] bg-[#FEF0EC]' : 'border-slate-200 bg-white'
                          }`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            cancelReason === reason ? 'border-[#E8431A]' : 'border-slate-300'
                          }`}>
                            {cancelReason === reason && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND }} />}
                          </div>
                          <span className={`text-sm font-semibold ${cancelReason === reason ? 'text-slate-900 font-black' : 'text-slate-700'}`}>{reason}</span>
                        </button>
                      ))}
                    </div>

                    {cancelReason === 'Other' && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                        <textarea
                          value={otherReason}
                          onChange={e => setOtherReason(e.target.value)}
                          placeholder="Tell us more…"
                          rows={3}
                          className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#E8431A]/20 focus:border-[#E8431A]"
                        />
                      </motion.div>
                    )}
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100">
                    <button
                      onClick={() => cancelReason && setModifyStep('cancel-confirm')}
                      disabled={!cancelReason}
                      className={`w-full py-4 rounded-2xl font-black text-base transition-colors ${cancelReason ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                      Continue to Cancel
                    </button>
                  </div>
                </>
              )}

              {/* ── Step: Cancel confirmation ── */}
              {modifyStep === 'cancel-confirm' && (
                <div className="flex-1 flex flex-col px-6 py-6 gap-4">
                  <button onClick={() => setModifyStep('cancel-reason')} className="self-start w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-slate-600 rotate-180" />
                  </button>
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
                      <X className="w-8 h-8 text-rose-500" />
                    </div>
                    <div>
                      <p className="font-black text-xl text-slate-900">Cancel this booking?</p>
                      <p className="text-sm text-slate-500 mt-2 font-medium">
                        {modifyBooking.restaurant} · {modifyBooking.date} at {modifyBooking.time}
                      </p>
                      {modifyBooking.tierDiscount && (
                        <p className="text-xs text-rose-500 font-bold mt-2">Your {modifyBooking.tierDiscount} discount will not apply</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={closeModify} className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-sm font-black text-slate-600">Keep It</button>
                    <button onClick={closeModify}  className="flex-1 py-3.5 rounded-2xl bg-rose-500 text-sm font-black text-white">Yes, Cancel</button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
