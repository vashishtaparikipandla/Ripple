import re

with open('src/pages/RestaurantPage.tsx', 'r') as f:
    content = f.read()

# 7. Add new lucide imports
imports_to_add = "Camera, Leaf, Map as MapIcon, Smartphone, Sparkles, Video, Wine,"
content = re.sub(r'Award,\n\s*ShoppingCart, Plus, Minus', f'Award,\n  ShoppingCart, Plus, Minus,\n  {imports_to_add}', content)

# 1. Header Polish
content = re.sub(r'\s*<div className="badge-silver px-2 py-0\.5 rounded-full">\s*<span className="text-\[10px\] font-black text-white">Silver</span>\s*</div>', '', content)
content = re.sub(r'\s*\{\/\* Inline tier callout \*\/\}\s*<div className="badge-silver px-2 py-0\.5 rounded-full">\s*<span className="text-\[10px\] font-black text-white">Silver Ripple</span>\s*</div>', '', content)

# 2. Ripple Layout Improvement (Replace RippleViz completely)
ripple_viz_new = """function RippleViz({ userTier, visits, visitsForGold }: { userTier: Tier; visits: number; visitsForGold: number }) {
  const currentIdx = TIERS.indexOf(userTier)
  return (
    <div className="py-5 px-1">
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-2xl font-black text-slate-900">{visits} <span className="text-sm font-semibold text-slate-400">visits</span></p>
          <p className="text-xs font-bold mt-1 text-[#E8431A]">{visitsForGold - visits} more to unlock Gold</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Discount</p>
          <p className="text-xl font-black text-slate-900">{RESTAURANT.currentDiscount}% OFF</p>
        </div>
      </div>
      
      <div className="relative mt-8 mb-4">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(100, (visits / visitsForGold) * 100)}%`, background: 'linear-gradient(90deg, #E8431A, #F59E0B)' }}
          />
        </div>
        <div className="relative flex justify-between">
          {TIERS.map((tier, i) => {
            const isUnlocked = i <= currentIdx
            const isActive = i === currentIdx
            const cfg = TIER_CONFIG[tier]
            return (
              <div key={tier} className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-white z-10 transition-colors ${isUnlocked ? cfg.cls : 'bg-slate-200'}`}>
                  {isUnlocked && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <div className="absolute top-8 w-20 -ml-10 text-center">
                  <p className={`text-[11px] font-black ${isActive ? 'text-slate-900' : isUnlocked ? 'text-slate-500' : 'text-slate-300'}`}>{tier}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}"""
content = re.sub(r'function RippleViz.*?return \(\n.*?</div>\n    </div>\n  \)\n}', ripple_viz_new, content, flags=re.DOTALL)

# State additions for reviews and photos
state_additions = """
  const [reviewTab, setReviewTab] = useState<'customers' | 'influencers'>('customers')
  const [photoFilter, setPhotoFilter] = useState('All')
"""
content = re.sub(r'const \[showVegOnly, setShowVegOnly\] = useState\(false\)', r"const [showVegOnly, setShowVegOnly] = useState(false)\n" + state_additions, content)

# 6. Veg Only Toggle Switch & Ripple Picks Sparkles
content = content.replace("✨ Ripple Picks", "<span className=\"flex items-center gap-1.5\"><Sparkles className=\"w-4 h-4 text-amber-400\" /> Ripple Picks</span>")
veg_button_old = """<button
                    onClick={() => setShowVegOnly(v => !v)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-black transition-colors border ${
                      showVegOnly
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    🌿 Veg Only
                  </button>"""
veg_button_new = """<button
                    onClick={() => setShowVegOnly(v => !v)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200"
                  >
                    <Leaf className={`w-3.5 h-3.5 ${showVegOnly ? 'text-green-600' : 'text-slate-400'}`} />
                    <span className="text-[11px] font-black text-slate-700">Veg Only</span>
                    <div className={`w-7 h-4 rounded-full transition-colors flex items-center px-0.5 ${showVegOnly ? 'bg-green-600' : 'bg-slate-200'}`}>
                      <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${showVegOnly ? 'translate-x-3' : 'translate-x-0'}`} />
                    </div>
                  </button>"""
content = content.replace(veg_button_old, veg_button_new)

# 7. Icons replacement in Earn Rewards
content = content.replace("{ title: 'Write a review on Google Maps', reward: 'Free Coke', icon: '🗺️' }", "{ title: 'Write a review on Google Maps', reward: 'Free Coke', icon: <MapIcon className=\"w-5 h-5 text-blue-500\" /> }")
content = content.replace("{ title: 'Share a photo of your meal', reward: 'Free Dessert', icon: '📸' }", "{ title: 'Share a photo of your meal', reward: 'Free Dessert', icon: <Camera className=\"w-5 h-5 text-rose-500\" /> }")
content = content.replace("{ title: 'Follow us on Instagram', reward: '+1 Visit', icon: '📱' }", "{ title: 'Follow us on Instagram', reward: '+1 Visit', icon: <Smartphone className=\"w-5 h-5 text-purple-500\" /> }")

# Replace wine glass in upsell
content = content.replace("🍷 Pairs perfectly with", "<span className=\"flex items-center gap-1.5\"><Wine className=\"w-4 h-4 text-rose-600\" /> Pairs perfectly with</span>")

