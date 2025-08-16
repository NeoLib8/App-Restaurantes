// features/branches/screens/BranchListScreen.tsx
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { useOrderStore } from '@/stores/orderStore'
import type { Branch } from '@/stores/orderStore'

export default function BranchListScreen() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const setSelectedBranch = useOrderStore((state) => state.setSelectedBranch)
  

  useEffect(() => {
    const fetchBranches = async () => {
      const { data, error } = await supabase
        .from('branches')
        .select('id, name, address, is_open')
        .eq('is_open', true)

      if (error) {
        console.error('Error cargando sedes:', error.message)
      } else {
        setBranches(data)
      }

      setLoading(false)
    }

    fetchBranches()
  }, [])

  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch)
    router.push('/menu') // redirigir a pantalla de menú de esa sede
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una sede</Text>

      <FlatList
        data={branches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handleSelectBranch(item)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },
  card: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginBottom: 12
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  address: {
    fontSize: 14,
    color: '#555'
  }
})
