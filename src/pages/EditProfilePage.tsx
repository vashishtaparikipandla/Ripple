import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Check } from 'lucide-react'

export function EditProfilePage() {
  const navigate = useNavigate()
  const [name, setName] = useState('Alex Johnson')
  const [email, setEmail] = useState('alex@example.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900">Edit Profile</h1>
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#FEF0EC] text-[#E8431A] rounded-full flex items-center justify-center shrink-0">
          <Check className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150?u=alex-ripple-2024" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#E8431A] flex items-center justify-center border-2 border-white text-white shadow-md">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#E8431A]/20 focus:border-[#E8431A]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#E8431A]/20 focus:border-[#E8431A]" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#E8431A]/20 focus:border-[#E8431A]" />
          </div>
        </div>
      </div>
    </div>
  )
}
