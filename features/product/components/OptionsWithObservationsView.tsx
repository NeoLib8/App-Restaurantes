// features/product/components/OptionsWithObservationsView.tsx

import { useState } from 'react'
import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView, Alert } from 'react-native'
import { useCartStore } from '@/stores/cartStore'

export function OptionsWithObservationsView({
  product,
  optionGroups,
}: {
  product: any
  optionGroups: any[]
}) {
  const { addItem } = useCartStore()
  const [selectedOptions, setSelectedOptions] = useState<{ [groupId: string]: any[] }>({})
  const [observation, setObservation] = useState('')
  const flatOptions = Object.values(selectedOptions).flat()
  const extraCost = flatOptions.reduce((sum, o) => sum + o.price, 0)
  const totalPrice = product.price + extraCost


  const toggleOption = (groupId: string, option: any, isMultiple: boolean) => {
    const current = selectedOptions[groupId] || []

    let updated
    if (isMultiple) {
      updated = current.some((o) => o.id === option.id)
        ? current.filter((o) => o.id !== option.id)
        : [...current, option]
    } else {
      updated = [option]
    }

    setSelectedOptions({ ...selectedOptions, [groupId]: updated })
  }

  const handleAdd = () => {
  const flatOptions = Object.values(selectedOptions).flat()
  const extraCost = flatOptions.reduce((sum, o) => sum + o.price, 0)

  const missingRequired = optionGroups.some((group) => {
    const selected = selectedOptions[group.id] || []
    return group.is_required && selected.length === 0
  })

  if (missingRequired) {
    Alert.alert('Faltan opciones', 'Debes seleccionar al menos una opción en los grupos obligatorios.')
    return
  }

  addItem({
    product_id: product.id,
    name: product.name,
    base_price: product.price,
    quantity: 1,
    observation,
    option_items: flatOptions.map((o) => ({ name: o.name, price: o.price })),
  })
}


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {product.image_url && (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      )}

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>


      {optionGroups.map((group) => (
        <View key={group.id} style={styles.groupBox}>
          <Text style={styles.groupName}>{group.name}</Text>
          {group.option_items.map((opt: any) => {
            const selected = (selectedOptions[group.id] || []).some((o) => o.id === opt.id)
            return (
              <Pressable
                key={opt.id}
                onPress={() => toggleOption(group.id, opt, group.is_multiple)}
                style={[styles.optionBtn, selected && styles.optionSelected]}
              >
                <Text>
                  {opt.name} (+€{opt.price.toFixed(2)})
                </Text>
              </Pressable>
            )
          })}
        </View>
      ))}

      <Text style={styles.label}>Observaciones </Text>
      <TextInput
        placeholder="Escribe aquí"
        value={observation}
        onChangeText={setObservation}
        style={styles.input}
        multiline
      />

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Añadir al carrito - €{totalPrice.toFixed(2)}</Text>
      </Pressable>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
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
  groupBox: {
    marginBottom: 20,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  optionBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#e0e0e0',
    borderColor: '#000',
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  

})
