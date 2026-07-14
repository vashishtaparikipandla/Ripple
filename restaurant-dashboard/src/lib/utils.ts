import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TierName = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export const TIER_CONFIG: Record<TierName, {
  label: string
  color: string
  bgColor: string
  textColor: string
  iconBg: string
  minVisits: number
  discount: number
  icon: string
}> = {
  bronze: {
    label: 'Bronze',
    color: '#B45309',
    bgColor: '#FEF3C7',
    textColor: '#92400E',
    iconBg: '#FEF3C7',
    minVisits: 1,
    discount: 10,
    icon: '🥉',
  },
  silver: {
    label: 'Silver',
    color: '#64748B',
    bgColor: '#F1F5F9',
    textColor: '#334155',
    iconBg: '#F1F5F9',
    minVisits: 3,
    discount: 15,
    icon: '🥈',
  },
  gold: {
    label: 'Gold',
    color: '#D97706',
    bgColor: '#FEF9C3',
    textColor: '#713F12',
    iconBg: '#FEF9C3',
    minVisits: 6,
    discount: 20,
    icon: '⭐',
  },
  platinum: {
    label: 'Platinum',
    color: '#7C3AED',
    bgColor: '#F3F0FF',
    textColor: '#4C1D95',
    iconBg: '#F3F0FF',
    minVisits: 12,
    discount: 30,
    icon: '👑',
  },
  diamond: {
    label: 'Diamond',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    textColor: '#075985',
    iconBg: '#F0F9FF',
    minVisits: 20,
    discount: 40,
    icon: '💎',
  },
}

export const TIERS: TierName[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond']

export function formatCurrency(amount: number, symbol = '₹'): string {
  if (amount >= 100000) return `${symbol}${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `${symbol}${(amount / 1000).toFixed(1)}K`
  return `${symbol}${amount.toLocaleString('en-IN')}`
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toString()
}

export function daysAgo(date: Date): number {
  const now = new Date()
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

export function formatRelativeDate(date: Date): string {
  const days = daysAgo(date)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}
