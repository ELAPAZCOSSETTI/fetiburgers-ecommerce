"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import OrderForm from "@/components/OrderForm"

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function OrderModal({ isOpen, onClose }: Props) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Fondo oscuro */}
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

                {/* Contenedor central */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-bold mb-4 text-center">
                                    Finalizar pedido
                                </Dialog.Title>
                                <OrderForm />
                                <button
                                    onClick={onClose}
                                    className="mt-4 w-full py-2 rounded text-sm bg-zinc-200 hover:bg-zinc-300 transition"
                                >
                                    Cerrar
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
