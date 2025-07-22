"use client"

import { useState } from "react"
import { buildWhatsAppLink } from "@/utils/whatsapp"

export default function OrderForm() {
  const [nombre, setNombre] = useState("")
  const [zona, setZona] = useState("")
  const [metodoPago, setMetodoPago] = useState("Efectivo")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !zona) {
      alert("Por favor completá todos los campos")
      return
    }

    const url = buildWhatsAppLink({ nombre, zona, metodoPago })
    window.open(url, "_blank")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto bg-orange-400 shadow-lg rounded-xl mt-8">
      <h2 className="text-xl font-bold text-center">Completar pedido</h2>

      <div>
        <label className="block font-medium mb-1">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded px-3 py-2 text-xl"
          placeholder="Nombre"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Zona de envío:</label>
        <input
          type="text"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="w-full border rounded px-3 py-2 text-xl"
          placeholder="Ej: Luján, Godoy Cruz, etc."
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Método de pago:</label>
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          className="w-full border rounded px-3 py-2 text-xl"
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia (MP)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Enviar pedido por WhatsApp
      </button>
    </form>
  )
}
