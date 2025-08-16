// lib/logout.ts
import { supabase } from './supabase'
import { useSessionStore } from '@/stores/sessionStore'
import { useCartStore } from '@/stores/cartStore'
import { useOrderStore } from '@/stores/orderStore'

export async function logout() {
  // 1. Cerrar sesión en Supabase
  await supabase.auth.signOut()

  // 2. Limpiar Zustand stores
  useSessionStore.getState().clearSession()
  useCartStore.getState().clearCart()
  useOrderStore.getState().resetOrder()
}
