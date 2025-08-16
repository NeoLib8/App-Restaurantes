// features/address/screens/SelectAddressScreen.tsx
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useSessionStore } from '@/stores/sessionStore'
import { useOrderStore } from '@/stores/orderStore'
import { getUserAddresses, getClosestBranch } from '../services/addressService'

type Address = {
  id: string
  label: string
  street: string
  location: { coordinates: [number, number] } // lng, lat
}

export default function SelectAddressScreen() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [manualAddress, setManualAddress] = useState('')
  const router = useRouter()

  const user = useSessionStore((s) => s.user)
  const setSelectedBranch = useOrderStore((s) => s.setSelectedBranch)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    getUserAddresses(user.id)
      .then(setAddresses)
      .catch((e) => Alert.alert('Error', e.message))
      .finally(() => setLoading(false))
  }, [user])

  const handleAddressSelect = async (lat: number, lng: number) => {
    try {
      const branch = await getClosestBranch(lat, lng)
      if (!branch) throw new Error('No se encontró una sede cercana')

      setSelectedBranch(branch)
      router.push('/menu')
    } catch (e: any) {
      Alert.alert('Error al calcular sede', e.message)
    }
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una dirección</Text>

      {user ? (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => {
                const [lng, lat] = item.location.coordinates
                handleAddressSelect(lat, lng)
              }}
            >
              <Text>{item.label}</Text>
              <Text>{item.street}</Text>
            </Pressable>
          )}
        />
      ) : (
        <View>
            <Text style={{ marginBottom: 8 }}>Introduce tu dirección:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: Calle Mayor, 12"
                value={manualAddress}
                onChangeText={setManualAddress}
            />

            <Pressable
                style={[styles.button, { marginTop: 12 }]}
                onPress={async () => {
                if (!manualAddress.trim()) {
                    Alert.alert('Dirección vacía', 'Por favor, introduce una dirección.')
                    return
                }

                setLoading(true)

                try {
                    const coords = await import('../services/geocodeService').then((m) =>
                    m.geocodeAddress(manualAddress)
                    )

                    if (!coords) throw new Error('Dirección no encontrada')

                    await handleAddressSelect(coords.lat, coords.lng)
                } catch (err: any) {
                    Alert.alert('Error', err.message)
                } finally {
                    setLoading(false)
                }
                }}
            >
                <Text style={styles.buttonText}>Usar esta dirección</Text>
            </Pressable>
            </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6
  },
  button: {
  backgroundColor: '#000',
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 6
},
buttonText: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 16
}

})
