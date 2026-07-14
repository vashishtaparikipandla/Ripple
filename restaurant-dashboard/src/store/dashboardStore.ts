import { create } from 'zustand'
import type { TierName } from '@/lib/utils'
import { mockCommunityPosts, mockOffers, type CommunityPost, type Offer } from '@/lib/mockData'

/* ─── Onboarding state ─────────────────────────────────────── */
export interface TierConfig {
  tier: TierName
  visitsRequired: number
  retentionVisits: number
  discountType: 'percentage' | 'fixed'
  discount: number
  discountMinPurchase: number
  spendBonusThreshold: number
  spendBonusDiscount: number
  perks: string[]
}

export type QualificationPeriod = 'Monthly' | 'Every 2 Months' | 'Quarterly' | 'Semi-Annual' | 'Annual'
export type DecayRule = 'Drop 1 level' | 'Drop multiple' | 'Reset to entry'

export interface OnboardingState {
  restaurantName: string
  cuisineType: string
  description: string
  address: string
  phoneNumber: string
  qualificationPeriod: QualificationPeriod
  decayRule: DecayRule
  tiers: TierConfig[]
  rewardStructure: 'visit_based' | 'visit_spend' | 'fixed' | 'custom'
  currentStep: number
}

const DEFAULT_TIERS: TierConfig[] = [
  { tier: 'bronze',   visitsRequired: 1,  retentionVisits: 1, discountType: 'percentage', discount: 5,  discountMinPurchase: 0, spendBonusThreshold: 0, spendBonusDiscount: 0, perks: ['Welcome Reward'] },
  { tier: 'silver',   visitsRequired: 2,  retentionVisits: 1, discountType: 'percentage', discount: 10, discountMinPurchase: 0, spendBonusThreshold: 0, spendBonusDiscount: 0, perks: ['Free Drink'] },
  { tier: 'gold',     visitsRequired: 4,  retentionVisits: 1, discountType: 'percentage', discount: 15, discountMinPurchase: 0, spendBonusThreshold: 100, spendBonusDiscount: 5, perks: ['Free Dessert', 'Priority Seating'] },
  { tier: 'platinum', visitsRequired: 7,  retentionVisits: 2, discountType: 'percentage', discount: 20, discountMinPurchase: 0, spendBonusThreshold: 150, spendBonusDiscount: 10, perks: ["Chef's Special", 'Priority Seating', 'Exclusive Offers'] },
  { tier: 'diamond',  visitsRequired: 12, retentionVisits: 3, discountType: 'percentage', discount: 25, discountMinPurchase: 0, spendBonusThreshold: 200, spendBonusDiscount: 15, perks: ['VIP Access', 'Birthday Reward'] },
]

/* ─── Dashboard state ──────────────────────────────────────── */
interface DashboardStore {
  /* Onboarding */
  onboarding: OnboardingState
  setOnboardingField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void
  setTierConfig: <K extends keyof TierConfig>(tier: TierName, field: K, value: TierConfig[K]) => void
  nextStep: () => void
  prevStep: () => void

  /* Community moderation */
  communityPosts: CommunityPost[]
  updatePostStatus: (id: string, status: CommunityPost['status']) => void

  /* Offers */
  offers: Offer[]
  addOffer: (offer: Offer) => void
  removeOffer: (id: string) => void

  /* Loyalty builder (live edits to tier config) */
  liveTiers: TierConfig[]
  setLiveTier: <K extends keyof TierConfig>(tier: TierName, field: K, value: TierConfig[K]) => void
  saveLiveTiers: () => void

  /* Restaurant profile */
  profile: {
    name: string
    cuisine: string
    description: string
    address: string
    phone: string
    email: string
    website: string
    openingHours: Record<string, { open: string; close: string; closed: boolean }>
  }
  updateProfile: (updates: Partial<DashboardStore['profile']>) => void
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const useDashboardStore = create<DashboardStore>((set) => ({
  /* ─── Onboarding ─── */
  onboarding: {
    restaurantName: '',
    cuisineType: '',
    description: '',
    address: '',
    phoneNumber: '',
    qualificationPeriod: 'Monthly',
    decayRule: 'Drop 1 level',
    tiers: DEFAULT_TIERS,
    rewardStructure: 'visit_based',
    currentStep: 0,
  },

  setOnboardingField: (key, value) =>
    set((s) => ({ onboarding: { ...s.onboarding, [key]: value } })),

  setTierConfig: (tier, field, value) =>
    set((s) => ({
      onboarding: {
        ...s.onboarding,
        tiers: s.onboarding.tiers.map((t) =>
          t.tier === tier ? { ...t, [field]: value } : t
        ),
      },
    })),

  nextStep: () =>
    set((s) => ({
      onboarding: {
        ...s.onboarding,
        currentStep: Math.min(s.onboarding.currentStep + 1, 4),
      },
    })),

  prevStep: () =>
    set((s) => ({
      onboarding: {
        ...s.onboarding,
        currentStep: Math.max(s.onboarding.currentStep - 1, 0),
      },
    })),

  /* ─── Community ─── */
  communityPosts: mockCommunityPosts,

  updatePostStatus: (id, status) =>
    set((s) => ({
      communityPosts: s.communityPosts.map((p) =>
        p.id === id ? { ...p, status } : p
      ),
    })),

  /* ─── Offers ─── */
  offers: mockOffers,

  addOffer: (offer) =>
    set((s) => ({ offers: [offer, ...s.offers] })),

  removeOffer: (id) =>
    set((s) => ({ offers: s.offers.filter((o) => o.id !== id) })),

  /* ─── Loyalty builder ─── */
  liveTiers: DEFAULT_TIERS,

  setLiveTier: (tier, field, value) =>
    set((s) => ({
      liveTiers: s.liveTiers.map((t) =>
        t.tier === tier ? { ...t, [field]: value } : t
      ),
    })),

  saveLiveTiers: () =>
    set((s) => ({
      onboarding: { ...s.onboarding, tiers: s.liveTiers },
    })),

  /* ─── Restaurant profile ─── */
  profile: {
    name: 'The Rustic Spoon',
    cuisine: 'Modern Indian',
    description: 'A warm, contemporary dining experience celebrating the rich flavours of India with a modern twist. Known for our slow-cooked curries and artisanal breads.',
    address: '42, Indiranagar 12th Main, Bengaluru, KA 560008',
    phone: '+91 98765 43210',
    email: 'hello@therusticspoon.in',
    website: 'www.therusticspoon.in',
    openingHours: Object.fromEntries(
      DAYS.map((day) => [
        day,
        {
          open: '12:00',
          close: day === 'Sunday' ? '21:00' : '23:00',
          closed: false,
        },
      ])
    ),
  },

  updateProfile: (updates) =>
    set((s) => ({ profile: { ...s.profile, ...updates } })),
}))
