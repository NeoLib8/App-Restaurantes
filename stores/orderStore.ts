// stores/orderStore.ts
// Guardar elecciones del usuario sobre el tipo de pedido y sede seleccionada

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type OrderType = 'pickup' | 'delivery'

export type Branch = {
  id: string
  name: string
  address: string
  is_open: boolean
}

type OrderState = {
  orderType: OrderType | null
  selectedBranch: Branch | null
  setOrderType: (type: OrderType) => void
  setSelectedBranch: (branch: Branch) => void
  resetOrder: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orderType: null,
      selectedBranch: null,

      setOrderType: (type) => set({ orderType: type }),
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),

      resetOrder: () => set({ orderType: null, selectedBranch: null })
    }),
   {
    name: 'order-storage',
    partialize: (state) => ({
      orderType: state.orderType,
      selectedBranch: state.selectedBranch
    }),
    storage: {
      getItem: async (name) => {
        const value = await AsyncStorage.getItem(name)
        return value ? JSON.parse(value) : null
      },
      setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value))
      },
      removeItem: async (name) => {
        await AsyncStorage.removeItem(name)
      }
    }}
  )
)
