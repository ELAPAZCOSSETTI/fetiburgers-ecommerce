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
  const { items, addToCart, decreaseQuantity, removeFromCart } = useCart()

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

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
            <Dialog.Panel className="w-full max-w-sm bg-white p-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold">Tu pedido</Dialog.Title>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
                  ×
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-center text-gray-500">El carrito está vacío</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">${item.price} x {item.quantity}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 rounded bg-zinc-200"
                        >-</button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-2 py-1 rounded bg-zinc-200"
                        >+</button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:underline text-xs"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <p className="text-right font-semibold text-lg">
                  Total: ${total}
                </p>

                {items.length > 0 && (
                  <button
                    onClick={() => {
                      onClose()
                      onFinalizar()
                    }}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
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
