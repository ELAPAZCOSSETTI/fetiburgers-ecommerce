import { create } from "zustand"

type CartItem = {
    cartId: string // id único de esta instancia
    id: number // id del producto base
    name: string
    description: string
    price: number
    image: string
    quantity: number
    extras: { [key: string]: number }
}

type CartState = {
    items: CartItem[]
    addInstanceToCart: (item: CartItem) => void
    removeInstanceFromCart: (cartId: string) => void
    updateInstanceExtras: (cartId: string, extras: { [key: string]: number }) => void
    getInstancesByProduct: (productId: number) => CartItem[]
}

export const useCart = create<CartState>((set, get) => ({
    items: [],

    addInstanceToCart: (item) => {
        set((state) => ({
            items: [...state.items, item]
        }))
    },

    removeInstanceFromCart: (cartId) => {
        set((state) => ({
            items: state.items.filter((i) => i.cartId !== cartId)
        }))
    },

    updateInstanceExtras: (cartId, extras) => {
        set((state) => ({
            items: state.items.map((i) =>
                i.cartId === cartId ? { ...i, extras } : i
            )
        }))
    },

    getInstancesByProduct: (productId) => {
        return get().items.filter((i) => i.id === productId)
    }
}))
