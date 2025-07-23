"use client"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import OrderModal from "@/components/OrderModal"
import { products } from "@/data/products"

export default function Agregados() {
const [isModalOpen, setIsModalOpen] = useState(false)
const [isCartOpen, setIsCartOpen] = useState(false)


  return (
    <main className="p-4  min-h-screen bg-gradient-to-l from-zinc-600 to-black ">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Menú</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Finalizar pedido
        </button>
      </div>

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </main>
  )
}
