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
                "bg-amber-600 rounded-3xl shadow-md overflow-hidden flex flex-col transition border",
                justAdded ? "border-green-500 ring-2 ring-green-400" : "border-transparent"
            )}
        >
            <img
                src={product.image}
                alt={product.name}
                className=" h-90 w-90 rounded-2xl  mb-4"
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
                            className="text-black hover:underline"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
