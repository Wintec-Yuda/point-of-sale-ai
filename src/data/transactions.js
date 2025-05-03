import { products } from "./products"

export const transactions = Array.from({ length: 100 }, (_, i) => {
  const itemCount = Math.floor(Math.random() * 5) + 1
  const items = Array.from({ length: itemCount }, () => {
    const productId = `prod-${Math.floor(Math.random() * 20) + 1}`
    const quantity = Math.floor(Math.random() * 5) + 1
    return { productId, quantity }
  })
  
  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)
  
  return {
    id: `trans-${i + 1}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    items,
    subtotal,
    paymentMethod: ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'][Math.floor(Math.random() * 4)],
    status: Math.random() > 0.9 ? 'refunded' : 'completed',
  }
})