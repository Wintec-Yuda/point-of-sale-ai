import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaCashRegister, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'
import { RiRefund2Fill } from 'react-icons/ri'

const PaymentModal = ({ isOpen, onClose, onComplete, total }) => {
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [amountReceived, setAmountReceived] = useState('')
  
  const calculateChange = () => {
    const received = parseFloat(amountReceived) || 0
    return received - total
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onComplete(paymentMethod)
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-lg max-w-md w-full"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Payment</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Total Amount</h3>
            <p className="text-3xl font-bold text-indigo-600">${total.toFixed(2)}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${paymentMethod === 'Cash' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                >
                  <FaMoneyBillWave className="mr-2" />
                  Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit Card')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${paymentMethod === 'Credit Card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                >
                  <FaCreditCard className="mr-2" />
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Debit Card')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${paymentMethod === 'Debit Card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                >
                  <FaCreditCard className="mr-2" />
                  Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Mobile Payment')}
                  className={`flex items-center justify-center p-3 border rounded-lg ${paymentMethod === 'Mobile Payment' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                >
                  <FaCashRegister className="mr-2" />
                  Mobile
                </button>
              </div>
            </div>
            
            {paymentMethod === 'Cash' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                <input
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  min={total}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {amountReceived && (
                  <div className="mt-2 flex items-center text-green-600">
                    <RiRefund2Fill className="mr-1" />
                    <span>Change: ${calculateChange().toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Complete Payment
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentModal