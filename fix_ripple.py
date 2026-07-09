import re

with open('src/pages/RestaurantPage.tsx', 'r') as f:
    content = f.read()

new_rippleviz = """// ── Premium Ripple Visualization ─────────────────────────────────────────
function RippleViz({ userTier, visits, visitsForGold }: { userTier: Tier; visits: number; visitsForGold: number }) {
  const currentIdx = TIERS.indexOf(userTier)
  
  return (
    <div className="py-2">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Animated Background Waves */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
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
            <p className="text-sm font-bold text-white/60 tracking-wider uppercase mb-1">Your Ripple</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">{visits}</span>
              <span className="text-sm font-medium text-white/60">visits</span>
            </div>
            <p className="text-xs font-bold mt-1 text-amber-400">{visitsForGold - visits} more to unlock Gold</p>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-0.5">Discount</p>
            <p className="text-xl font-black text-white">{RESTAURANT.currentDiscount}%</p>
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
                    isActive ? 'bg-white/10 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                    : isUnlocked ? 'bg-white/5 border-white/10 opacity-70' 
                    : 'bg-black/20 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${isUnlocked ? cfg.cls : 'bg-white/10 text-white/40'}`}>
                        {isUnlocked ? <CheckCircle className="w-5 h-5 text-white" /> : <span className="font-black text-sm">{i * 3 + 1}</span>}
                      </div>
                      <div>
                        <h3 className="font-black text-lg" style={{ color: isUnlocked ? cfg.color : '#fff' }}>{tier}</h3>
                        <p className="text-xs font-medium text-white/60">{i * 3 + 1} visits required</p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#E8431A] text-white px-2.5 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  
                  <div className="bg-black/20 rounded-2xl p-3 border border-white/5">
                    <p className="text-sm font-medium text-white/80 leading-relaxed">
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
    r"// ── Concentric Ripple Visualization ─────────────────────────────────────────\nfunction RippleViz.*?</div>\n    </div>\n  \)\n}",
    new_rippleviz,
    content,
    flags=re.DOTALL
)

with open('src/pages/RestaurantPage.tsx', 'w') as f:
    f.write(content)

print("RippleViz updated")
