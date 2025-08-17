// lib/cart.ts

import { CartItem } from '@/stores/cartStore'

export function getCartTotals(items: CartItem[]) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.base_price, 0)

  return { totalQuantity, totalPrice }
}
