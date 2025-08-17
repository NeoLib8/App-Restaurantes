// features/product/components/BasicProductView.tsx

import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useCartStore } from '@/stores/cartStore'

export function BasicProductView({ product }: { product: any }) {
  const { addItem } = useCartStore()

  const handleAdd = () => {
    addItem({
      product_id: product.id,
      name: product.name,
      base_price: product.price,
      quantity: 1,
    })
  }

  return (
    <View>
      {product.image_url && (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      )}

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>€{product.price.toFixed(2)}</Text>

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Añadir al carrito</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
})
