import re

with open('src/pages/TasteSetupPage.tsx', 'r') as f:
    content = f.read()

# 1. Update diet vibes
vibes = """              {[
                { id: 'veg' as const,     emoji: '🌿', label: 'Vegetarian / Vegan',  desc: 'Only plant-based dishes for me' },
                { id: 'non-veg' as const, emoji: '🥩', label: 'Non-Vegetarian',        desc: 'I enjoy meat, seafood, everything!' },
                { id: 'eggitarian' as const, emoji: '🥚', label: 'Eggitarian',        desc: 'Vegetarian but I eat eggs' },
                { id: 'pescatarian' as const, emoji: '🐟', label: 'Pescatarian',       desc: 'Vegetarian plus seafood' },
                { id: 'both' as const,    emoji: '🍱', label: 'No Restrictions',       desc: 'I eat everything' },
              ].map(opt => ("""
content = re.sub(r"\{\[\s*\{ id: 'veg' as const[^\]]+\]\.map\(opt => \(", vibes, content, flags=re.MULTILINE)

# 2. Add customAllergy state and input UI
state_updates = """  const [dietType, setDietType]     = useState<string | null>(null)
  const [allergens, setAllergens]   = useState<Set<string>>(new Set())
  const [customAllergy, setCustomAllergy] = useState('')
  const [spiceLevel, setSpiceLevel] = useState<number | null>(null)

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customAllergy.trim()) return
    setAllergens(prev => {
      const next = new Set(prev)
      next.delete('none')
      next.add(customAllergy.trim().toLowerCase())
      return next
    })
    setCustomAllergy('')
  }"""
content = re.sub(
    r"  const \[dietType, setDietType\].*?const \[spiceLevel, setSpiceLevel\] = useState<number \| null>\(null\)",
    state_updates,
    content,
    flags=re.DOTALL
)

allergen_ui = """                {ALLERGENS.map(a => {
                  const selected = allergens.has(a.id)
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAllergen(a.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                        selected ? 'border-[#E8431A] bg-[#FEF0EC]' : 'border-slate-100 bg-white'
                      }`}
                    >
                      <span className="text-2xl">{a.emoji}</span>
                      <p className={`text-[11px] font-black text-center leading-tight ${selected ? 'text-[#E8431A]' : 'text-slate-700'}`}>
                        {a.label}
                      </p>
                      {selected && (
                        <div className="w-4 h-4 rounded-full flex items-center justify-center absolute top-1 right-1" style={{ backgroundColor: BRAND }}>
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Custom Allergies Chips */}
              <div className="mt-6">
                <p className="text-xs font-black text-slate-700 mb-2">Other Allergies?</p>
                <form onSubmit={handleAddCustom} className="flex gap-2">
                  <input
                    type="text"
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                    placeholder="e.g. Sesame 🍔"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-[#E8431A] focus:ring-1 focus:ring-[#E8431A]"
                  />
                  <button type="submit" className="bg-slate-900 text-white px-4 rounded-xl text-sm font-bold active:scale-95 transition-transform">
                    Add
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.from(allergens).filter(id => !ALLERGENS.some(a => a.id === id) && id !== 'none').map(custom => (
                    <div key={custom} className="bg-[#FEF0EC] border border-[#E8431A] text-[#E8431A] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <span className="capitalize">{custom}</span>
                      <button onClick={() => toggleAllergen(custom)} className="w-4 h-4 bg-[#E8431A] text-white rounded-full flex items-center justify-center hover:opacity-80">
                        <Check className="w-2 h-2 opacity-0" /> {/* Just to keep size consistent */}
                        ×
                      </button>
                    </div>
                  ))}
                </div>"""
content = re.sub(
    r"                \{ALLERGENS\.map\(a => \{.*?\}\)\}\n              </div>",
    allergen_ui,
    content,
    flags=re.DOTALL
)

with open('src/pages/TasteSetupPage.tsx', 'w') as f:
    f.write(content)

print("updated TasteSetupPage")
