import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'

export function MyReviewsPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'toreview' | 'reviewed'>('toreview')

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">
      <div className="bg-white px-5 pt-4 pb-0 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900">Your Reviews</h1>
        </div>
        <div className="flex">
          <button onClick={() => setActiveTab('toreview')}
            className={`flex-1 py-3 text-[12px] font-black border-b-2 transition-colors ${
              activeTab === 'toreview' ? 'text-[#E8431A] border-[#E8431A]' : 'text-slate-400 border-transparent'
            }`}>
            To Review (2)
          </button>
          <button onClick={() => setActiveTab('reviewed')}
            className={`flex-1 py-3 text-[12px] font-black border-b-2 transition-colors ${
              activeTab === 'reviewed' ? 'text-[#E8431A] border-[#E8431A]' : 'text-slate-400 border-transparent'
            }`}>
            Reviewed (12)
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === 'toreview' ? (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-black text-sm text-slate-900">The Rustic Spoon</h3>
                    <p className="text-xs text-slate-500 font-medium">Visited 2 days ago</p>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/profile/rate/1')} className="w-full py-3 bg-[#FEF0EC] text-[#E8431A] rounded-xl font-black text-sm flex items-center justify-center gap-2">
                <Star className="w-4 h-4" /> Rate Experience
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100&h=100&fit=crop" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Rooftop Garden</h3>
                    <p className="text-xs text-slate-500 font-medium">Visited last week</p>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/profile/rate/4')} className="w-full py-3 bg-[#FEF0EC] text-[#E8431A] rounded-xl font-black text-sm flex items-center justify-center gap-2">
                <Star className="w-4 h-4" /> Rate Experience
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-black text-sm text-slate-900">Sushi Nami</h3>
                    <p className="text-xs text-slate-500 font-medium">Mar 15, 2024</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
                Amazing sushi and great service! The omakase was definitely worth it. Will be coming back.
              </p>
              <div className="flex gap-2">
                <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop" className="w-16 h-16 rounded-xl object-cover" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
