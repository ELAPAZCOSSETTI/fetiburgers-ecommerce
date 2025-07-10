import { create } from 'zustand';


type Product = {
  id: number;
  name: string;
  price: number;
    image: string;
  quantity: number
}

type CartStore = {
    items: Product[];
    addToCart: (product: Omit<Product, 'quantity'>) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
}
export const useCart = create<CartStore>((set) => ({
    items: [],
    addToCart: (product) => set((state) => {
        const exists = state.items.find (p => p.id === product.id)
        if (exists) {
            return {
                items: state.items.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                ),
            }
        }
  return {
            items: [...state.items, { ...product, quantity: 1 }],
        }
    }),
    removeFromCart: (id) => set((state) => ({
        items: state.items.filter (p => p.id !== id),
    })),
    clearCart: () => set({ items: [] }),
}));