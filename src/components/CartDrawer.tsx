"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useCart } from "@/store/cart"

type Props = {
  isOpen: boolean
  onClose: () => void
  onFinalizar: () => void
}

export default function CartDrawer({ isOpen, onClose, onFinalizar }: Props) {
  const { items } = useCart()

  // Calcular total con extras incluidos
  const total = items.reduce((sum, item) => {
    const extrasTotal = Object.entries(item.extras || {}).reduce((acc, [extraId, qty]) => {
      const extraData = extrasList.find(e => e.id === extraId)
      return acc + (extraData ? extraData.price * qty : 0)
    }, 0)
    return sum + (item.price + extrasTotal) * item.quantity
  }, 0)

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full max-w-sm bg-gradient-to-l from-zinc-400 to-black p-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold text-gray-200">Tu pedido</Dialog.Title>
                <button onClick={onClose} className="text-gray-200 hover:text-red-500 text-xl">
                  ×
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-center font-bold text-gray-200">El carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.cartId} className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-200">{item.name}</span>
                          <span className="text-sm text-gray-200">
                            ${item.price} x {item.quantity}
                          </span>
                        </div>

                      </div>

                      {Object.entries(item.extras || {}).length > 0 && (
                        <div className="mt-2 ml-4 space-y-1">
                          {Object.entries(item.extras).map(([extraId, qty]) => {
                            const extraData = extrasList.find(e => e.id === extraId)
                            return extraData ? (
                              <div key={extraId} className="flex justify-between text-xs text-gray-300">
                                <span>+ {extraData.name}</span>
                                <span>${extraData.price} x {qty}</span>
                              </div>
                            ) : null
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <p className="text-right font-bold text-xl">
                  Total: ${total}
                </p>

                {items.length > 0 && (
                  <button
                    onClick={() => {
                      onClose()
                      onFinalizar()
                    }}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    Finalizar pedido
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

// 👇 Esto tiene que estar igual que en ProductCard para los precios
const extrasList = [
  { id: "bacon", name: "Extra bacon", price: 500 },
  { id: "carne", name: "Extra carne", price: 800 },
  { id: "cebolla", name: "Cebolla caramelizada", price: 300 },
]
