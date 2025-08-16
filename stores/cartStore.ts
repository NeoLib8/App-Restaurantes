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
       * Añadir un nuevo producto al carrito (o actualizar si ya está)
       */
      addItem: (item) => {
        const existing = get().items.find((i) => i.product_id === item.product_id)

        if (existing) {
          const updatedItems = get().items.map((i) =>
            i.product_id === item.product_id
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                  total_price: (i.quantity + item.quantity) * i.base_price
                }
              : i
          )
          set({ items: updatedItems })
        } else {
          const newItem: CartItem = {
            ...item,
            total_price: item.quantity * item.base_price
          }
          set({ items: [...get().items, newItem] })
        }
      },

      /**
       * Eliminar un producto por su ID
       */
      removeItem: (product_id) =>
        set({ items: get().items.filter((i) => i.product_id !== product_id) }),

      /**
       * Vaciar el carrito
       */
      clearCart: () => set({ items: [] }),

      /**
       * Cambiar la cantidad de un producto
       */
      updateQuantity: (product_id, quantity) => {
        const updatedItems = get().items.map((i) =>
          i.product_id === product_id
            ? { ...i, quantity, total_price: quantity * i.base_price }
            : i
        )
        set({ items: updatedItems })
      },

      /**
       * Total del carrito
       */
      get total() {
        return get().items.reduce((sum, item) => sum + item.total_price, 0)
      }
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
      }
    }
  }
  )
)
