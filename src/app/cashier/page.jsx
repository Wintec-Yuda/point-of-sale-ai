'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiTrash2 } from 'react-icons/fi'
import { useCartStore } from '@/stores/useCartStore'
import { useProductStore } from '@/stores/useProductStore'
import { useTransactionStore } from '@/stores/useTransactionStore'
import PaymentModal from '@/components/modal/PaymentModal'
import { toast } from 'react-toastify'

export default function CashierPage() {
  const { products } = useProductStore()
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const { addTransaction } = useTransactionStore()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
    toast.info('Item removed from cart')
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return
    updateQuantity(productId, quantity)
  }

  const handleCompleteTransaction = (paymentMethod) => {
    const newTransaction = {
      id: `trans-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      subtotal,
      paymentMethod,
      status: 'completed',
    }
    
    addTransaction(newTransaction)
    clearCart()
    toast.success('Transaction completed successfully')
    setIsPaymentModalOpen(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Search and List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAddToCart(product)}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Product Image</span>
                </div>
                <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <p className="font-bold text-indigo-600 mt-1">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Cart */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cart</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium"
                >
                  Process Payment
                </motion.button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onComplete={handleCompleteTransaction}
        total={total}
      />
    </div>
  )
}