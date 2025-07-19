"use client"

import { useState } from "react"
import CartDrawer from "./CartDrawer"
import Image from "next/image"
import OrderModal from "./OrderModal"

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)



    return (
        <header className="bg-stone-900 shadow px-4 py-2 flex justify-between items-center sticky top-0 z-30">
            {/* Logo a la izquierda */}
            <div className="flex items-center gap-4 ">
                <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-full" />
                <span className="font-bold text-2xl text-white">Fetiburgers</span>
            </div>

            {/* Botón carrito */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white text-black px-6 py-4 rounded hover:bg-orange-500 transition "
            >
                🛒
            </button>
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onFinalizar={() => {
                    setIsCartOpen(false)       // Cierra el carrito
                    setIsModalOpen(true)       // Abre el modal de orden
                }}
            />

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </header>
    )
}
