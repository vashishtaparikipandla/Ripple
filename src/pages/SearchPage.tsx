import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, X, Clock, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TRENDING_SEARCHES = ["Sushi near me", "Best burgers", "Happy hour deals", "Rooftop dining", "Date night spots"];

const ALL_SUGGESTIONS = [
  { id: "1", name: "The Rustic Spoon", type: "restaurant", cuisine: "Modern American" },
  { id: "2", name: "Sushi Nami",       type: "restaurant", cuisine: "Japanese" },
  { id: "3", name: "Bloom Bistro",     type: "restaurant", cuisine: "French" },
  { id: "4", name: "Rooftop Garden",   type: "restaurant", cuisine: "Contemporary" },
  { id: "5", name: "Cozy Corner Cafe", type: "restaurant", cuisine: "Cafe & Brunch" },
  { id: "c1", name: "Japanese",        type: "cuisine",    cuisine: "" },
  { id: "c2", name: "Italian",         type: "cuisine",    cuisine: "" },
  { id: "c3", name: "Mexican",         type: "cuisine",    cuisine: "" },
  { id: "c4", name: "American",        type: "cuisine",    cuisine: "" },
  { id: "c5", name: "Thai",            type: "cuisine",    cuisine: "" },
];

const RECENTS_KEY = "ripple_recent_searches";

function getRecents(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]"); } catch { return []; }
}
function saveRecent(term: string) {
  const prev = getRecents().filter(t => t !== term);
  localStorage.setItem(RECENTS_KEY, JSON.stringify([term, ...prev].slice(0, 6)));
}
function clearRecents() {
  localStorage.setItem(RECENTS_KEY, "[]");
}

export function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery]     = useState("");
  const [recents, setRecents] = useState<string[]>(getRecents);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const suggestions = query.trim().length > 0
    ? ALL_SUGGESTIONS.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.cuisine.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (name: string, id?: string) => {
    saveRecent(name);
    setRecents(getRecents());
    if (id && !id.startsWith("c")) {
      navigate(`/restaurant/${id}`);
    } else {
      navigate(`/restaurants?q=${encodeURIComponent(name)}`);
    }
  };

  const handleClearRecents = () => {
    clearRecents();
    setRecents([]);
  };

  return (
    <div className="bg-white min-h-full flex flex-col">

      {/* ── Search Header ── */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-slate-100 bg-white sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 shrink-0"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-slate-600" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && query.trim() && handleSelect(query)}
            placeholder="Restaurants, cuisines, vibes…"
            className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">

        {/* ── Live Suggestions ── */}
        <AnimatePresence>
          {query.trim().length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {suggestions.length > 0 ? (
                <div className="py-2">
                  {suggestions.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(s.name, s.id)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.type === 'cuisine' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                        {s.type === 'cuisine' ? '🍽️' : '📍'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{s.type}{s.cuisine ? ` · ${s.cuisine}` : ''}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400">
                  <p className="text-3xl mb-2">🔍</p>
                  <p className="font-semibold text-slate-600">No results for "{query}"</p>
                  <p className="text-xs mt-1">Try a different name or cuisine</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Empty State: Recents + Trending ── */}
        {query.trim().length === 0 && (
          <div className="px-5 pt-5 space-y-6">

            {/* Recent searches */}
            {recents.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <h3 className="text-sm font-black text-slate-700">Recent Searches</h3>
                  </div>
                  <button onClick={handleClearRecents} className="text-xs font-semibold text-blue-600">Clear all</button>
                </div>
                <div className="space-y-1">
                  {recents.map(term => (
                    <button
                      key={term}
                      onClick={() => { setQuery(term); }}
                      className="w-full flex items-center gap-3 py-2.5 text-left group"
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium flex-1">{term}</span>
                      <X className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-black text-slate-700">Trending Now</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSelect(term)}
                    className="px-4 py-2 rounded-full bg-slate-100 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Explore by cuisine */}
            <div>
              <h3 className="text-sm font-black text-slate-700 mb-3">Explore by Cuisine</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "🇯🇵 Japanese",  id: "c1" },
                  { label: "🇮🇹 Italian",   id: "c2" },
                  { label: "🌮 Mexican",    id: "c3" },
                  { label: "🇺🇸 American",  id: "c4" },
                  { label: "🇹🇭 Thai",      id: "c5" },
                  { label: "🥗 Vegan",      id: "c6" },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(c.label.split(" ")[1], c.id)}
                    className="py-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
