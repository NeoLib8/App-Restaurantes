import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import { useCartStore } from '@/stores/cartStore'
import { AppHeader } from '@/components/AppHeader'
import { useRouter } from 'expo-router'
import { CartItem } from '@/features/cart/components/CartItem'


export default function CartScreen() {
  const router = useRouter()
  const { items, removeItem, updateQuantity } = useCartStore()

  // ✅ Calculamos total de forma reactiva
const total = items.reduce((sum, item) => {
  const optionsTotal = item.option_items?.reduce((s, o) => s + o.price, 0) ?? 0
  const unit = item.base_price + optionsTotal
  return sum + unit * item.quantity
}, 0)

  const handleContinue = () => {
    if (items.length === 0) {
      Alert.alert('Carrito vacío', 'Añade productos antes de continuar.')
      return
    }

    // TODO: verificar login, continuar al paso de dirección/pago
    router.push('/confirm')
  }

  return (
    <>
      <AppHeader
        title="CARRITO"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
        showSearch={false}
        showCart={false}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Tu pedido</Text>

        <FlatList
          data={items}
          keyExtractor={(item) =>
            `${item.product_id}-${item.observation ?? ''}-${item.option_items?.map((o) => o.name).join(',')}`
          }
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Tu carrito está vacío.</Text>}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onAdd={() => updateQuantity(item.product_id, item.quantity + 1)}
              onSubtract={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
              onRemove={() => removeItem(item.product_id)}
            />
          )}
        />
        <View style={styles.footer}>
          <Text style={styles.total}>Total: €{total.toFixed(2)}</Text>
          <Pressable style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuar pedido</Text>
          </Pressable>
        </View>
      </View>
    </>
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
    marginVertical: 16
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 8
  },
  itemText: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500'
  },
  itemPrice: {
    fontSize: 14,
    color: '#555'
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 4
  },
  qty: {
    fontSize: 16,
    marginHorizontal: 4
  },
  deleteBtn: {
    marginLeft: 8
  },
  footer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right'
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  optionText: {
  fontSize: 14,
  color: '#444',
},
observationText: {
  fontSize: 14,
  fontStyle: 'italic',
  color: '#666',
  marginTop: 4,
},

})
