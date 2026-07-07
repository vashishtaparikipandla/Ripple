import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Camera } from 'lucide-react'

export function RateExperiencePage() {
  const navigate = useNavigate()
  
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState('')

  return (
    <div className="bg-[#F7F5F2] min-h-full flex flex-col">
      <div className="bg-white px-5 pt-4 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900">Rate Experience</h1>
        <div className="w-10" />
      </div>

      <div className="p-5 flex-1 flex flex-col items-center">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop" className="w-20 h-20 rounded-2xl object-cover mb-4 shadow-sm" />
        <h2 className="text-xl font-black text-slate-900 mb-1 text-center">The Rustic Spoon</h2>
        <p className="text-sm text-slate-500 font-medium mb-8">How was your visit?</p>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-2 transition-transform active:scale-90"
            >
              <Star 
                className={`w-10 h-10 transition-colors ${(hover || rating) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
              />
            </button>
          ))}
        </div>

        <div className="w-full space-y-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share details of your experience..."
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-medium text-slate-800 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#E8431A]/20 focus:border-[#E8431A]"
          />
          
          <button className="w-full bg-slate-100 border border-slate-200 border-dashed rounded-2xl py-6 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Camera className="w-6 h-6 text-slate-400" />
            <span className="text-xs font-bold">Add Photos</span>
          </button>
        </div>
      </div>

      <div className="p-5 bg-white border-t border-slate-100">
        <button 
          onClick={() => navigate('/profile/reviews')}
          disabled={!rating}
          className={`w-full py-4 rounded-2xl font-black text-base transition-colors ${
            rating ? 'bg-[#E8431A] text-white shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}>
          Submit Review
        </button>
      </div>
    </div>
  )
}
