import { useState } from 'react'
import { Check, Save } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function SettingsPage() {
  const { profile, updateProfile } = useDashboardStore()
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'hours' | 'team'>('profile')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-[1000px] space-y-6">
      {/* ── Tab bar ── */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit">
        {[
          { id: 'profile' as const, label: 'Restaurant Profile' },
          { id: 'hours'   as const, label: 'Opening Hours' },
          { id: 'team'    as const, label: 'Team' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-neutral-900 shadow-card'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Profile Tab ── */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <h3 className="font-bold text-neutral-900 mb-1">Restaurant Profile</h3>
          <p className="text-xs text-neutral-400 mb-6">This information is shown to customers in the Ripple app.</p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Restaurant Name', key: 'name' as const,    placeholder: 'Your restaurant name' },
              { label: 'Cuisine Type',   key: 'cuisine' as const,  placeholder: 'e.g. Italian, Indian, Chinese' },
              { label: 'Phone Number',   key: 'phone' as const,    placeholder: '+91 98765 43210' },
              { label: 'Website',        key: 'website' as const,  placeholder: 'www.yourrestaurant.com' },
              { label: 'Email',          key: 'email' as const,    placeholder: 'hello@yourrestaurant.com' },
              { label: 'Address',        key: 'address' as const,  placeholder: 'Street, City, State, PIN' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs font-semibold text-neutral-500 block mb-1.5 uppercase tracking-wider">
                  {field.label}
                </label>
                <input
                  value={(profile as any)[field.key]}
                  onChange={e => updateProfile({ [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>
            ))}

            {/* Description — full width */}
            <div className="col-span-2">
              <label className="text-xs font-semibold text-neutral-500 block mb-1.5 uppercase tracking-wider">
                Description
              </label>
              <textarea
                value={profile.description}
                onChange={e => updateProfile({ description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Hours Tab ── */}
      {activeTab === 'hours' && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <h3 className="font-bold text-neutral-900 mb-1">Opening Hours</h3>
          <p className="text-xs text-neutral-400 mb-6">Set your opening hours for each day of the week.</p>

          <div className="divide-y divide-neutral-100">
            {DAYS.map(day => {
              const hours = profile.openingHours[day] ?? { open: '12:00', close: '23:00', closed: false }
              return (
                <div key={day} className="flex items-center gap-4 py-3">
                  <span className="text-sm font-semibold text-neutral-700 w-28">{day}</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => updateProfile({
                        openingHours: {
                          ...profile.openingHours,
                          [day]: { ...hours, closed: !hours.closed },
                        },
                      })}
                      className={`w-9 h-5 rounded-full relative transition-colors ${hours.closed ? 'bg-neutral-200' : 'bg-brand-600'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${hours.closed ? 'left-0.5' : 'left-[18px]'}`} />
                    </div>
                    <span className="text-xs text-neutral-500">{hours.closed ? 'Closed' : 'Open'}</span>
                  </label>
                  {!hours.closed && (
                    <>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={e => updateProfile({
                            openingHours: { ...profile.openingHours, [day]: { ...hours, open: e.target.value } },
                          })}
                          className="border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-600 transition-all"
                        />
                        <span className="text-neutral-400 text-xs">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={e => updateProfile({
                            openingHours: { ...profile.openingHours, [day]: { ...hours, close: e.target.value } },
                          })}
                          className="border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand-600 transition-all"
                        />
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Team Tab ── */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-card p-6">
          <h3 className="font-bold text-neutral-900 mb-1">Team Members</h3>
          <p className="text-xs text-neutral-400 mb-6">Manage who has access to your Ripple Partner Portal.</p>

          <div className="space-y-3 mb-6">
            {[
              { name: 'Rahul Kumar',  role: 'Owner',   email: 'rahul@therusticspoon.in',  avatar: 'https://i.pravatar.cc/40?img=8' },
              { name: 'Priya Singh',  role: 'Manager', email: 'priya@therusticspoon.in',  avatar: 'https://i.pravatar.cc/40?img=49' },
              { name: 'Arjun Mehta', role: 'Staff',   email: 'arjun@therusticspoon.in', avatar: 'https://i.pravatar.cc/40?img=12' },
            ].map(member => (
              <div key={member.email} className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-colors">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900">{member.name}</p>
                  <p className="text-xs text-neutral-400">{member.email}</p>
                </div>
                <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                  {member.role}
                </span>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-neutral-300 rounded-xl text-sm font-semibold text-neutral-500 hover:border-brand-400 hover:text-brand-600 transition-colors w-full justify-center">
            + Invite team member
          </button>
        </div>
      )}

      {/* ── Save button ── */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all shadow-md ${
            saved ? 'bg-green-500' : 'bg-brand-600 hover:bg-brand-700'
          }`}
        >
          {saved ? <Check size={14} strokeWidth={3} /> : <Save size={14} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
