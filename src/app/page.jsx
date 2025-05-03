'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCashRegister, FaUserShield } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Modern POS System
          </h1>
          <p className="text-lg text-gray-600">
            Choose your role to continue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <Link href="/cashier" className="block">
              <div className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <FaCashRegister className="text-blue-600 text-4xl" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Cashier</h2>
                <p className="text-gray-600">Process transactions and manage sales</p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <Link href="/admin" className="block">
              <div className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-indigo-100 p-4 rounded-full">
                    <FaUserShield className="text-indigo-600 text-4xl" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin</h2>
                <p className="text-gray-600">Manage products, suppliers, and reports</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}