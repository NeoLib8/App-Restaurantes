// app/product/[id].tsx

import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native'
import { AppHeader } from '@/components/AppHeader'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/stores/cartStore'
import { CustomizationType } from '@/types'
import { BasicProductView } from '@/features/product/components/BasicProductView'
import { ObservationView } from '@/features/product/components/ObservationView'
import { OptionsWithObservationsView } from '@/features/product/components/OptionsWithObservationsView'

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const [product, setProduct] = useState<any>(null)
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: prod, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (error || !prod) {
        Alert.alert('Error', 'No se encontró el producto')
        router.back()
        return
      }
      setProduct(prod)

      if (prod.customization_type === 'options') {
        const { data: groups } = await supabase
          .from('option_groups')
          .select('*, option_items(*)')
          .eq('product_id', id)

        setOptions(groups || [])
      }

      setLoading(false)
    }

    if (id) fetchData()
  }, [id])

  return (
    <>
      <AppHeader
        title="Producto"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
        showCart={false}
        showSearch={false}
      />

      <ScrollView style={styles.container}>
        {loading && <ActivityIndicator size="large" />}

        {!loading && product && (
          <>
            {product.customization_type === 'none' && (
              <BasicProductView product={product} />
            )}

            {product.customization_type === 'observations' && (
              <ObservationView product={product} />
            )}

            {product.customization_type === 'options' && (              
              <OptionsWithObservationsView product={product} optionGroups={options} />
            )}
          </>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
})
