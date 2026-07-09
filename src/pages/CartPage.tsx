import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LegalDrawer } from '@/components/LegalDrawer'
import { ArrowLeft, Minus, Plus, Trash2, Droplets, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useStore } from '../lib/store'

const TAX_RATE = 0.08875 // NY tax

export function CartPage() {
  const navigate = useNavigate()
  const cart = useStore(state => state.cart)
  const updateQuantity = useStore(state => state.updateQuantity)
  const clearCart = useStore(state => state.clearCart)
  
  const [showCheckout, setShowCheckout] = useState(false)
  const [usePoints, setUsePoints] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  const tax = subtotal * TAX_RATE
  
  // Ripple Points Logic
  // 1 pt = $0.01, user has 1250 pts = $12.50
  // Max redemption is 20% of subtotal
  const maxRedemptionValue = subtotal * 0.20
  const availablePointsValue = 12.50
  const actualDiscount = Math.min(maxRedemptionValue, availablePointsValue)
  const finalDiscount = usePoints ? actualDiscount : 0

  const total = subtotal + tax - finalDiscount

  const handlePlaceOrder = () => {
    if (!acceptedTerms) return
    setIsSuccess(true)
    setTimeout(() => {
      clearCart()
      navigate('/restaurant/1?demo=gold')
    }, 2500)
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="bg-[#F7F5F2] min-h-full flex flex-col p-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Your cart is empty</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate('/restaurant/1?tab=menu')} className="mt-6 bg-[#E8431A] text-white px-8 py-3.5 rounded-2xl font-black shadow-md">
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100 flex items-center gap-4 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight">Your Order</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">The Rustic Spoon</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto pb-32">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex gap-3">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-sm text-slate-900">{item.name}</h3>
                <p className="font-bold text-slate-500 text-xs">${item.price}</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 w-max">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm border border-slate-200">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-black w-3 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm border border-slate-200">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="font-black text-sm text-slate-900">
              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-5 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm font-semibold text-slate-500">
            <span>Subtotal</span>
            <span className="text-slate-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-slate-500">
            <span>Tax (8.875%)</span>
            <span className="text-slate-900">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={() => setShowCheckout(true)} className="w-full bg-[#E8431A] text-white py-4 rounded-2xl font-black text-base shadow-[0_8px_20px_rgb(232,67,26,0.25)] flex items-center justify-center gap-2">
          Review & Pay
          <ChevronRight className="w-5 h-5 opacity-70" />
        </button>
      </div>

      {/* ── Checkout Drawer ── */}
      <AnimatePresence>
        {showCheckout && !isSuccess && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCheckout(false)} className="fixed inset-0 bg-black/60 z-40" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 flex flex-col"
              style={{ maxHeight: '90%' }}
            >
              <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 bg-slate-200 rounded-full" /></div>
              
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-xl font-black text-slate-900">Checkout</h2>
              </div>

              <div className="overflow-y-auto hide-scrollbar p-5 space-y-6">
                
                {/* Points Redemption */}
                <div className="bg-[#FEF0EC] border border-[#E8431A]/20 rounded-2xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-[#E8431A]" />
                      <h3 className="font-black text-slate-900 text-sm">Use Ripple Points</h3>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={usePoints} onChange={() => setUsePoints(!usePoints)} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E8431A]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    You have <span className="font-bold text-[#E8431A]">1,250 pts</span> ($12.50). 
                    You can redeem up to 20% of your order total.
                  </p>
                  {usePoints && (
                    <div className="mt-3 bg-white/60 p-3 rounded-xl flex justify-between items-center text-sm font-black">
                      <span className="text-[#E8431A]">Points Applied</span>
                      <span className="text-[#E8431A]">-${actualDiscount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Final Total */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-500">Amount to Pay</span>
                    <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="mt-0.5">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-[#E8431A] focus:ring-[#E8431A]"
                           checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    By placing this order, you agree to the <button type="button" onClick={() => setShowTerms(true)} className="font-bold text-[#E8431A] underline">Terms & Conditions</button>. 
                    Food must be picked up or consumed within 30 minutes of the selected time. Cancellations are non-refundable.
                  </p>
                </label>
              </div>

              <div className="p-5 border-t border-slate-100">
                <button 
                  onClick={handlePlaceOrder}
                  disabled={!acceptedTerms}
                  className={`w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all ${
                    acceptedTerms ? 'bg-[#E8431A] text-white shadow-[0_8px_20px_rgb(232,67,26,0.25)]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}>
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Success Animation ── */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#E8431A] z-[100] flex flex-col items-center justify-center text-white px-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}>
              <CheckCircle2 className="w-24 h-24 text-white mb-6" />
            </motion.div>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl font-black mb-2">Order Placed!</motion.h2>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-white/80 font-medium text-sm">
              Your food is being prepared at The Rustic Spoon.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <LegalDrawer isOpen={showTerms} onClose={() => setShowTerms(false)} type="terms" />
    </div>
  )
}
