import { motion } from 'framer-motion'

const ReceiptModal = ({ isOpen, onClose, transaction, products }) => {
  if (!isOpen || !transaction) return null

  const tax = transaction.subtotal * 0.1
  const total = transaction.subtotal + tax

  const getProductName = (id) => {
    const product = products.find(p => p.id === id)
    return product ? product.name : 'Unknown Product'
  }

  const getProductPrice = (id) => {
    const product = products.find(p => p.id === id)
    return product ? product.price : 0
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Transaction Receipt</h2>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-medium">{transaction.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium capitalize">{transaction.paymentMethod}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-medium text-gray-800 mb-3">Items Purchased</h3>
              <div className="space-y-3">
                {transaction.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="text-gray-800">{getProductName(item.productId)}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${getProductPrice(item.productId).toFixed(2)}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(getProductPrice(item.productId) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${transaction.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (10%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ReceiptModal