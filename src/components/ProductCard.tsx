"use client"

import { useCart } from "@/store/cart"
import { useEffect, useState } from "react"
import clsx from "clsx"

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, removeFromCart, decreaseQuantity, items } = useCart()
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem?.quantity || 0

    const [justAdded, setJustAdded] = useState(false)

    const handleAdd = () => {
        addToCart(product)
        setJustAdded(true)
    }

    const handleRemove = () => {
        removeFromCart(product.id)
    }

    const handleDecrease = () => {
        decreaseQuantity(product.id)
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
                "bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition border",
                justAdded ? "border-green-500 ring-2 ring-green-300" : "border-transparent"
            )}
        >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-green-700 font-bold text-lg">${product.price}</span>
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition text-sm"
                    >
                        Agregar
                    </button>
                </div>

                {quantity > 0 && (
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDecrease}
                                className="px-2 py-1 rounded bg-zinc-200 hover:bg-zinc-300"
                            >
                                -
                            </button>
                            <span className="font-medium">{quantity}</span>
                            <button
                                onClick={handleAdd}
                                className="px-2 py-1 rounded bg-zinc-200 hover:bg-zinc-300"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleRemove}
                            className="text-red-600 hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
