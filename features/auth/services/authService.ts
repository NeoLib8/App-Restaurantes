// features/auth/services/authService.ts

import { supabase } from '@/lib/supabase'

/**
 * Iniciar sesión con email y contraseña
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

/**
 * Registrar un nuevo usuario en Supabase Auth y en la tabla `users`
 * Requiere: email, contraseña, nombre, teléfono y restaurant_id
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  phone: string,
  restaurantId: string // ✅ obligatorio
) {
  // 1. Crear en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, phone },
    },
  })

  if (error) throw error

  // 2. Insertar en tabla `users` (base de datos)
  const userId = data.user?.id
  if (!userId) throw new Error('No se pudo obtener el ID del usuario.')

  const { error: insertError } = await supabase.from('users').insert({
    id: userId,
    email,
    name,
    phone,
    restaurant_id: restaurantId,
  })

  if (insertError) throw insertError

  return data
}
