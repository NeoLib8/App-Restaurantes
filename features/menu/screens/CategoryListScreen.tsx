import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { supabase } from '@/lib/supabase'
import { useOrderStore } from '@/stores/orderStore'
import { useRouter } from 'expo-router'
import { AppHeader } from '@/components/AppHeader'
import { AppDrawer } from '@/components/AppDrawer'
import { useCartStore } from '@/stores/cartStore'

export default function CategoryListScreen() {
  const branch = useOrderStore((s) => s.selectedBranch)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [drawerVisible, setDrawerVisible] = useState(false)

  const router = useRouter()
  const { items, total } = useCartStore()

  useEffect(() => {
    if (!branch) return

    supabase
      .from('categories')
      .select('id, name')
      .eq('branch_id', branch.id)
      .order('position', { ascending: true })
      .then(({ data }) => {
        if (data) setCategories(data)
      })
  }, [branch])

  if (!branch) {
    return (
      <View style={styles.container}>
        <Text>No hay sede seleccionada.</Text>
      </View>
    )
  }

  return (
    <>
      <AppHeader
        onMenuPress={() => setDrawerVisible(true)}
        onCartPress={() => router.push('/cart')}
        cartQuantity={items.length}
        cartTotal={total}
        logo={require('@/assets/favicon.png')} // Si tienes un logo personalizado
      />

      <AppDrawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />

      <View style={styles.container}>
        <Text style={styles.title}>Categorías de {branch.name}</Text>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/menu/${item.id}`)}
            >
              <Text style={styles.categoryName}>{item.name}</Text>
            </Pressable>
          )}
        />
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
    marginBottom: 16
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '500'
  }
})
