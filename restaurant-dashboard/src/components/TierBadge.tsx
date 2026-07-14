import { cn, TIER_CONFIG, type TierName } from '@/lib/utils'

interface TierBadgeProps {
  tier: TierName
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

const ICON_SIZE = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
}

export default function TierBadge({
  tier,
  size = 'md',
  showIcon = true,
  className,
}: TierBadgeProps) {
  const config = TIER_CONFIG[tier]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold tracking-wide',
        `badge-${tier}`,
        SIZE_CLASSES[size],
        className
      )}
    >
      {showIcon && (
        <span className={ICON_SIZE[size]}>{config.icon}</span>
      )}
      {config.label}
    </span>
  )
}

/* ─── Tier Icon Circle ─────────────────────────────────────── */
interface TierIconProps {
  tier: TierName
  size?: number
  className?: string
}

export function TierIcon({ tier, size = 32, className }: TierIconProps) {
  const config = TIER_CONFIG[tier]
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium flex-shrink-0',
        `tier-icon-${tier}`,
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {config.icon}
    </span>
  )
}
