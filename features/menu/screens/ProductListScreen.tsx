import { useLocalSearchParams, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet, Image, Alert } from 'react-native'
import { useOrderStore } from '@/stores/orderStore'
import { useCartStore } from '@/stores/cartStore'
import { supabase } from '@/lib/supabase'
import { AppHeader } from '@/components/AppHeader'
import { getCartTotals } from '@/lib/cart'

export default function ProductListScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>()
  const branch = useOrderStore((s) => s.selectedBranch)
  const addItem = useCartStore((s) => s.addItem)
  const { items } = useCartStore()
  const { totalQuantity, totalPrice } = getCartTotals(items)

  const [products, setProducts] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (!branch || !categoryId) return

    const fetch = async () => {
      const { data: cat } = await supabase
        .from('categories')
        .select('name')
        .eq('id', categoryId)
        .single()

      setCategoryName(cat?.name ?? '')

      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('branch_id', branch.id)
        .eq('category_id', categoryId)

      setProducts(data ?? [])
    }

    fetch()
  }, [branch, categoryId])

  return (
    <>
      <AppHeader
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
        onCartPress={() => router.push('/cart')}
        cartQuantity={totalQuantity}
        cartTotal={totalPrice}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{categoryName}</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.image} />
              )}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.price}>€{item.price.toFixed(2)}</Text>

              <Pressable
                style={styles.button}
                onPress={(e) => {
                  e.stopPropagation()
                  addItem({
                    product_id: item.id,
                    name: item.name,
                    base_price: item.price,
                    quantity: 1
                  })
                  Alert.alert('Añadido al carrito')
                }}
              >
                <Text style={styles.buttonText}>🛒 Añadir al carrito</Text>
              </Pressable>
            </Pressable>
          )}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 14, color: '#555' },
  price: { fontSize: 14, marginTop: 4 },
  button: {
    marginTop: 10,
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
