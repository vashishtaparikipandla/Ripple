import re

with open('src/pages/RestaurantPage.tsx', 'r') as f:
    content = f.read()

# Replace the reviews tab
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
          )}"""

content = re.sub(
    r"\{\/\* REVIEWS \*\/\}\s*\{activeTab === 'reviews' && \(\s*<motion\.div key=\"reviews\".*?\{\/\* PHOTOS \*\/\}", 
    reviews_tab_new + "\n\n          {/* PHOTOS */}", 
    content, 
    flags=re.DOTALL
)

with open('src/pages/RestaurantPage.tsx', 'w') as f:
    f.write(content)
print("done")
