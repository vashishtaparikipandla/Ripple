import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, MessageCircle, Send, MapPin, CheckCircle } from 'lucide-react'


export function RippleStoryPage() {
  const navigate = useNavigate()
  const {} = useParams()

  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=1000&fit=crop" alt="Story" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
            <img src="https://i.pravatar.cc/100?u=story" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-bold shadow-sm">@foodienyc</p>
              <CheckCircle className="w-3 h-3 text-blue-400 fill-white" />
            </div>
            <p className="text-[10px] font-medium text-white/70">2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Main Content Space */}
      <div className="flex-1 relative z-10" />

      {/* Footer Info & Actions */}
      <div className="relative z-10 px-5 pb-8 space-y-4">
        {/* Linked Restaurant Tag */}
        <button onClick={() => navigate('/restaurant/1')} className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs font-black">The Rustic Spoon</span>
        </button>

        <p className="text-sm font-medium leading-relaxed drop-shadow-md">
          Absolutely obsessed with the truffle fries here. 🍟✨ The ambiance is a 10/10!
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <span className="text-[10px] font-bold">12.4k</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold">103</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold">Share</span>
            </button>
          </div>

          <button onClick={() => navigate('/restaurant/1')} className="bg-[#E8431A] text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-xl">
            Book Table
          </button>
        </div>
      </div>
    </div>
  )
}
