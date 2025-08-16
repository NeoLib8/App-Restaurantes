// features/cart/screens/CartScreen.tsx
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { useCartStore } from '@/stores/cartStore'

export default function CartScreen() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Tu carrito</Text>

      {items.length === 0 ? (
        <Text>No tienes productos añadidos.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product_id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>
                  {item.name} — {item.quantity}x €{item.base_price.toFixed(2)}
                </Text>
                <Text>Total: €{item.total_price.toFixed(2)}</Text>

                <View style={styles.actions}>
                  <Pressable onPress={() => updateQuantity(item.product_id, item.quantity + 1)}>
                    <Text style={styles.btn}>➕</Text>
                  </Pressable>
                  <Pressable onPress={() => updateQuantity(item.product_id, item.quantity - 1)}>
                    <Text style={styles.btn}>➖</Text>
                  </Pressable>
                  <Pressable onPress={() => removeItem(item.product_id)}>
                    <Text style={[styles.btn, { color: 'red' }]}>🗑️</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <Text style={styles.total}>Total: €{total.toFixed(2)}</Text>

          <Pressable style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearButtonText}>Vaciar carrito</Text>
          </Pressable>
        </>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 8
  },
  name: {
    fontWeight: '600',
    fontSize: 16
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8
  },
  btn: {
    fontSize: 20
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24
  },
  clearButton: {
    marginTop: 16,
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 6
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
