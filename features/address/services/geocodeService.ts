// features/address/services/geocodeService.ts

/**
 * Usa la API pública de Nominatim (OpenStreetMap) para convertir una dirección en coordenadas
 */
export async function geocodeAddress(query: string): Promise<{ lat: number; lng: number } | null> {
  const encoded = encodeURIComponent(query)

const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`, {
  headers: {
    'User-Agent': 'AppRestaurantes/1.0 (liberto3dejulio@gmail.com)',
    'Accept': 'application/json'
  }
})

  const data = await res.json()

  if (data.length === 0) return null

  const { lat, lon } = data[0]

  return {
    lat: parseFloat(lat),
    lng: parseFloat(lon)
  }
}
