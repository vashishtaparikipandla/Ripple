import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Droplets } from 'lucide-react'

// Dummy Data
const TIER_RESTAURANTS: Record<string, any[]> = {
  gold: [
    { id: "5", name: "Cozy Corner Cafe", cuisine: "Cafe & Brunch", rating: 4.5, discount: "15% OFF", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600" },
    { id: "6", name: "The Golden Dragon", cuisine: "Chinese", rating: 4.8, discount: "15% OFF", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600" }
  ],
  silver: [
    { id: "1", name: "The Rustic Spoon", cuisine: "Modern American", rating: 4.8, discount: "10% OFF", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600" },
    { id: "7", name: "Pasta Bella", cuisine: "Italian", rating: 4.6, discount: "10% OFF", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=600" },
    { id: "8", name: "Burger Joint", cuisine: "American", rating: 4.4, discount: "10% OFF", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600" },
    { id: "9", name: "Curry House", cuisine: "Indian", rating: 4.7, discount: "10% OFF", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600" },
    { id: "10", name: "Taco Fiesta", cuisine: "Mexican", rating: 4.5, discount: "10% OFF", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600" }
  ],
  bronze: [
    { id: "3", name: "Bloom Bistro", cuisine: "French", rating: 4.7, discount: "5% OFF", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600" },
  ]
}

const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  gold: { bg: 'bg-amber-500', text: 'text-white' },
  silver: { bg: 'bg-slate-500', text: 'text-white' },
  bronze: { bg: 'bg-[#B45309]', text: 'text-white' }
}

export function TierStatusPage() {
  const { tier } = useParams()
  const navigate = useNavigate()
  
  const activeTier = (tier || 'gold').toLowerCase()
  const restaurants = TIER_RESTAURANTS[activeTier] || []
  const style = TIER_COLORS[activeTier] || TIER_COLORS.gold

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900 capitalize">{activeTier} Status</h1>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-black ${style.bg} ${style.text} flex items-center gap-1`}>
          <Droplets className="w-3.5 h-3.5" />
          {restaurants.length} Places
        </div>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        {restaurants.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Droplets className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="font-bold">No restaurants in this tier yet</p>
          </div>
        ) : (
          restaurants.map(rest => (
            <Link to={`/restaurant/${rest.id}`} key={rest.id} className="block">
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex items-center h-28">
                <img src={rest.image} alt={rest.name} className="w-28 h-full object-cover shrink-0" />
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-sm text-slate-900">{rest.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{rest.cuisine}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-slate-700">{rest.rating}</span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${style.bg} ${style.text}`}>
                      {rest.discount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
