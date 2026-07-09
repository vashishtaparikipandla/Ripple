with open('src/pages/LocationPickerPage.tsx', 'w') as f:
    f.write("""import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Navigation, MapPin, Clock, Home, Briefcase, Crosshair } from 'lucide-react'

const BRAND = '#E8431A'

export function LocationPickerPage() {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const [address, setAddress] = useState('123 West 42nd St, Manhattan, NY')
  
  // Simulate map drag to fetch new address
  useEffect(() => {
    if (!isDragging) return
    const t = setTimeout(() => {
      setAddress('Fetching exact location...')
    }, 500)
    return () => clearTimeout(t)
  }, [isDragging])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sticky Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-4 shadow-sm z-20 relative">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900">Select Location</h1>
      </div>

      {/* Map Area */}
      <div 
        className="relative h-72 bg-slate-200 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => { setIsDragging(false); setAddress('456 5th Ave, New York, NY') }}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => { setIsDragging(false); setAddress('456 5th Ave, New York, NY') }}
      >
        <motion.img 
          animate={{ scale: isDragging ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
          alt="Map" 
          className="w-full h-full object-cover opacity-80" 
        />
        
        {/* Center Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ y: isDragging ? -15 : 0 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full mb-2 shadow-lg whitespace-nowrap">
              {isDragging ? 'Drag to select' : 'Order to here'}
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6" style={{ color: BRAND }} />
            </div>
            <div className="w-2 h-2 bg-black/20 rounded-full mt-2 blur-sm" />
          </motion.div>
        </div>

        {/* GPS Button overlay on map */}
        <button className="absolute bottom-6 right-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform z-10">
          <Crosshair className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      {/* Bottom Sheet UI */}
      <div className="flex-1 bg-white -mt-4 rounded-t-3xl relative z-20 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>
        
        <div className="px-5 pb-5">
          {/* Current Pin Address */}
          <div className="flex items-center justify-between mb-5 px-1 pt-2">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Confirming location</p>
              <p className="text-lg font-black text-slate-900 truncate max-w-[250px]">{address}</p>
            </div>
            <button 
              onClick={() => navigate(-1)} 
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform"
            >
              Confirm
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for area, street name..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#E8431A]/20"
            />
          </div>

          {/* Current Location Row */}
          <button onClick={() => navigate(-1)} className="w-full flex items-center gap-4 py-3 border-b border-slate-100 text-left">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-black text-blue-600 text-sm">Use Current Location</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Enable GPS for exact address</p>
            </div>
          </button>

          {/* Saved Addresses */}
          <div className="mt-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 px-1">Saved Addresses</h3>
            <div className="space-y-1">
              <button onClick={() => navigate(-1)} className="w-full flex items-center gap-4 py-3 text-left">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex-1 border-b border-slate-50 pb-3 pt-1">
                  <p className="font-black text-slate-900 text-sm">Home</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium truncate max-w-[280px]">123 West 42nd St, Manhattan, NY</p>
                </div>
              </button>
              
              <button onClick={() => navigate(-1)} className="w-full flex items-center gap-4 py-3 text-left">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex-1 pb-3 pt-1">
                  <p className="font-black text-slate-900 text-sm">Work</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium truncate max-w-[280px]">Empire State Building, 350 5th Ave, NY</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
""")

print("LocationPickerPage updated")
