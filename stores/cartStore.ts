// stores/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type CartItem = {
  product_id: string
  name: string
  base_price: number
  quantity: number
  total_price: number
  option_items?: {
    name: string
    price: number
  }[]
  observation?: string
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'total_price'>) => void
  removeItem: (product_id: string) => void
  clearCart: () => void
  updateQuantity: (product_id: string, quantity: number) => void
  total: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Añadir un nuevo producto al carrito (mismo ID pero distintas opciones = producto diferente)
       */
      addItem: (item) => {
        // Crear una "clave única" para cada combinación de producto + opciones + observaciones
        const itemKey = JSON.stringify({
          id: item.product_id,
          options: item.option_items?.map((o) => o.name).sort(),
          observation: item.observation?.trim() ?? '',
        })

        const existingIndex = get().items.findIndex((i) => {
          const key = JSON.stringify({
            id: i.product_id,
            options: i.option_items?.map((o) => o.name).sort(),
            observation: i.observation?.trim() ?? '',
          })
          return key === itemKey
        })

        const optionTotal = item.option_items?.reduce((sum, o) => sum + o.price, 0) ?? 0
        const unitPrice = item.base_price + optionTotal
        const itemTotal = unitPrice * item.quantity

        if (existingIndex !== -1) {
          const updated = [...get().items]
          const existingItem = updated[existingIndex]
          const newQuantity = existingItem.quantity + item.quantity
          updated[existingIndex] = {
            ...existingItem,
            quantity: newQuantity,
            total_price: unitPrice * newQuantity,
          }
          set({ items: updated })
        } else {
          const newItem: CartItem = {
            ...item,
            total_price: itemTotal,
          }
          set({ items: [...get().items, newItem] })
        }
      },

      /**
       * Eliminar un producto por su ID (nota: solo elimina por product_id, útil para limpiar variantes)
       */
      removeItem: (product_id) =>
        set({ items: get().items.filter((i) => i.product_id !== product_id) }),

      /**
       * Vaciar el carrito
       */
      clearCart: () => set({ items: [] }),

      /**
       * Cambiar la cantidad de un producto por ID
       */
      updateQuantity: (product_id, quantity) => {
        const updatedItems = get().items.map((i) => {
          if (i.product_id !== product_id) return i

          const optionTotal = i.option_items?.reduce((sum, o) => sum + o.price, 0) ?? 0
          const unitPrice = i.base_price + optionTotal

          return {
            ...i,
            quantity,
            total_price: unitPrice * quantity,
          }
        })
        set({ items: updatedItems })
      },

      /**
       * Total del carrito
       */
      get total() {
        return get().items.reduce((sum, item) => sum + item.total_price, 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
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
        },
      },
    }
  )
)
