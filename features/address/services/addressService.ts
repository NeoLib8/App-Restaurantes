// features/address/services/addressService.ts
import { supabase } from '@/lib/supabase'

/**
 * Devuelve las direcciones guardadas del usuario logueado
 */
export async function getUserAddresses(userId: string) {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

/**
 * Calcula la sede más cercana desde unas coordenadas dadas
 */
export async function getClosestBranch(lat: number, lng: number) {
  const { data, error } = await supabase.rpc('get_closest_branch', {
    lat_input: lat,
    lng_input: lng
  })

  if (error) throw error
  return data[0] // la más cercana
}
