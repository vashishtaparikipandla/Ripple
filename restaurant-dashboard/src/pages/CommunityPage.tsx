import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Flag, Trash2, Heart } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import TierBadge from '@/components/TierBadge'
import { formatRelativeDate, type TierName } from '@/lib/utils'

type Filter = 'pending' | 'approved' | 'flagged' | 'all'

const FILTERS: { id: Filter; label: string; color: string }[] = [
  { id: 'all',      label: 'All',      color: 'text-neutral-600' },
  { id: 'pending',  label: 'Pending',  color: 'text-yellow-600' },
  { id: 'approved', label: 'Approved', color: 'text-green-600' },
  { id: 'flagged',  label: 'Flagged',  color: 'text-red-500' },
]

export default function CommunityPage() {
  const { communityPosts, updatePostStatus } = useDashboardStore()
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = communityPosts.filter(p =>
    filter === 'all' ? true : p.status === filter
  )

  const counts = {
    all:      communityPosts.length,
    pending:  communityPosts.filter(p => p.status === 'pending').length,
    approved: communityPosts.filter(p => p.status === 'approved').length,
    flagged:  communityPosts.filter(p => p.status === 'flagged').length,
  }

  return (
    <div className="p-8 max-w-[1400px]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900">Community Content</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Approve or moderate posts from your Ripple members that appear in the community feed
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          {counts.pending} pending review
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit mb-6">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              filter === f.id
                ? 'bg-white text-neutral-900 shadow-card'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {f.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              filter === f.id ? 'bg-neutral-100' : 'bg-white'
            }`}>
              {counts[f.id]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Post Grid ── */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-white rounded-2xl border-2 shadow-card overflow-hidden group ${
                post.status === 'pending'  ? 'border-yellow-200' :
                post.status === 'flagged'  ? 'border-red-200' :
                'border-neutral-200'
              }`}
            >
              {/* Status ribbon */}
              {post.status !== 'approved' && (
                <div className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                  post.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-500'
                }`}>
                  {post.status === 'pending' ? '⏳ Awaiting review' : '🚩 Flagged for review'}
                </div>
              )}

              {/* Post image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Likes overlay */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Heart size={10} className="text-red-400" fill="currentColor" />
                  <span className="text-[10px] font-semibold text-white">{post.likes}</span>
                </div>
              </div>

              {/* Post info */}
              <div className="p-4">
                <p className="text-xs text-neutral-700 leading-relaxed mb-3 line-clamp-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={post.customerAvatar}
                    alt={post.customerName}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-neutral-900 truncate">{post.customerName}</p>
                    <p className="text-[10px] text-neutral-400">{formatRelativeDate(post.postedAt)}</p>
                  </div>
                  <TierBadge tier={post.customerTier as TierName} size="sm" showIcon={false} />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updatePostStatus(post.id, 'approved')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      post.status === 'approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <Check size={12} strokeWidth={post.status === 'approved' ? 3 : 2} />
                    {post.status === 'approved' ? 'Approved' : 'Approve'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updatePostStatus(post.id, 'flagged')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      post.status === 'flagged'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                    }`}
                  >
                    <Flag size={12} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updatePostStatus(post.id, 'pending')}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                  >
                    <Trash2 size={12} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-neutral-400">
          <p className="text-4xl mb-4">🎉</p>
          <p className="font-semibold text-neutral-500">All caught up!</p>
          <p className="text-sm mt-1">No {filter === 'all' ? '' : filter} posts to show.</p>
        </div>
      )}
    </div>
  )
}
