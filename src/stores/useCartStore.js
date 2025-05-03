import { create } from 'zustand'

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(item => item.product.id === product.id)
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
    }
    return { cart: [...state.cart, { product, quantity }] }
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
}))