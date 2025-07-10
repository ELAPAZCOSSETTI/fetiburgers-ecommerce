import ProductCard from "@/components/ProductCard"
import OrderForm from "@/components/OrderForm"
import { products } from "@/data/products"

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menú</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      <OrderForm />
    </main>
  )
}
