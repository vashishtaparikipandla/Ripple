import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface LegalDrawerProps {
  isOpen: boolean
  onClose: () => void
  type: 'terms' | 'privacy'
}

export function LegalDrawer({ isOpen, onClose, type }: LegalDrawerProps) {
  const isTerms = type === 'terms'
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" 
          />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] flex flex-col shadow-2xl"
            style={{ maxHeight: '90vh' }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
            </div>
            
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">
                {isTerms ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 active:scale-95 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-2">1. Introduction</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Welcome to Ripple. These terms govern your use of our mobile application and related services. By using Ripple, you agree to these terms in full. If you disagree with any part of these terms, you must not use our application.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-2">2. Data & Privacy</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  We take your privacy seriously. The data we collect (such as dining preferences, location, and payment methods) is strictly used to enhance your experience. We do not sell your personal data to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-black text-slate-900 mb-2">3. Ripple Points & Tiers</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Points and tiers earned via the Ripple platform have no cash value. They are solely for promotional use at participating venues. The platform reserves the right to modify, suspend, or terminate the rewards program at any time.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-2">4. User Conduct</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  You agree to use Ripple only for lawful purposes. Any fraudulent activity, such as creating fake reviews or abusing the referral system, will result in immediate termination of your account.
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white">
              <button onClick={onClose} className="w-full py-4 rounded-2xl bg-[#E8431A] text-white font-black text-base shadow-lg shadow-orange-500/30">
                I Understand
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
