import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LegalDrawer } from '@/components/LegalDrawer'
import { Phone, ChevronRight, ChevronLeft, Droplets, X } from 'lucide-react'

type Step = 'method' | 'phone' | 'otp'

const BRAND = '#E8431A'

export function AuthPage() {
  const navigate = useNavigate()
  const [step, setStep]         = useState<Step>('method')
  const [phone, setPhone]       = useState('')
  const [otp, setOtp]           = useState(['', '', '', '', '', ''])
  const [error, setError]       = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  // Auto-focus first OTP box
  useEffect(() => {
    if (step === 'otp') setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }, [step])

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus()
    if (next.every(d => d !== '') && next.join('').length === 6) {
      setTimeout(() => confirmOtp(next.join('')), 150)
    }
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus()
    }
  }

  const handlePhoneSubmit = () => {
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Enter a valid 10-digit number')
      return
    }
    setError('')
    setIsLoading(true)
    setTimeout(() => { setIsLoading(false); setStep('otp') }, 1200)
  }

  const confirmOtp = (_code: string) => {
    // Accept any 6-digit OTP for the prototype
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('ripple_auth', 'true')
      localStorage.setItem('ripple_user', JSON.stringify({ phone, name: 'Alex Johnson' }))
      navigate('/taste-setup', { replace: true })
    }, 900)
  }

  const handleSocialLogin = (_provider: 'google' | 'apple') => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('ripple_auth', 'true')
      localStorage.setItem('ripple_user', JSON.stringify({ name: 'Alex Johnson', social: _provider }))
      navigate('/taste-setup', { replace: true })
    }, 1200)
  }

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 10)
    if (d.length <= 3)  return d
    if (d.length <= 6)  return `(${d.slice(0,3)}) ${d.slice(3)}`
    return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`
  }

  return (
    <div className="h-full w-full flex flex-col"
         style={{ background: 'linear-gradient(180deg, #FEF0EC 0%, #F7F5F2 40%)' }}>

      {/* Top branding */}
      <div className="flex flex-col items-center pt-12 pb-6 px-8">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
             style={{ backgroundColor: BRAND }}>
          <Droplets className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black text-slate-900" style={{ letterSpacing: '-0.5px' }}>Ripple</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Save while you savour</p>
      </div>

      {/* Card */}
      <div className="flex-1 bg-white rounded-t-[2.5rem] px-7 pt-8 pb-4 shadow-[0_-8px_40px_rgba(0,0,0,0.08)]">

        <AnimatePresence mode="wait">

          {/* ── Method Selection ── */}
          {step === 'method' && (
            <motion.div key="method" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Welcome!</h2>
              <p className="text-sm text-slate-500 mb-8 font-medium">Sign in or create your account</p>

              {/* Phone button */}
              <button
                onClick={() => setStep('phone')}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-slate-100 bg-white mb-3 shadow-sm active:scale-98 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF0EC' }}>
                  <Phone className="w-5 h-5" style={{ color: BRAND }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Continue with Phone</p>
                  <p className="text-[11px] text-slate-400 font-medium">US +1 • OTP verification</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 ml-auto" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] text-slate-400 font-semibold">or</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Google */}
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-slate-100 bg-white mb-3 shadow-sm active:scale-98 transition-transform"
              >
                {/* Google G SVG */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="text-sm font-black text-slate-900">Continue with Google</span>
              </button>

              {/* Apple */}
              <button
                onClick={() => handleSocialLogin('apple')}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-900 mb-3 shadow-sm active:scale-98 transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <span className="text-sm font-black text-white">Continue with Apple</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-6 leading-relaxed">
                By continuing, you agree to our{' '}
                <button type="button" onClick={() => setLegalType('terms')} className="font-bold inline" style={{ color: BRAND }}>Terms</button> &{' '}
                <button type="button" onClick={() => setLegalType('privacy')} className="font-bold inline" style={{ color: BRAND }}>Privacy Policy</button>
              </p>
            </motion.div>
          )}

          {/* ── Phone Input ── */}
          {step === 'phone' && (
            <motion.div key="phone" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <button onClick={() => setStep('method')} className="flex items-center gap-1 text-slate-400 mb-6 -ml-1">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">Back</span>
              </button>

              <h2 className="text-2xl font-black text-slate-900 mb-1">Your number</h2>
              <p className="text-sm text-slate-500 font-medium mb-8">We'll send a 6-digit code to verify</p>

              {/* Phone input */}
              <div className="flex items-center gap-2 border-2 border-slate-200 rounded-2xl px-4 py-4 bg-white mb-2 focus-within:border-[#E8431A] transition-colors overflow-hidden">
                {/* Flag + country code */}
                <div className="flex items-center gap-1.5 pr-3 border-r border-slate-200 shrink-0">
                  <span className="text-xl">🇺🇸</span>
                  <span className="text-sm font-black text-slate-900">+1</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => { setPhone(formatPhone(e.target.value)); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handlePhoneSubmit()}
                  placeholder="(555) 000-0000"
                  className="flex-1 min-w-0 text-[16px] font-bold text-slate-900 bg-transparent outline-none placeholder:text-slate-300"
                />
                {phone && (
                  <button onClick={() => setPhone('')} className="shrink-0">
                    <X className="w-4 h-4 text-slate-300" />
                  </button>
                )}
              </div>

              {error && <p className="text-xs font-bold mb-4" style={{ color: BRAND }}>{error}</p>}

              <button
                onClick={handlePhoneSubmit}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl font-black text-white text-base mt-6 shadow-lg active:scale-98 transition-all relative overflow-hidden"
                style={{ backgroundColor: BRAND }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending OTP…
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </motion.div>
          )}

          {/* ── OTP Entry ── */}
          {step === 'otp' && (
            <motion.div key="otp" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <button onClick={() => { setStep('phone'); setOtp(['','','','','','']) }} className="flex items-center gap-1 text-slate-400 mb-6 -ml-1">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-semibold">Back</span>
              </button>

              <h2 className="text-2xl font-black text-slate-900 mb-1">Enter the code</h2>
              <p className="text-sm text-slate-500 font-medium mb-2">Sent to +1 {phone}</p>

              {/* OTP Boxes */}
              <div className="flex justify-between gap-1 mt-7 mb-5 w-full">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => { otpRefs.current[idx] = el }}
                    value={digit}
                    onChange={e => handleOtpChange(e.target.value, idx)}
                    onKeyDown={e => handleOtpKeyDown(e, idx)}
                    type="tel"
                    maxLength={1}
                    className="otp-box flex-1 min-w-0 h-12 text-center text-xl font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl transition-all"
                  />
                ))}
              </div>

              <p className="text-[11px] text-slate-400 font-medium text-center">
                Didn't receive it?{' '}
                <button className="font-black" style={{ color: BRAND }}>Resend</button>
              </p>

              <p className="text-[10px] text-slate-400 text-center mt-3 bg-slate-50 py-2 rounded-xl">
                Demo: enter any 6 digits
              </p>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 mt-6 py-4 rounded-2xl text-white font-black text-sm"
                     style={{ backgroundColor: BRAND }}>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Verifying…
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
        <LegalDrawer isOpen={legalType !== null} onClose={() => setLegalType(null)} type={legalType || 'terms'} />
      </div>
    </div>
  )
}
