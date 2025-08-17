// features/cart/components/CartItem.tsx

import { View, Text, Pressable, StyleSheet } from 'react-native'

type OptionItem = {
  name: string
  price: number
}

type CartItemProps = {
  item: {
    product_id: string
    name: string
    base_price: number
    quantity: number
    observation?: string
    option_items?: OptionItem[]
  }
  onAdd: () => void
  onSubtract: () => void
  onRemove: () => void
}

export function CartItem({ item, onAdd, onSubtract, onRemove }: CartItemProps) {
  const optionsTotal = item.option_items?.reduce((sum, o) => sum + o.price, 0) ?? 0
  const unitPrice = item.base_price + optionsTotal
  const lineTotal = unitPrice * item.quantity

  return (
    <View style={styles.itemRow}>
      <View style={styles.itemText}>
        <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>

        {item.option_items?.length > 0 && (
          <View style={{ marginTop: 4 }}>
            {item.option_items.map((opt, i) => (
              <Text key={i} style={styles.optionText}>
                • {opt.name} (+€{opt.price.toFixed(2)})
              </Text>
            ))}
          </View>
        )}

        {item.observation && (
          <Text style={styles.observationText}>📝 {item.observation}</Text>
        )}

        <Text style={styles.itemPrice}>Subtotal: €{lineTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable onPress={onSubtract} style={styles.controlBtn}>
          <Text>-</Text>
        </Pressable>
        <Text style={styles.qty}>{item.quantity}</Text>
        <Pressable onPress={onAdd} style={styles.controlBtn}>
          <Text>+</Text>
        </Pressable>
        <Pressable onPress={onRemove} style={styles.deleteBtn}>
          <Text>🗑</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: '#555',
    marginTop: 8
  },
  optionText: {
    fontSize: 14,
    color: '#444'
  },
  observationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 4
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
  }
})
