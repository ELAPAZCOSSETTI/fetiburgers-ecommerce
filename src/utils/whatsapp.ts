import { useCart } from "@/store/cart";

const extrasList = [
  { id: "bacon", name: "Extra bacon", price: 500 },
  { id: "carne", name: "Extra carne", price: 800 },
  { id: "cebolla", name: "Cebolla caramelizada", price: 300 },
];

type DatosPedido = {
  nombre: string;
  metodoPago: string;
  zona: string;
}

export const buildWhatsAppLink = ({ nombre, metodoPago, zona }: DatosPedido) => {
  const items = useCart.getState().items;

  if (items.length === 0) return '#';

  let message = "Gracias por su compra \n";
  message += "Fetiburgers está preparando su pedido \n\n";

  message += `*Nombre:* ${nombre}\n`;
  message += `*Método de pago:* ${metodoPago}\n`;
  message += `*Zona de envío:* ${zona}\n\n`;

  message += "*Pedido:*\n";

  let subtotal = 0;
  items.forEach((item, index) => {
    const extrasTotal = Object.entries(item.extras || {}).reduce((acc, [extraId, qty]) => {
      const extraData = extrasList.find(e => e.id === extraId);
      return acc + (extraData ? extraData.price * qty : 0);
    }, 0);

    const itemTotal = (item.price + extrasTotal) * item.quantity;
    subtotal += itemTotal;

    message += `Hamburguesa ${index + 1}:\n`;
    message += `  ${item.quantity} x ${item.name} = $${(item.price * item.quantity).toLocaleString()}\n`;

    if (Object.keys(item.extras || {}).length > 0) {
      message += `  Extras:\n`;
      Object.entries(item.extras).forEach(([extraId, qty]) => {
        const extraData = extrasList.find(e => e.id === extraId);
        if (extraData && qty > 0) {
          const extraPriceTotal = extraData.price * qty;
          message += `    - ${extraData.name} x${qty} = $${extraPriceTotal.toLocaleString()}\n`;
        }
      });
    }

    message += `  Subtotal hamburguesa: $${itemTotal.toLocaleString()}\n\n`;
  });

  message += `*Total pedido: $${subtotal.toLocaleString()}*\n\n`;

  if (metodoPago.toLowerCase().includes('transfer')) {
    message += "Pago por MP: Transferencia al alias: sabrinahetcer20.uala (Enviar comprobante)\n";
  }

  message += "\nEn breve nos estamos comunicando con vos para confirmar el pedido y tiempo estimado de preparación. ¡Muchas gracias por elegirnos!";

  const phone = "5492616560683";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
