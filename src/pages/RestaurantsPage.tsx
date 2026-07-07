import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Star, Heart, MapPin, X, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MOOD_META: Record<string, { emoji: string; label: string; color: string }> = {
  "drink-dine":  { emoji: "🍸", label: "Drink & Dine",  color: "bg-indigo-600" },
  "fine-dining": { emoji: "🕯️", label: "Fine Dining",   color: "bg-amber-700" },
  "fresh-finds": { emoji: "🥗", label: "Fresh Finds",   color: "bg-emerald-600" },
  "rooftops":    { emoji: "🌆", label: "Rooftops",       color: "bg-cyan-600" },
  "party-vibes": { emoji: "🎉", label: "Party Vibes",    color: "bg-rose-600" },
  "cozy-cafes":  { emoji: "☕", label: "Cozy Cafes",     color: "bg-amber-800" },
  "buffet":      { emoji: "🍱", label: "Buffet",         color: "bg-lime-700" },
  "date-night":  { emoji: "❤️", label: "Date Night",    color: "bg-pink-600" },
};

const ALL_RESTAURANTS = [
  { id: "1", name: "The Rustic Spoon", cuisine: "Modern American", rating: 4.8, reviews: 342, distance: 0.8, costForTwo: 120, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600", isSaved: true, tierDiscount: "10", userTier: "Silver", isOpen: true, tags: ["drink-dine", "fine-dining"] },
  { id: "2", name: "Sushi Nami",       cuisine: "Japanese",        rating: 4.9, reviews: 512, distance: 1.2, costForTwo: 180, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: null, userTier: null, isOpen: true, tags: ["fresh-finds", "date-night"] },
  { id: "3", name: "Bloom Bistro",     cuisine: "French",          rating: 4.7, reviews: 198, distance: 2.1, costForTwo: 160, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "5", userTier: "Bronze", isOpen: false, tags: ["fine-dining", "date-night"] },
  { id: "4", name: "Rooftop Garden",   cuisine: "Contemporary",    rating: 4.6, reviews: 287, distance: 0.5, costForTwo: 200, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: null, userTier: null, isOpen: true, tags: ["rooftops", "drink-dine"] },
  { id: "5", name: "Cozy Corner Cafe", cuisine: "Cafe & Brunch",   rating: 4.5, reviews: 430, distance: 0.3, costForTwo: 40,  image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600", isSaved: true, tierDiscount: "15", userTier: "Gold", isOpen: true, tags: ["cozy-cafes", "fresh-finds"] },
];

const CUISINES   = ["American", "Japanese", "French", "Italian", "Mexican", "Indian", "Thai", "Chinese", "Vegan"];
const FACILITIES = ["Serves Alcohol", "Outdoor Seating", "Live Music", "Valet Parking", "Pet Friendly", "Free WiFi"];
const SORT_OPTIONS = [
  { id: "distance",    label: "Distance" },
  { id: "rating",      label: "Popularity" },
  { id: "cost-asc",   label: "Cost ↑" },
  { id: "cost-desc",  label: "Cost ↓" },
];

export function RestaurantsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeMood = searchParams.get("mood");

  const [search, setSearch]                 = useState("");
  const [showFilter, setShowFilter]         = useState(false);
  const [selectedSort, setSelectedSort]     = useState("distance");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [maxCost, setMaxCost]               = useState(300);
  const [saved, setSaved]                   = useState<Record<string, boolean>>(
    ALL_RESTAURANTS.reduce((acc, r) => ({ ...acc, [r.id]: r.isSaved }), {})
  );

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCuisine  = (c: string) => setSelectedCuisines(p  => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleFacility = (f: string) => setSelectedFacilities(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  const activeFiltersCount = selectedCuisines.length + selectedFacilities.length + (maxCost < 300 ? 1 : 0);

  const filtered = useMemo(() => {
    let list = [...ALL_RESTAURANTS];
    if (activeMood)            list = list.filter(r => r.tags.includes(activeMood));
    if (search.trim())         list = list.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()));
    if (selectedCuisines.length) list = list.filter(r => selectedCuisines.some(c => r.cuisine.toLowerCase().includes(c.toLowerCase())));
    if (maxCost < 300)         list = list.filter(r => r.costForTwo <= maxCost);

    list.sort((a, b) => {
      if (selectedSort === "distance")  return a.distance - b.distance;
      if (selectedSort === "rating")    return b.rating - a.rating;
      if (selectedSort === "cost-asc")  return a.costForTwo - b.costForTwo;
      if (selectedSort === "cost-desc") return b.costForTwo - a.costForTwo;
      return 0;
    });
    return list;
  }, [activeMood, search, selectedCuisines, maxCost, selectedSort]);

  const moodMeta = activeMood ? MOOD_META[activeMood] : null;

  return (
    <div className="bg-[#F8F7F5] min-h-full">

      {/* ── Header ── */}
      <div className="bg-white px-5 pt-3 pb-4 border-b border-slate-100 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-black text-slate-900">Explore</h1>
          <button
            onClick={() => setShowFilter(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${
              activeFiltersCount > 0 ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 text-slate-600 bg-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>

        {/* Search within restaurants page */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search restaurants or cuisine…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Sort chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedSort(opt.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedSort === opt.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mood Context Banner ── */}
      {moodMeta && (
        <div className={`${moodMeta.color} px-5 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{moodMeta.emoji}</span>
            <span className="text-white font-bold text-sm">{moodMeta.label}</span>
          </div>
          <button
            onClick={() => navigate('/restaurants')}
            className="text-white/80 text-xs font-semibold flex items-center gap-1"
          >
            Clear <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* ── Results ── */}
      <div className="px-4 pt-4 pb-4 space-y-4">
        <p className="text-xs text-slate-500 font-semibold">{filtered.length} restaurants found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-bold text-slate-600">No restaurants found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          filtered.map((rest, i) => (
            <Link to={`/restaurant/${rest.id}`} key={rest.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm mb-4"
              >
                <div className="h-40 relative">
                  <img src={rest.image} alt={rest.name} className={`w-full h-full object-cover ${rest.isOpen ? '' : 'grayscale opacity-80'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {!rest.isOpen && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-black backdrop-blur-md tracking-wide">CLOSED</span>
                    </div>
                  )}
                  <button
                    onClick={e => toggleSave(e, rest.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${saved[rest.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  </button>
                  {rest.tierDiscount && (
                    <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full badge-${rest.userTier?.toLowerCase()}`}>
                      <Droplets className="w-3 h-3 text-white" />
                      <span className="text-[10px] font-bold text-white">{rest.userTier} · {rest.tierDiscount}% OFF</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[15px] text-slate-900">{rest.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{rest.cuisine} · ${rest.costForTwo} for two</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-xl">
                      <Star className="w-3 h-3 fill-green-600 text-green-600" />
                      <span className="text-xs font-black text-green-700">{rest.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{rest.distance} mi</span>
                    <span>·</span>
                    <span>{rest.reviews} reviews</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      {/* ── Filter Drawer ── */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
              className="absolute inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: "82%" }}
            >
              {/* Drawer handle */}
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              <div className="px-5 py-3 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900">Filters & Sort</h2>
                <button onClick={() => setShowFilter(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-4 space-y-6">

                {/* Cost for Two */}
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Max Cost for Two: <span className="text-blue-600">${maxCost === 300 ? "Any" : maxCost}</span></h3>
                  <input
                    type="range" min={20} max={300} step={10}
                    value={maxCost}
                    onChange={e => setMaxCost(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$20</span><span>$300+</span>
                  </div>
                </div>

                {/* Cuisine */}
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Cuisine</h3>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map(c => (
                      <button
                        key={c}
                        onClick={() => toggleCuisine(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          selectedCuisines.includes(c) ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 bg-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {FACILITIES.map(f => (
                      <button
                        key={f}
                        onClick={() => toggleFacility(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          selectedFacilities.includes(f) ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 bg-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[4.0, 4.5, 4.8].map(r => (
                      <button key={r} className="px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 text-slate-600">
                        {r}+ ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => { setSelectedCuisines([]); setSelectedFacilities([]); setMaxCost(300); }}
                  className="flex-1 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setShowFilter(false)}
                  className="flex-1 py-3 rounded-2xl bg-blue-600 text-white text-sm font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
