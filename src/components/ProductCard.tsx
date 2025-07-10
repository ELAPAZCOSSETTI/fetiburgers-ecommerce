"use client"

import { useCart } from "@/store/cart"

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export default function ProductCard({ product }: { product: Product }) {
    const addToCart = useCart((state) => state.addToCart)

    const handleAdd = () => {
        addToCart(product)
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
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
            </div>
        </div>
    )
}
