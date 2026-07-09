import re

with open('src/pages/RestaurantPage.tsx', 'r') as f:
    content = f.read()

# 1. Update RippleViz
new_rippleviz = """// ── Premium Ripple Visualization ─────────────────────────────────────────
function RippleViz({ userTier, visits, visitsForGold }: { userTier: Tier; visits: number; visitsForGold: number }) {
  const currentIdx = TIERS.indexOf(userTier)
  
  return (
    <div className="py-2">
      <div className="bg-gradient-to-br from-white via-orange-50/50 to-orange-100/50 rounded-[2.5rem] p-6 text-slate-900 shadow-[0_8px_30px_rgba(232,67,26,0.06)] border border-orange-100 relative overflow-hidden">
        {/* Animated Background Waves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-[200%] h-full animate-[ripple_10s_linear_infinite]">
            <path d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 L200,100 L0,100 Z" fill="currentColor" className="text-[#E8431A]" />
          </svg>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-0 left-0 w-[200%] h-full animate-[ripple_15s_linear_infinite_reverse] opacity-50">
            <path d="M0,60 Q25,80 50,60 T100,60 T150,60 T200,60 L200,100 L0,100 Z" fill="currentColor" className="text-amber-500" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-8">
          <div>
            <p className="text-sm font-bold text-slate-500 tracking-wider uppercase mb-1">Your Ripple</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{visits}</span>
              <span className="text-sm font-medium text-slate-500">visits</span>
            </div>
            <p className="text-xs font-bold mt-1 text-[#E8431A]">{visitsForGold - visits} more to unlock Gold</p>
          </div>
          <div className="text-right bg-white/70 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/60 shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Discount</p>
            <p className="text-xl font-black text-[#E8431A]">{RESTAURANT.currentDiscount}%</p>
          </div>
        </div>
        
        {/* Horizontal Carousel */}
        <div className="relative z-10 -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
            {TIERS.map((tier, i) => {
              const isUnlocked = i <= currentIdx
              const isActive = i === currentIdx
              const cfg = TIER_CONFIG[tier]
              
              return (
                <div 
                  key={tier} 
                  className={`snap-center shrink-0 w-[85%] rounded-3xl p-5 border backdrop-blur-xl transition-all ${
                    isActive ? 'bg-white/90 border-[#E8431A]/30 shadow-[0_8px_20px_rgba(232,67,26,0.08)]' 
                    : isUnlocked ? 'bg-white/60 border-slate-200 opacity-90' 
                    : 'bg-slate-50/50 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${isUnlocked ? cfg.cls : 'bg-slate-200 text-slate-400'}`}>
                        {isUnlocked ? <CheckCircle className="w-5 h-5 text-white" /> : <span className="font-black text-sm">{i * 3 + 1}</span>}
                      </div>
                      <div>
                        <h3 className="font-black text-lg" style={{ color: isUnlocked ? cfg.color : '#64748b' }}>{tier}</h3>
                        <p className="text-xs font-medium text-slate-500">{i * 3 + 1} visits required</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#E8431A] text-white px-2.5 py-1 rounded-full shadow-sm">
                        Active
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                      {isUnlocked 
                        ? `Enjoy your permanent ${i === 0 ? '5%' : i === 1 ? '10%' : '20%'} discount on all orders.`
                        : `Visit ${i * 3 + 1 - visits} more times to unlock a permanent ${i === 0 ? '5%' : i === 1 ? '10%' : '20%'} discount.`
                      }
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes ripple {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
"""
content = re.sub(
    r"// ── Premium Ripple Visualization ─────────────────────────────────────────\nfunction RippleViz.*?</div>\n  \)\n}",
    new_rippleviz,
    content,
    flags=re.DOTALL
)

# 2. Update photos array
old_photos = """  photos: [
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400',
  ],"""
new_photos = """  photos: [
    { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=400', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=400', category: 'Drinks' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400', category: 'Drinks' },
  ],"""
content = content.replace(old_photos, new_photos)

# 3. Update photo rendering
old_render = """              <div className="grid grid-cols-2 gap-2">
                {rest.photos.map((photo, i) => (
                  <motion.div key={i} whileTap={{ scale: 0.96 }}
                    className={`rounded-2xl overflow-hidden bg-slate-100 ${i === 0 ? 'col-span-2 h-48' : 'h-36'}`}>
                    <img src={photo} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>"""
new_render = """              <div className="grid grid-cols-2 gap-2">
                {rest.photos
                  .filter((p: any) => photoFilter === 'All' || p.category === photoFilter)
                  .map((photo: any, i: number) => (
                  <motion.div key={i} whileTap={{ scale: 0.96 }}
                    className={`rounded-2xl overflow-hidden bg-slate-100 ${i === 0 ? 'col-span-2 h-48' : 'h-36'}`}>
                    <img src={photo.url} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>"""
content = content.replace(old_render, new_render)

# 4. Update "Your Gold is fading"
old_fading = """                  <p className="text-sm font-black text-slate-900">Your Gold is fading!</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mb-3">Visit within 3 days to keep your Gold Ripple status at this restaurant.</p>
                <button onClick={() => setShowHoldGold(p => !p)} className="text-[11px] font-black flex items-center gap-1" style={{ color: BRAND }}>
                  Hold onto Gold <ChevronRight className="w-3 h-3" />"""
new_fading = """                  <p className="text-sm font-black text-slate-900">Your {rest.userTier} is fading!</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mb-3">Visit within 3 days to keep your {rest.userTier} Ripple status at this restaurant.</p>
                <button onClick={() => setShowHoldGold(p => !p)} className="text-[11px] font-black flex items-center gap-1" style={{ color: BRAND }}>
                  Hold onto {rest.userTier} <ChevronRight className="w-3 h-3" />"""
content = content.replace(old_fading, new_fading)


with open('src/pages/RestaurantPage.tsx', 'w') as f:
    f.write(content)

print("RestaurantPage updated")
