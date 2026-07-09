import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Droplets } from 'lucide-react'

export function SplashPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const onboarded = localStorage.getItem('ripple_onboarded') === 'true'
    const authed    = localStorage.getItem('ripple_auth') === 'true'

    const timer = setTimeout(() => {
      if (authed)    navigate('/',        { replace: true })
      else if (onboarded) navigate('/auth',  { replace: true })
      else           navigate('/welcome', { replace: true })
    }, 2200)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden"
         style={{ background: 'linear-gradient(160deg, #1a0a06 0%, #2D0F05 50%, #E8431A 200%)' }}>

      {/* Animated concentric ripple rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width:  i * 140,
              height: i * 140,
              animation: `ripple-grow 3s ease-out ${(i - 1) * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
             style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}>
          <Droplets className="w-10 h-10 text-white" />
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tight" style={{ letterSpacing: '-1px' }}>
            Ripple
          </h1>
          <p className="text-white/60 text-sm font-medium mt-2 tracking-wide">
            Save while you savour
          </p>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/40"
            style={{ animation: `ring-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  )
}
