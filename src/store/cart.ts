import { create } from "zustand"

type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }),

  decreaseQuantity: (productId) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === productId)
      if (!existing) return state

      if (existing.quantity === 1) {
        // Si llega a 0, lo eliminamos
        return {
          items: state.items.filter((item) => item.id !== productId),
        }
      }

      return {
        items: state.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ items: [] }),
}))
