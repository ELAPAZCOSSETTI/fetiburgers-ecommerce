"use client"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import OrderModal from "@/components/OrderModal"
import { products } from "@/data/products"

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState<"menu" | "agregados" | "promociones">("menu")

  const filteredProducts = products.filter((prod) => {
    if (selectedTab === "menu") return prod.type === "menu"
    if (selectedTab === "agregados") return prod.type === "agregado"
    if (selectedTab === "promociones") return prod.type === "promocion"
  })

  return (
    <main className="p-4 min-h-screen bg-gradient-to-l from-zinc-600 to-black">


      <div className="flex justify-center gap-4 mt-4 mb-8">
        <button
          onClick={() => setSelectedTab("agregados")}
          className={`px-4 py-2 rounded-xl ${
            selectedTab === "agregados" ? "bg-white text-black" : "bg-zinc-800 text-white"
          }`}
        >
          Agregados
        </button>
        <button
          onClick={() => setSelectedTab("menu")}
          className={`px-4 py-2 rounded-xl ${
            selectedTab === "menu" ? "bg-white text-black" : "bg-zinc-800 text-white"
          }`}
        >
          Menú
        </button>
        <button
          onClick={() => setSelectedTab("promociones")}
          className={`px-4 py-2 rounded-xl ${
            selectedTab === "promociones" ? "bg-white text-black" : "bg-zinc-800 text-white"
          }`}
        >
          Promociones
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((prod) => (
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
