"use client"

import { useCart } from "@/store/cart"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { v4 as uuidv4 } from "uuid"

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

const extrasList = [
    { id: "bacon", name: "Extra bacon", price: 500 },
    { id: "carne", name: "Extra carne", price: 800 },
    { id: "cebolla", name: "Cebolla caramelizada", price: 300 },
]

export default function ProductCard({ product }: { product: Product }) {
    const { addInstanceToCart, removeInstanceFromCart, updateInstanceExtras, getInstancesByProduct } = useCart()
    const burgerInstances = getInstancesByProduct(product.id) // todas las hamburguesas de este producto

    const [justAdded, setJustAdded] = useState(false)

    const handleAdd = () => {
        const newInstance = {
            cartId: uuidv4(),
            ...product,
            extras: {}, // extras vacíos al principio
            quantity: 1
        }
        addInstanceToCart(newInstance)
        setJustAdded(true)
    }

    const handleRemoveInstance = (cartId: string) => {
        removeInstanceFromCart(cartId)
    }

    const increaseExtra = (cartId: string, extraId: string) => {
        const instance = burgerInstances.find((b) => b.cartId === cartId)
        if (!instance) return
        const current = instance.extras[extraId] || 0
        updateInstanceExtras(cartId, { ...instance.extras, [extraId]: current + 1 })
    }

    const decreaseExtra = (cartId: string, extraId: string) => {
        const instance = burgerInstances.find((b) => b.cartId === cartId)
        if (!instance) return
        const current = instance.extras[extraId] || 0
        const updated = { ...instance.extras }
        if (current > 1) {
            updated[extraId] = current - 1
        } else {
            delete updated[extraId]
        }
        updateInstanceExtras(cartId, updated)
    }

    useEffect(() => {
        if (justAdded) {
            const timer = setTimeout(() => setJustAdded(false), 800)
            return () => clearTimeout(timer)
        }
    }, [justAdded])

    return (
        <div
            className={clsx(
                "bg-amber-600 rounded-3xl shadow-md overflow-hidden flex flex-col transition border",
                justAdded ? "border-green-500 ring-2 ring-green-400" : "border-transparent"
            )}
        >
            <img
                src={product.image}
                alt={product.name}
                className="h-90 w-90 rounded-2xl"
            />

            <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-white text-sm">{product.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-black font-extrabold text-xl">${product.price}</span>
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition text-sm"
                    >
                        Agregar
                    </button>
                </div>

                {burgerInstances.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {burgerInstances.map((burger, index) => (
                            <div key={burger.cartId} className="rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-black">
                                        Hamburguesa {index + 1}
                                    </h4>
                                    <button
                                        onClick={() => handleRemoveInstance(burger.cartId)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                {extrasList.map((extra) => (
                                    <div
                                        key={extra.id}
                                        className="flex items-center justify-between text-black py-1"
                                    >
                                        <span>{extra.name}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => decreaseExtra(burger.cartId, extra.id)}
                                                className="px-2 py-1 rounded bg-zinc-200 hover:bg-zinc-300"
                                            >
                                                -
                                            </button>
                                            <span>{burger.extras[extra.id] || 0}</span>
                                            <button
                                                onClick={() => increaseExtra(burger.cartId, extra.id)}
                                                className="px-2 py-1 rounded bg-zinc-200 hover:bg-zinc-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
