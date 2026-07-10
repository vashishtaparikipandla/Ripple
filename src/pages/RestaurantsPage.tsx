import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, Star, Heart, MapPin, X, Droplets, List, Map, Navigation } from "lucide-react";
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
  { id: "1", name: "The Rustic Spoon", cuisine: "Modern American", rating: 4.8, reviews: 342, distance: 0.8, costForTwo: 120, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600", isSaved: true,  tierDiscount: "10", userTier: "Silver", isOpen: true,  tags: ["drink-dine", "fine-dining"], mapX: 42, mapY: 38, desc: "Elevated American comfort food in a warm rustic setting. Famous for the truffle risotto." },
  { id: "2", name: "Sushi Nami",       cuisine: "Japanese",        rating: 4.9, reviews: 512, distance: 1.2, costForTwo: 180, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "",   userTier: "",     isOpen: true,  tags: ["fresh-finds", "date-night"], mapX: 62, mapY: 52, desc: "Intimate omakase experience in the heart of Midtown. Best sushi in Manhattan by far." },
  { id: "3", name: "Bloom Bistro",     cuisine: "French",          rating: 4.7, reviews: 198, distance: 2.1, costForTwo: 160, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "5",  userTier: "Bronze", isOpen: false, tags: ["fine-dining", "date-night"], mapX: 32, mapY: 28, desc: "A charming French bistro with a garden patio. Perfect for romantic dinners." },
  { id: "4", name: "Rooftop Garden",   cuisine: "Contemporary",    rating: 4.6, reviews: 287, distance: 0.5, costForTwo: 200, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600", isSaved: false, tierDiscount: "",   userTier: "",     isOpen: true,  tags: ["rooftops", "drink-dine"],   mapX: 75, mapY: 24, desc: "Stunning rooftop views over Manhattan with craft cocktails and seasonal small plates." },
  { id: "5", name: "Cozy Corner Cafe", cuisine: "Cafe & Brunch",   rating: 4.5, reviews: 430, distance: 0.3, costForTwo: 40,  image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600", isSaved: true,  tierDiscount: "15", userTier: "Gold",   isOpen: true,  tags: ["cozy-cafes", "fresh-finds"], mapX: 25, mapY: 58, desc: "The neighborhood's favorite brunch spot. Avocado toast, homemade granola, specialty coffee." },
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
      animate={{ scale: isSelected ? 1.1 : 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${restaurant.mapX}%`, top: `${restaurant.mapY}%`, zIndex: isSelected ? 20 : 10 }}
    >
      <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-full shadow-md border transition-all whitespace-nowrap ${
        isSelected
          ? 'bg-slate-900 text-white border-slate-900 shadow-slate-900/30 ring-4 ring-slate-900/20'
          : restaurant.isOpen
          ? 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
          : 'bg-slate-100 text-slate-500 border-slate-200 opacity-90'
      }`}>
        <span className="text-[12px] font-black leading-tight">{restaurant.name.split(' ').slice(0, 2).join(' ')}</span>
        <span className={`text-[10px] font-bold ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
          ★ {restaurant.rating}
        </span>
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
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="mx-4 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-auto"
    >
      <div className="h-32 relative">
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
        <button onClick={onClose} className="absolute top-2.5 left-2.5 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform">
          <X className="w-3.5 h-3.5 text-slate-600" />
        </button>
        <button onClick={onSave} className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform">
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
        </button>
        {restaurant.tierDiscount && (
          <div className={`absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full shadow-sm badge-${restaurant.userTier.toLowerCase()}`}>
            <Droplets className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold text-white">{restaurant.userTier} · {restaurant.tierDiscount}% OFF</span>
          </div>
        )}
      </div>
      <div className="p-3.5">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-black text-[15px] text-slate-900 leading-tight">{restaurant.name}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{restaurant.cuisine} · ${restaurant.costForTwo} for two</p>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[10px] shrink-0 bg-slate-50 px-2 py-1 rounded-lg">
            <Navigation className="w-2.5 h-2.5" />
            <span className="font-bold">{restaurant.distance} mi</span>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Link
            to={`/restaurant/${restaurant.id}?tab=menu`}
            className="flex-1 py-2 rounded-xl border-2 border-[#E8431A] text-[#E8431A] text-xs font-black bg-[#FEF0EC] text-center"
          >
            Menu
          </Link>
          <Link
            to={`/restaurant/${restaurant.id}?tab=book`}
            className="flex-1 py-2 rounded-xl text-white text-xs font-black text-center shadow-sm shadow-orange-500/20"
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
  const [selectedId, setSelectedId] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedRestaurant = filtered.find(r => r.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId && listRef.current) {
      const el = listRef.current.querySelector(`[data-rest-id="${selectedId}"]`) as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedId]);

  return (
    <div className="relative overflow-hidden bg-[#E8F1F2]" style={{ height: 'calc(100dvh - 152px)' }}>
      {/* ── Vector Map Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Base Land */}
          <rect width="100%" height="100%" fill="#F2EFE9" />
          
          {/* Water Features */}
          <path d="M-50,800 Q150,650 350,850 T1200,600 L1200,1200 L-50,1200 Z" fill="#D4E5ED" />
          <path d="M-50,250 Q200,100 650,300 T1200,-50 L-50,-50 Z" fill="#D4E5ED" />
          <path d="M700,-50 Q850,200 1200,350 L1200,-50 Z" fill="#D4E5ED" />
          
          {/* Parks */}
          <rect x="15%" y="35%" width="25%" height="18%" rx="12" fill="#DCEBCC" />
          <rect x="65%" y="22%" width="18%" height="25%" rx="12" fill="#DCEBCC" />
          <circle cx="85%" cy="65%" r="10%" fill="#DCEBCC" />
          <circle cx="20%" cy="75%" r="12%" fill="#DCEBCC" />

          {/* Major Arteries */}
          <g stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round">
            <line x1="25%" y1="-10%" x2="45%" y2="110%" />
            <line x1="55%" y1="-10%" x2="65%" y2="110%" />
            <line x1="85%" y1="-10%" x2="95%" y2="110%" />
            <line x1="-10%" y1="20%" x2="110%" y2="35%" />
            <line x1="-10%" y1="55%" x2="110%" y2="45%" />
            <line x1="-10%" y1="85%" x2="110%" y2="80%" />
          </g>

          {/* Minor Streets */}
          <g stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round">
            <line x1="15%" y1="-10%" x2="25%" y2="110%" />
            <line x1="35%" y1="-10%" x2="55%" y2="110%" />
            <line x1="45%" y1="-10%" x2="75%" y2="110%" />
            <line x1="75%" y1="-10%" x2="85%" y2="110%" />
            <line x1="-10%" y1="10%" x2="110%" y2="15%" />
            <line x1="-10%" y1="35%" x2="110%" y2="25%" />
            <line x1="-10%" y1="45%" x2="110%" y2="55%" />
            <line x1="-10%" y1="70%" x2="110%" y2="65%" />
            <line x1="-10%" y1="95%" x2="110%" y2="90%" />
          </g>
        </svg>
      </div>

      {/* ── Map Interactive Layer ── */}
      <div className="absolute inset-0 z-10" onClick={() => { if(!drawerOpen) setSelectedId(''); }}>
        {/* My Location dot */}
        <div className="absolute" style={{ left: '48%', top: '48%' }}>
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-40" />
        </div>

        {/* Location badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
          <MapPin className="w-3.5 h-3.5 text-[#E8431A]" />
          <span className="text-[12px] font-black text-slate-900">Manhattan, NY</span>
        </div>

        {/* Restaurant Pins */}
        {filtered.map(r => (
          <RestaurantPin
            key={r.id}
            restaurant={r}
            isSelected={selectedId === r.id}
            onClick={() => { setSelectedId(r.id); setDrawerOpen(false); }}
          />
        ))}
      </div>

      {/* ── Floating Selected Card (Moves up when drawer opens, down when closed) ── */}
      <div
        className="absolute left-0 right-0 z-20 pointer-events-none px-2"
        style={{
          bottom: drawerOpen ? '85%' : '76px', // Hover above drawer handle
          transition: 'bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
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

      {/* ── Bottom Drawer (List) ── */}
      <motion.div
        initial={false}
        animate={{ y: drawerOpen ? 0 : 'calc(100% - 64px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.1)] flex flex-col"
        style={{ height: '82%' }}
      >
        {/* Handle Area (Click to toggle) */}
        <div
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="shrink-0 h-[64px] flex flex-col items-center justify-center cursor-pointer bg-white rounded-t-3xl border-b border-slate-100/50"
        >
          <div className="w-10 h-1.5 bg-slate-200 rounded-full mb-2" />
          <p className="text-[14px] font-black text-slate-900">
            Over {filtered.length} places in Manhattan
          </p>
        </div>

        {/* Scrollable List */}
        <div ref={listRef} className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 space-y-3 pb-8">
          {filtered.map(r => (
            <motion.div
              key={r.id}
              data-rest-id={r.id}
              onClick={() => setSelectedId(r.id)}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-2xl flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                selectedId === r.id
                  ? 'border-slate-900 shadow-md ring-1 ring-slate-900/5'
                  : 'border-slate-100 shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={r.image}
                  alt={r.name}
                  className={`w-16 h-16 rounded-xl object-cover ${!r.isOpen ? 'grayscale opacity-60' : ''}`}
                />
                {r.tierDiscount && (
                  <div className={`absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white shadow badge-${r.userTier.toLowerCase()}`}>
                    {r.tierDiscount}%
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 pl-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-black text-[14px] text-slate-900 truncate leading-tight">{r.name}</p>
                  <div className="flex items-center gap-0.5 shrink-0 bg-slate-50 px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-black text-slate-700">{r.rating}</span>
                  </div>
                </div>
                <p className="text-[12px] text-slate-500 font-medium mt-0.5 truncate">{r.cuisine}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-0.5"><MapPin className="w-3 h-3" />{r.distance} mi</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-[11px] text-slate-500 font-semibold">${r.costForTwo} for two</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
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
      <div className="bg-white px-5 pt-3 pb-4 border-b border-slate-100 sticky top-0 z-40">
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
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar -mx-5 px-5">
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
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] mb-4"
                  >
                    <div className="h-44 relative">
                      <img src={rest.image} alt={rest.name} className={`w-full h-full object-cover ${rest.isOpen ? '' : 'grayscale opacity-60'}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {!rest.isOpen && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                          <span className="bg-white/90 text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm tracking-wide uppercase">CURRENTLY OFFLINE</span>
                        </div>
                      )}
                      <button onClick={e => toggleSave(e, rest.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                        <Heart className={`w-4 h-4 ${saved[rest.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      </button>
                      {rest.tierDiscount && (
                        <div className={`absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full badge-${rest.userTier.toLowerCase()}`}>
                          <Droplets className="w-3.5 h-3.5 text-white" />
                          <span className="text-[11px] font-bold text-white">{rest.userTier} · {rest.tierDiscount}% OFF</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-black text-[16px] text-slate-900">{rest.name}</h3>
                          <p className="text-[13px] text-slate-500 mt-0.5">{rest.cuisine} · ${rest.costForTwo} for two</p>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-xl">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-black text-slate-700">{rest.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[12px] text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="font-medium">{rest.distance} mi</span>
                        <span>·</span>
                        <span className="font-medium">{rest.reviews} reviews</span>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilter(false)} className="fixed inset-0 bg-black/60 z-[60]" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[60] flex flex-col"
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
                <button onClick={() => { setSelectedCuisines([]); setSelectedFacilities([]); setMaxCost(300); }} className="flex-1 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 bg-slate-50">Reset All</button>
                <button onClick={() => setShowFilter(false)} className="flex-1 py-3 rounded-2xl text-white text-sm font-bold" style={{ backgroundColor: BRAND }}>Apply Filters</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
