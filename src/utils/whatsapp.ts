import { useCart } from "@/store/cart";

type DatosPedido = {
  nombre: string;
  metodoPago: string;
  zona: string
}

export const buildWhatsAppLink = ({nombre , metodoPago, zona}: DatosPedido) => {
    const items = useCart.getState().items

    if (items.length === 0) return '#'

    let message = "Gracias por su compra 🙂\n"
    message += "Fetiburgers está preparando su pedido 🍔\n\n"

  message += `*Nombre:* _${nombre}_\n`
  message += `*Método de pago:* _${metodoPago}_\n`
  message += `*Zona de envío:* _${zona}_\n\n`

  message += "*pedido:*\n"

  let subtotal = 0
    items.forEach((item) => {
        const itemTotal = item.price * item.quantity
        subtotal += itemTotal
         message += `*${item.quantity}* x *${item.name}* \nSubtotal = $${itemTotal.toLocaleString()}\n`
    })

    message += `\n*Total pedido: $${subtotal.toLocaleString()}*\n\n`

    if (metodoPago.toLowerCase().includes('transfer')) {
        message += "Pago por MP: Transferencia al alias: sabrinahetcer20.uala (Enviar comprobante) 📎\n"

    }

    message += "\nEn breve nos estamos comunicando con vos para confirmar el pedido y tiempo estimado de preparacion. ¡Muchas gracias por elegirnos!"

 const phone = "5492612478856" // ← este número es el que recibe el pedido

return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

}