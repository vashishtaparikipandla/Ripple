import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Star, Heart, MapPin, X, Droplets, List, Map, ChevronRight, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BRAND = '#E8431A'

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
  { id: "1", name: "The Rustic Spoon", cuisine: "Modern American", rating: 4.8, reviews: 342, distance: 0.8, costForTwo: 120, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600", isSaved: true,  tierDiscount: "10", userTier: "Silver", isOpen: true,  tags: ["drink-dine", "fine-dining"], mapX: 48, mapY: 38, desc: "Elevated American comfort food in a warm rustic setting. Famous for the truffle risotto." },
  { id: "2", name: "Sushi Nami",       cuisine: "Japanese",        rating: 4.9, reviews: 512, distance: 1.2, costForTwo: 180, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "",   userTier: "",     isOpen: true,  tags: ["fresh-finds", "date-night"], mapX: 62, mapY: 55, desc: "Intimate omakase experience in the heart of Midtown. Best sushi in Manhattan by far." },
  { id: "3", name: "Bloom Bistro",     cuisine: "French",          rating: 4.7, reviews: 198, distance: 2.1, costForTwo: 160, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "5",  userTier: "Bronze", isOpen: false, tags: ["fine-dining", "date-night"], mapX: 32, mapY: 62, desc: "A charming French bistro with a garden patio. Perfect for romantic dinners." },
  { id: "4", name: "Rooftop Garden",   cuisine: "Contemporary",    rating: 4.6, reviews: 287, distance: 0.5, costForTwo: 200, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "",   userTier: "",     isOpen: true,  tags: ["rooftops", "drink-dine"],   mapX: 55, mapY: 24, desc: "Stunning rooftop views over Manhattan with craft cocktails and seasonal small plates." },
  { id: "5", name: "Cozy Corner Cafe", cuisine: "Cafe & Brunch",   rating: 4.5, reviews: 430, distance: 0.3, costForTwo: 40,  image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600", isSaved: true,  tierDiscount: "15", userTier: "Gold",   isOpen: true,  tags: ["cozy-cafes", "fresh-finds"], mapX: 25, mapY: 44, desc: "The neighborhood's favorite brunch spot. Avocado toast, homemade granola, specialty coffee." },
];

const CUISINES   = ["American", "Japanese", "French", "Italian", "Mexican", "Indian", "Thai", "Chinese", "Vegan"];
const FACILITIES = ["Serves Alcohol", "Outdoor Seating", "Live Music", "Valet Parking", "Pet Friendly", "Free WiFi"];
const SORT_OPTIONS = [
  { id: "distance",  label: "Distance" },
  { id: "rating",    label: "Popularity" },
  { id: "cost-asc",  label: "Cost ↑" },
  { id: "cost-desc", label: "Cost ↓" },
];

type Restaurant = typeof ALL_RESTAURANTS[0];

// ── Map Pin Component ─────────────────────────────────────────────────────────
function RestaurantPin({ restaurant, isSelected, onClick }: {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      animate={{ scale: isSelected ? 1.15 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${restaurant.mapX}%`, top: `${restaurant.mapY}%`, zIndex: isSelected ? 20 : 10 }}
    >
      <div className="flex flex-col items-center">
        <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full shadow-lg border transition-all whitespace-nowrap ${
          isSelected
            ? 'bg-slate-900 text-white border-slate-900 shadow-slate-900/30'
            : restaurant.isOpen
            ? 'bg-white text-slate-900 border-white/80 shadow-black/10'
            : 'bg-slate-300 text-slate-600 border-slate-300'
        }`}>
          {restaurant.tierDiscount && (
            <Droplets className={`w-2.5 h-2.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#E8431A]'}`} />
          )}
          <span className="text-[11px] font-black leading-none">{restaurant.name.split(' ').slice(0, 2).join(' ')}</span>
          {isSelected && <span className="text-[10px] opacity-70 ml-0.5">${Math.round(restaurant.costForTwo / 2)}+</span>}
        </div>
        {/* Pin pointer */}
        <div className={`w-2 h-2 rotate-45 -mt-1 ${isSelected ? 'bg-slate-900' : restaurant.isOpen ? 'bg-white' : 'bg-slate-300'}`} />
      </div>
    </motion.button>
  );
}

// ── Selected Restaurant Preview ───────────────────────────────────────────────
function SelectedCard({ restaurant, isSaved, onSave, onClose }: {
  restaurant: Restaurant;
  isSaved: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={restaurant.id}
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 16, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="mx-4 mb-3 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl"
    >
      <div className="h-36 relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={`w-full h-full object-cover ${!restaurant.isOpen ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white/90 text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Currently Closed</span>
          </div>
        )}
        <button onClick={onClose} className="absolute top-3 left-3 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <X className="w-3.5 h-3.5 text-slate-600" />
        </button>
        <button onClick={onSave} className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
        </button>
        {restaurant.tierDiscount && (
          <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full badge-${restaurant.userTier.toLowerCase()}`}>
            <Droplets className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold text-white">{restaurant.userTier} · {restaurant.tierDiscount}% OFF</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-black text-slate-900">{restaurant.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-black text-[15px] text-slate-900">{restaurant.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{restaurant.cuisine} · ${restaurant.costForTwo} for two</p>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[11px] shrink-0 ml-2">
            <Navigation className="w-3 h-3" />
            <span className="font-semibold">{restaurant.distance} mi</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">{restaurant.desc}</p>
        <div className="flex gap-2 mt-3">
          <Link
            to={`/restaurant/${restaurant.id}?tab=menu`}
            className="flex-1 py-2.5 rounded-xl border border-[#E8431A] text-[#E8431A] text-xs font-black bg-[#FEF0EC] text-center"
          >
            View Menu
          </Link>
          <Link
            to={`/restaurant/${restaurant.id}?tab=book`}
            className="flex-1 py-2.5 rounded-xl text-white text-xs font-black text-center"
            style={{ backgroundColor: BRAND }}
          >
            Book Table
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Map View ──────────────────────────────────────────────────────────────────
function MapView({ filtered, saved, onToggleSave }: {
  filtered: Restaurant[];
  saved: Record<string, boolean>;
  onToggleSave: (id: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string>(filtered[0]?.id ?? '');
  const listRef = useRef<HTMLDivElement>(null);

  const selectedRestaurant = filtered.find(r => r.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId && listRef.current) {
      const el = listRef.current.querySelector(`[data-rest-id="${selectedId}"]`) as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedId]);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 152px)' }}>

      {/* ── Map ── */}
      <div className="relative shrink-0" style={{ height: '50%' }}>
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=500&fit=crop&q=80"
          alt="City map"
          className="w-full h-full object-cover"
        />
        {/* Subtle tint */}
        <div className="absolute inset-0 bg-slate-900/15" />
        {/* Street grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]">
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 9}%`} y1="0" x2={`${(i + 1) * 9}%`} y2="100%" stroke="white" strokeWidth="1.5" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 13}%`} x2="100%" y2={`${(i + 1) * 13}%`} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        {/* My Location dot */}
        <div className="absolute" style={{ left: '42%', top: '52%' }}>
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-40" />
        </div>
        {/* Location badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
          <MapPin className="w-3 h-3 text-[#E8431A]" />
          <span className="text-[11px] font-black text-slate-900">Manhattan, NY</span>
        </div>
        {/* Restaurant Pins */}
        {filtered.map(r => (
          <RestaurantPin
            key={r.id}
            restaurant={r}
            isSelected={selectedId === r.id}
            onClick={() => setSelectedId(prev => prev === r.id ? '' : r.id)}
          />
        ))}
      </div>

      {/* ── Selected Card ── */}
      <div className="pt-3 bg-[#F8F7F5]">
        <AnimatePresence mode="wait">
          {selectedRestaurant && (
            <SelectedCard
              key={selectedRestaurant.id}
              restaurant={selectedRestaurant}
              isSaved={saved[selectedRestaurant.id]}
              onSave={() => onToggleSave(selectedRestaurant.id)}
              onClose={() => setSelectedId('')}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── List ── */}
      <div ref={listRef} className="flex-1 overflow-y-auto bg-[#F8F7F5] px-4 pb-24">
        <p className="text-[11px] text-slate-500 font-semibold py-3">{filtered.length} spots on map</p>
        <div className="space-y-2">
          {filtered.map(r => (
            <motion.div
              key={r.id}
              data-rest-id={r.id}
              onClick={() => setSelectedId(prev => prev === r.id ? '' : r.id)}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-2xl flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                selectedId === r.id
                  ? 'border-slate-900 shadow-md'
                  : 'border-slate-100 shadow-sm'
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={r.image}
                  alt={r.name}
                  className={`w-14 h-14 rounded-xl object-cover ${!r.isOpen ? 'grayscale opacity-60' : ''}`}
                />
                {r.tierDiscount && (
                  <div className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[8px] font-black text-white shadow badge-${r.userTier.toLowerCase()}`}>
                    {r.tierDiscount}%
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-black text-[13px] text-slate-900 truncate">{r.name}</p>
                  <div className="flex items-center gap-0.5 shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black text-slate-700">{r.rating}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">{r.cuisine}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400 font-semibold">{r.distance} mi</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-[10px] text-slate-400 font-semibold">${r.costForTwo} for two</span>
                  {!r.isOpen && <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">Closed</span>}
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${selectedId === r.id ? 'text-slate-700' : 'text-slate-200'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function RestaurantsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeMood = searchParams.get("mood");

  const [search, setSearch]             = useState("");
  const [showFilter, setShowFilter]     = useState(false);
  const [selectedSort, setSelectedSort] = useState("distance");
  const [selectedCuisines, setSelectedCuisines]     = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [maxCost, setMaxCost]     = useState(300);
  const [viewMode, setViewMode]   = useState<'list' | 'map'>('list');
  const [saved, setSaved]         = useState<Record<string, boolean>>(
    ALL_RESTAURANTS.reduce((acc, r) => ({ ...acc, [r.id]: r.isSaved }), {})
  );

  const toggleSave = (e: React.MouseEvent, id: string) => { e.preventDefault(); setSaved(p => ({ ...p, [id]: !p[id] })); };
  const toggleSaveById = (id: string) => setSaved(p => ({ ...p, [id]: !p[id] }));
  const toggleCuisine  = (c: string) => setSelectedCuisines(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleFacility = (f: string) => setSelectedFacilities(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  const activeFiltersCount = selectedCuisines.length + selectedFacilities.length + (maxCost < 300 ? 1 : 0);

  const filtered = useMemo(() => {
    let list = [...ALL_RESTAURANTS];
    if (activeMood)              list = list.filter(r => r.tags.includes(activeMood));
    if (search.trim())           list = list.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()));
    if (selectedCuisines.length) list = list.filter(r => selectedCuisines.some(c => r.cuisine.toLowerCase().includes(c.toLowerCase())));
    if (maxCost < 300)           list = list.filter(r => r.costForTwo <= maxCost);
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

      {/* ── Sticky Header ── */}
      <div className="bg-white px-5 pt-3 pb-4 border-b border-slate-100 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-black text-slate-900">Explore</h1>
          <div className="flex items-center gap-2">
            {/* List / Map toggle pill */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'map' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                Map
              </button>
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${
                activeFiltersCount > 0 ? 'text-white border-[#E8431A]' : 'border-slate-200 text-slate-600 bg-white'
              }`}
              style={activeFiltersCount > 0 ? { backgroundColor: BRAND } : {}}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search restaurants or cuisine…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-[#E8431A]/40"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {viewMode === 'list' && (
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
        )}
      </div>

      {moodMeta && (
        <div className={`${moodMeta.color} px-5 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{moodMeta.emoji}</span>
            <span className="text-white font-bold text-sm">{moodMeta.label}</span>
          </div>
          <button onClick={() => navigate('/restaurants')} className="text-white/80 text-xs font-semibold flex items-center gap-1">
            Clear <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* ── Content area ── */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-4 pt-4 pb-24 space-y-4"
          >
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
                      <img src={rest.image} alt={rest.name} className={`w-full h-full object-cover ${rest.isOpen ? '' : 'grayscale opacity-60'}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {!rest.isOpen && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                          <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm tracking-wide uppercase">CURRENTLY OFFLINE</span>
                        </div>
                      )}
                      <button onClick={e => toggleSave(e, rest.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                        <Heart className={`w-4 h-4 ${saved[rest.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      </button>
                      {rest.tierDiscount && (
                        <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full badge-${rest.userTier.toLowerCase()}`}>
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
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <MapView filtered={filtered} saved={saved} onToggleSave={toggleSaveById} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Filter Drawer ── */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilter(false)} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: "82%" }}
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              <div className="px-5 py-3 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-lg font-black text-slate-900">Filters & Sort</h2>
                <button onClick={() => setShowFilter(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="overflow-y-auto hide-scrollbar flex-1 px-5 py-4 space-y-6">
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Max Cost for Two: <span style={{ color: BRAND }}>${maxCost === 300 ? "Any" : maxCost}</span></h3>
                  <input type="range" min={20} max={300} step={10} value={maxCost} onChange={e => setMaxCost(Number(e.target.value))} className="w-full" style={{ accentColor: BRAND }} />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$20</span><span>$300+</span></div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Cuisine</h3>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map(c => (
                      <button key={c} onClick={() => toggleCuisine(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${selectedCuisines.includes(c) ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 bg-white'}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {FACILITIES.map(f => (
                      <button key={f} onClick={() => toggleFacility(f)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${selectedFacilities.includes(f) ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-600 bg-white'}`}>{f}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[4.0, 4.5, 4.8].map(r => (
                      <button key={r} className="px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 text-slate-600">{r}+ ★</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
                <button onClick={() => { setSelectedCuisines([]); setSelectedFacilities([]); setMaxCost(300); }} className="flex-1 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600">Reset All</button>
                <button onClick={() => setShowFilter(false)} className="flex-1 py-3 rounded-2xl text-white text-sm font-bold" style={{ backgroundColor: BRAND }}>Apply Filters</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
