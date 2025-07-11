"use client"

import { useState } from "react"
import CartDrawer from "./CartDrawer"
import Image from "next/image"

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <header className="bg-black shadow px-4 py-2 flex justify-between items-center sticky top-0 z-30">
            {/* Logo a la izquierda */}
            <div className="flex items-center gap-4 ">
                <Image src="/logo.png" alt="Logo" width={100} height={100} className="rounded-l-full rounded-r-full ml-40" />
                <span className="font-bold text-3xl">Fetiburgers</span>
            </div>

            {/* Botón carrito */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white text-black px-6 py-4 rounded hover:bg-orange-500 transition mr-40"
            >
                🛒
            </button>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onFinalizar={() => setIsModalOpen(true)}
            />
        </header>
    )
}
