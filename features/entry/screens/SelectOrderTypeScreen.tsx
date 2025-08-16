// features/entry/screens/SelectOrderTypeScreen.tsx
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useOrderStore } from '@/stores/orderStore'

export default function SelectOrderTypeScreen() {
  const router = useRouter()
  const setOrderType = useOrderStore((state) => state.setOrderType)

  const handleSelect = (type: 'pickup' | 'delivery') => {
    setOrderType(type)

    if (type === 'pickup') {
      router.push('/branches/list') // pantalla para elegir sede manualmente
    } else {
      router.push('/address/select') // pantalla para domicilio
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cómo quieres tu pedido?</Text>

      <Pressable style={styles.button} onPress={() => handleSelect('pickup')}>
        <Text style={styles.buttonText}>Recoger en local</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => handleSelect('delivery')}>
        <Text style={styles.buttonText}>Entrega a domicilio</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})
