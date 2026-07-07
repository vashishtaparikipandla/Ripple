import { create } from 'zustand'

export interface MenuItem {
  id: string
  name: string
  desc: string
  price: string
  image: string
  tags?: string[]
}

export interface CartItem extends MenuItem {
  quantity: number
}

interface AppState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  
  cart: CartItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

export const useStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),

  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(c => c.id === item.id)
    if (existing) {
      return { cart: state.cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) }
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] }
  }),
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(c => c.id !== itemId)
  })),
  updateQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map(c => c.id === itemId ? { ...c, quantity } : c).filter(c => c.quantity > 0)
  })),
  clearCart: () => set({ cart: [] }),
}))
