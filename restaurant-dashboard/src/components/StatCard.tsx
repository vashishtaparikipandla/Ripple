import { type LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  delta?: number          // percentage change (+/-), undefined = no delta shown
  deltaLabel?: string     // e.g. "vs last week"
  icon: LucideIcon
  iconColor?: string      // Tailwind class e.g. "text-brand-600"
  iconBg?: string         // Tailwind class e.g. "bg-brand-50"
  className?: string
  onClick?: () => void
}

export default function StatCard({
  label,
  value,
  delta,
  deltaLabel = 'vs last week',
  icon: Icon,
  iconColor = 'text-brand-600',
  iconBg = 'bg-brand-50',
  className,
  onClick,
}: StatCardProps) {
  const deltaPositive = (delta ?? 0) > 0
  const deltaZero     = delta === 0 || delta === undefined

  const DeltaIcon = deltaZero ? Minus : deltaPositive ? TrendingUp : TrendingDown
  const deltaColor = deltaZero
    ? 'text-neutral-400'
    : deltaPositive
    ? 'text-success-600'
    : 'text-danger-500'

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-neutral-200 p-5 shadow-card transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-card-md hover:-translate-y-0.5',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
        {delta !== undefined && (
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full',
              deltaPositive ? 'bg-success-50 text-success-600' : deltaZero ? 'bg-neutral-100 text-neutral-400' : 'bg-danger-50 text-danger-500'
            )}
          >
            <DeltaIcon size={10} strokeWidth={2.5} />
            {delta !== undefined && delta !== 0 ? `${Math.abs(delta)}%` : '—'}
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-neutral-900 tracking-tight">{value}</p>
        <p className="text-xs text-neutral-500 mt-0.5 font-medium">{label}</p>
        {delta !== undefined && (
          <p className={cn('text-[11px] mt-1.5 flex items-center gap-1', deltaColor)}>
            <DeltaIcon size={9} strokeWidth={2.5} />
            <span>{deltaLabel}</span>
          </p>
        )}
      </div>
    </div>
  )
}
