"use client"

import { FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  const phone = "5492616560683" // número de la empresa
  const whatsappLink = `https://wa.me/${phone}`

  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left ">
        {/* Info principal */}
        <div>
          <p className="text-xl">Fetiburgers © 2025 – Todos los derechos reservados</p>
          <p className="text-xl">Delivery zona Lujan, Maipu y Godoy Cruz</p>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-4 text-4xl">
          <a
            href="https://www.instagram.com/feti_burgers/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition "
          >
            <FaInstagram />
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-500 transition"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  )
}
