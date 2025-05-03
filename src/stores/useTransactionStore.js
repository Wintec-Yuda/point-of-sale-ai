import { create } from 'zustand'
import { transactions } from '../data/transactions'

export const useTransactionStore = create((set) => ({
  transactions: [...transactions],
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  updateTransactionStatus: (id, status) => set((state) => ({
    transactions: state.transactions.map(transaction =>
      transaction.id === id ? { ...transaction, status } : transaction
    )
  })),
}))