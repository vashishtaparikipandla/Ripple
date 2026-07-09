import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Navigation, MapPin, Clock } from 'lucide-react'

const BRAND = '#E8431A'

export function LocationPickerPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="bg-white px-4 py-3 flex items-center gap-4 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900">Select Location</h1>
      </div>

      <div className="relative h-64 bg-slate-200">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center mb-10">
            <MapPin className="w-6 h-6" style={{ color: BRAND }} />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white -mt-6 rounded-t-3xl relative z-10 p-5 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for area, street name..." 
            className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#E8431A]/20"
          />
        </div>

        <button onClick={() => navigate(-1)} className="w-full flex items-center gap-3 p-4 bg-[#FEF0EC] rounded-2xl">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Navigation className="w-5 h-5" style={{ color: BRAND }} />
          </div>
          <div className="text-left">
            <p className="font-black" style={{ color: BRAND }}>Use Current Location</p>
            <p className="text-xs font-medium text-[#E8431A]/70">Using GPS</p>
          </div>
        </button>

        <div>
          <h3 className="text-sm font-black text-slate-900 mb-3">Saved Addresses</h3>
          <div className="space-y-3">
            <button onClick={() => navigate(-1)} className="w-full flex items-center gap-4 py-2 text-left">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 border-b border-slate-100 pb-3">
                <p className="font-black text-slate-900 text-sm">Home</p>
                <p className="text-xs text-slate-500 mt-0.5">123 West 42nd St, Manhattan, NY</p>
              </div>
            </button>
            <button onClick={() => navigate(-1)} className="w-full flex items-center gap-4 py-2 text-left">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 border-b border-slate-100 pb-3">
                <p className="font-black text-slate-900 text-sm">Work</p>
                <p className="text-xs text-slate-500 mt-0.5">Empire State Building, NY</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
