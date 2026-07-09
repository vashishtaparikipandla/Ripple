import re

# UPDATE App.tsx
with open('src/App.tsx', 'r') as f:
    app_ts = f.read()

imports = """import { HomePage } from './pages/HomePage'
import { RestaurantPage } from './pages/RestaurantPage'
import { CartPage } from './pages/CartPage'
import { ProfilePage } from './pages/ProfilePage'
import { AuthPage } from './pages/AuthPage'
import { TasteSetupPage } from './pages/TasteSetupPage'
import { WelcomeTutorialPage } from './pages/WelcomeTutorialPage'
import { RippleStoryPage } from './pages/RippleStoryPage'
import { LocationPickerPage } from './pages/LocationPickerPage'
import { PersonalInfoPage, PaymentMethodsPage, NotificationSettingsPage } from './pages/ProfileSubPages'"""

app_ts = re.sub(r"import \{ HomePage \} from \'\./pages/HomePage\'.*?from \'\./pages/ProfileSubPages\'", imports, app_ts, flags=re.DOTALL)

routes = """          <Route path="/taste-setup" element={<TasteSetupPage />} />
          <Route path="/welcome" element={<WelcomeTutorialPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/location" element={<LocationPickerPage />} />
          <Route path="/story/:id" element={<RippleStoryPage />} />"""

app_ts = re.sub(r'<Route path="/taste-setup" element=\{<TasteSetupPage \/>\} \/>\s*<Route path="/" element=\{<HomePage \/>\} \/>', routes, app_ts)

with open('src/App.tsx', 'w') as f:
    f.write(app_ts)

# UPDATE HomePage.tsx
with open('src/pages/HomePage.tsx', 'r') as f:
    home_ts = f.read()

location_header_old = """        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: BRAND }}>
            <Droplets className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-none">Ripple</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500 font-semibold">Manhattan, NY</span>
            </div>
          </div>
        </div>"""

location_header_new = """        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/location')}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: BRAND }}>
            <Droplets className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-none">Ripple</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500 font-semibold">Manhattan, NY</span>
            </div>
          </div>
        </div>"""

home_ts = home_ts.replace(location_header_old, location_header_new)

story_link_old = """                  <Link to={`/restaurant/${s.id}`} className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ backgroundColor: '#FEF0EC', color: BRAND }}>
                    {s.restaurant} <ChevronRight className="w-3 h-3 inline-block -mt-0.5" />
                  </Link>"""
story_link_new = """                  <Link to={`/story/${s.id}`} className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ backgroundColor: '#FEF0EC', color: BRAND }}>
                    {s.restaurant} <ChevronRight className="w-3 h-3 inline-block -mt-0.5" />
                  </Link>"""
home_ts = home_ts.replace(story_link_old, story_link_new)
home_ts = home_ts.replace("import { useState } from 'react'", "import { useState } from 'react'\nimport { useNavigate } from 'react-router-dom'")
home_ts = re.sub(r'export function HomePage\(\) \{', "export function HomePage() {\n  const navigate = useNavigate()", home_ts)

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(home_ts)

# UPDATE TasteSetupPage.tsx
with open('src/pages/TasteSetupPage.tsx', 'r') as f:
    taste_ts = f.read()

# Expanded Dietary Preferences
diet_opt_old = """              {[
                { id: 'veg' as const,     emoji: '🌿', label: 'Vegetarian / Vegan',  desc: 'Only plant-based dishes for me' },
                { id: 'non-veg' as const, emoji: '🥩', label: 'Non-Vegetarian',        desc: 'I enjoy meat, seafood, everything!' },
                { id: 'both' as const,    emoji: '🍱', label: 'Both Work For Me',       desc: 'No strong preference' },
              ].map(opt => ("""

diet_opt_new = """              {[
                { id: 'veg' as const,     emoji: '🌿', label: 'Vegetarian',  desc: 'Only plant-based dishes for me' },
                { id: 'vegan' as const,   emoji: '🌱', label: 'Vegan',  desc: 'No animal products at all' },
                { id: 'pescatarian' as const, emoji: '🐟', label: 'Pescatarian',  desc: 'Vegetarian + Seafood' },
                { id: 'flexitarian' as const, emoji: '🥗', label: 'Flexitarian',  desc: 'Mostly plants, some meat' },
                { id: 'keto' as const,    emoji: '🥩', label: 'Keto / Low-Carb',  desc: 'High fat, low carb' },
                { id: 'paleo' as const,   emoji: '🍖', label: 'Paleo',  desc: 'Meat, fish, veggies, nuts' },
                { id: 'non-veg' as const, emoji: '🍗', label: 'No Restrictions',  desc: 'I enjoy everything!' },
              ].map(opt => ("""
taste_ts = taste_ts.replace(diet_opt_old, diet_opt_new)
taste_ts = taste_ts.replace("const [dietType, setDietType]     = useState<'veg' | 'non-veg' | 'both' | null>(null)", "const [dietType, setDietType]     = useState<string | null>(null)")

# Custom Allergies Input
allergy_state = "const [allergens, setAllergens]   = useState<Set<string>>(new Set())"
allergy_state_new = allergy_state + "\n  const [customAllergy, setCustomAllergy] = useState('')"
taste_ts = taste_ts.replace(allergy_state, allergy_state_new)

allergens_ui_old = """                  )
                })}
              </div>
            </motion.div>"""
allergens_ui_new = """                  )
                })}
              </div>
              <div className="mt-4 flex gap-2">
                <input 
                  type="text" 
                  value={customAllergy}
                  onChange={e => setCustomAllergy(e.target.value)}
                  placeholder="Type other allergies (e.g. Sesame)" 
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#E8431A]/20 outline-none"
                />
                <button 
                  onClick={() => {
                    if (customAllergy.trim()) {
                      toggleAllergen(customAllergy.trim())
                      setCustomAllergy('')
                    }
                  }}
                  className="bg-[#E8431A] text-white px-4 rounded-xl font-black text-sm"
                >
                  Add
                </button>
              </div>
            </motion.div>"""
taste_ts = taste_ts.replace(allergens_ui_old, allergens_ui_new)
taste_ts = taste_ts.replace("navigate('/', { replace: true })", "navigate('/welcome', { replace: true })")

with open('src/pages/TasteSetupPage.tsx', 'w') as f:
    f.write(taste_ts)

print("done")
