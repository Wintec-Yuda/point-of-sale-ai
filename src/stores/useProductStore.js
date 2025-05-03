import { create } from 'zustand'
import { products } from '../data/products'

export const useProductStore = create((set) => ({
  products: [...products],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    )
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),
}))