import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, FileText, XCircle, HelpCircle, MessageSquare } from 'lucide-react'

type BookingContext = 'upcoming' | 'current' | 'past' | null

export function SupportPage() {
  const navigate = useNavigate()
  const [selectedContext, setSelectedContext] = useState<BookingContext>(null)

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900">Help & Support</h1>
      </div>

      <div className="p-5 flex-1 overflow-y-auto space-y-6">
        <div>
          <h2 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider">What do you need help with?</h2>
          <div className="space-y-2">
            <button 
              onClick={() => setSelectedContext('upcoming')}
              className={`w-full bg-white p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${selectedContext === 'upcoming' ? 'border-[#E8431A] ring-1 ring-[#E8431A]' : 'border-slate-100'}`}
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">Upcoming Booking</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Cancel, modify, or get directions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
            <button 
              onClick={() => setSelectedContext('current')}
              className={`w-full bg-white p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${selectedContext === 'current' ? 'border-[#E8431A] ring-1 ring-[#E8431A]' : 'border-slate-100'}`}
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">Current Booking</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Issues at the restaurant</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
            <button 
              onClick={() => setSelectedContext('past')}
              className={`w-full bg-white p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${selectedContext === 'past' ? 'border-[#E8431A] ring-1 ring-[#E8431A]' : 'border-slate-100'}`}
            >
              <div>
                <p className="font-bold text-slate-900 text-sm">Past Booking</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Get an invoice or report an issue</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>

        {selectedContext && (
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
            <h2 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider">Available Options</h2>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
              
              {(selectedContext === 'past' || selectedContext === 'current') && (
                <button className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors active:bg-slate-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">Request an Invoice</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Emailed to you instantly</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              )}

              {(selectedContext === 'upcoming' || selectedContext === 'current') && (
                <button className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors active:bg-slate-50">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    <XCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">Cancel Booking</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Review cancellation policy</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              )}

              <button className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors active:bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">FAQs</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Read articles about this topic</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors active:bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Chat with Support</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Typically replies in 5 mins</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
