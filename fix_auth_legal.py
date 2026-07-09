import re

# AuthPage
with open('src/pages/AuthPage.tsx', 'r') as f:
    auth = f.read()

auth = auth.replace("import { motion, AnimatePresence } from 'framer-motion'", "import { motion, AnimatePresence } from 'framer-motion'\nimport { LegalDrawer } from '@/components/LegalDrawer'")
auth = auth.replace("const [method, setMethod] = useState<'phone' | 'email'>('phone')", "const [method, setMethod] = useState<'phone' | 'email'>('phone')\n  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null)")
auth = auth.replace("""<span className="font-bold" style={{ color: BRAND }}>Terms</span> &{' '}
                <span className="font-bold" style={{ color: BRAND }}>Privacy Policy</span>""", """<button type="button" onClick={() => setLegalType('terms')} className="font-bold inline" style={{ color: BRAND }}>Terms</button> &{' '}
                <button type="button" onClick={() => setLegalType('privacy')} className="font-bold inline" style={{ color: BRAND }}>Privacy Policy</button>""")
auth = auth.replace("</AnimatePresence>\n    </div>", "</AnimatePresence>\n      <LegalDrawer isOpen={legalType !== null} onClose={() => setLegalType(null)} type={legalType || 'terms'} />\n    </div>")

with open('src/pages/AuthPage.tsx', 'w') as f:
    f.write(auth)

# CartPage
with open('src/pages/CartPage.tsx', 'r') as f:
    cart = f.read()

cart = cart.replace("import { motion, AnimatePresence } from 'framer-motion'", "import { motion, AnimatePresence } from 'framer-motion'\nimport { LegalDrawer } from '@/components/LegalDrawer'")
cart = cart.replace("const [acceptedTerms, setAcceptedTerms] = useState(false)", "const [acceptedTerms, setAcceptedTerms] = useState(false)\n  const [showTerms, setShowTerms] = useState(false)")
cart = cart.replace("""<a href="#" className="font-bold text-[#E8431A] underline">Terms & Conditions</a>""", """<button type="button" onClick={() => setShowTerms(true)} className="font-bold text-[#E8431A] underline">Terms & Conditions</button>""")
cart = cart.replace("</AnimatePresence>\n    </div>", "</AnimatePresence>\n      <LegalDrawer isOpen={showTerms} onClose={() => setShowTerms(false)} type=\"terms\" />\n    </div>")

with open('src/pages/CartPage.tsx', 'w') as f:
    f.write(cart)

print("legal drawers added")