# 3. Reviews Tab Restructuring
reviews_tab_old = r"\{\/\* REVIEWS \*\/\}\s*\{activeTab === 'reviews' && \(\s*<motion\.div key=\"reviews\" initial=\{\{ opacity: 0 \}\} animate=\{\{ opacity: 1 \}\} exit=\{\{ opacity: 0 \}\} className=\"p-4 space-y-4\">\s*<div className=\"bg-white rounded-3xl p-5 flex items-center gap-5 border border-slate-100\">.*?</div>\s*\)\}\s*\{\/\* PHOTOS \*\/\}"
reviews_tab_new = """{/* REVIEWS */}
          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
              
              <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
                <button 
                  onClick={() => setReviewTab('customers')}
                  className={`flex-1 py-2 rounded-lg text-[12px] font-black transition-colors ${reviewTab === 'customers' ? 'bg-[#FEF0EC] text-[#E8431A]' : 'text-slate-500'}`}
                >
                  Customers
                </button>
                <button 
                  onClick={() => setReviewTab('influencers')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-black transition-colors ${reviewTab === 'influencers' ? 'bg-[#FEF0EC] text-[#E8431A]' : 'text-slate-500'}`}
                >
                  <Video className="w-3.5 h-3.5" /> Influencers
                </button>
              </div>

              {reviewTab === 'customers' ? (
                <>
                  <div className="bg-white rounded-3xl p-5 flex items-center gap-5 border border-slate-100">
                    <div className="text-center">
                      <p className="text-5xl font-black text-slate-900">{rest.rating}</p>
                      <div className="flex gap-0.5 mt-1 justify-center">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">{rest.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5,4,3,2,1].map(n => (
                        <div key={n} className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 w-3">{n}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: n === 5 ? '65%' : n === 4 ? '25%' : n === 3 ? '7%' : '3%', backgroundColor: BRAND }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-slate-200 border-dashed">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src="https://i.pravatar.cc/80?u=0" alt="me" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">Share your experience…</span>
                  </button>

                  {rest.userReviews.map(review => (
                    <div key={review.id} className="bg-white p-4 rounded-3xl border border-slate-100">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full object-cover shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-black text-slate-900">{review.author}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{review.date}</p>
                          </div>
                          <div className="flex gap-0.5 mt-1">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{review.text}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
                          {review.images.map((img, idx) => (
                            <img key={idx} src={img} alt="Review photo" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { author: '@foodienyc', likes: '12k', img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=300&h=533&fit=crop' },
                    { author: '@nycbites',  likes: '8.4k', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=533&fit=crop' },
                    { author: '@eatwithme', likes: '21k', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=533&fit=crop' },
                    { author: '@chef_jane', likes: '5.1k', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=533&fit=crop' },
                  ].map((vid, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 group cursor-pointer">
                      <img src={vid.img} alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                        <Heart className="w-3 h-3 text-white fill-white" />
                        <span className="text-[10px] font-bold text-white">{vid.likes}</span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-5 h-5 rounded-full bg-slate-200 border border-white/20 flex items-center justify-center overflow-hidden">
                            <img src={`https://i.pravatar.cc/80?u=${i+20}`} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-black text-white truncate">{vid.author}</span>
                        </div>
                        <p className="text-[9px] text-white/80 font-medium line-clamp-2 leading-tight">Must try the truffle fries here! 🍟✨</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-y-transparent border-l-white ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PHOTOS */}"""
content = re.sub(reviews_tab_old, reviews_tab_new, content, flags=re.DOTALL)

# 4. Photos Tab Categories
photos_tab_old = r"\{\/\* PHOTOS \*\/\}\s*\{activeTab === 'photos' && \(\s*<motion\.div key=\"photos\" initial=\{\{ opacity: 0 \}\} animate=\{\{ opacity: 1 \}\} exit=\{\{ opacity: 0 \}\} className=\"p-4\">\s*<div className=\"grid grid-cols-2 gap-2\">\s*\{rest\.photos\.map\(\(photo, i\) => \(\s*<motion\.div key=\{i\}.*?<\/div>\s*\)\}\s*\{\/\* ABOUT \*\/\}"
photos_tab_new = """{/* PHOTOS */}
          {activeTab === 'photos' && (
            <motion.div key="photos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-4">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {['All', 'Interior', 'Food', 'Drinks'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setPhotoFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${photoFilter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {rest.photos.map((photo, i) => (
                  <motion.div key={i} whileTap={{ scale: 0.96 }}
                    className={`rounded-2xl overflow-hidden bg-slate-100 ${i === 0 ? 'col-span-2 h-48' : 'h-36'}`}>
                    <img src={photo} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ABOUT */}"""
content = re.sub(photos_tab_old, photos_tab_new, content, flags=re.DOTALL)

# 5. About Section Meet the Team
about_tab_end = r"(<div className=\"p-4 flex items-start gap-3\">\s*<Building className=\"w-4 h-4 text-slate-400 mt-0\.5 shrink-0\" \/>.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)"
meet_the_team = r"""\1
              <div className="bg-white rounded-3xl p-5 border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-4">Meet the Team</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-3">
                  {[
                    { name: 'Michael', role: 'Head Chef', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&h=150&fit=crop' },
                    { name: 'Sarah', role: 'Manager', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop' },
                    { name: 'David', role: 'Sommelier', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
                    { name: 'Elena', role: 'Host', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop' },
                  ].map(t => (
                    <div key={t.name} className="flex items-center gap-3">
                      <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                      <div>
                        <p className="text-sm font-black text-slate-900">{t.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>"""
content = re.sub(about_tab_end, meet_the_team, content, flags=re.DOTALL)

with open('src/pages/RestaurantPage.tsx', 'w') as f:
    f.write(content)

print("RestaurantPage updated successfully!")
