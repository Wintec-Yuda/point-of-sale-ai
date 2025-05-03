'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiBox, FiTruck, FiDollarSign, FiLogOut, FiX, FiMenu } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
  { name: 'Products', path: '/admin/products', icon: <FiBox /> },
  { name: 'Suppliers', path: '/admin/suppliers', icon: <FiTruck /> },
  { name: 'Transactions', path: '/admin/transactions', icon: <FiDollarSign /> },
]

export default function SidebarAdmin() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-center h-16 mb-8">
            <h1 className="text-xl font-bold text-indigo-600">Modern POS</h1>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center p-3 rounded-lg ${
                        pathname === item.path
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto mb-4">
            <button className="flex items-center p-3 w-full rounded-lg text-gray-600 hover:bg-gray-100">
              <FiLogOut className="mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed lg:hidden inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200"
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex items-center justify-between h-16 mb-8">
                  <h1 className="text-xl font-bold text-indigo-600">Modern POS</h1>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link href={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex items-center p-3 rounded-lg ${
                              pathname === item.path
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <span className="mr-3">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                          </motion.div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Link href="/" className="mt-auto mb-4">
                  <a className="flex items-center p-3 w-full rounded-lg text-gray-600 hover:bg-gray-100">
                    <FiLogOut className="mr-3" />
                    <span className="font-medium">Logout</span>
                  </a>
                </Link>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}