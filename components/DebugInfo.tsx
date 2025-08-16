// components/DebugInfo.tsx
import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useOrderStore } from '@/stores/orderStore'
import { useSessionStore } from '@/stores/sessionStore'
import { useCartStore } from '@/stores/cartStore'

export default function DebugInfo() {
  const [visible, setVisible] = useState(false)

  const { orderType, selectedBranch } = useOrderStore()
  const { user, session } = useSessionStore()
  const { items, total } = useCartStore()

  return (
    <View style={styles.container}>
      <Pressable style={styles.toggleButton} onPress={() => setVisible(!visible)}>
        <Text style={styles.toggleText}>{visible ? '👁 Ocultar Debug' : '🐞 Mostrar Debug'}</Text>
      </Pressable>

      {visible && (
        <View style={styles.panel}>
          <Text style={styles.title}>🛠 DEBUG INFO</Text>

          <Text style={styles.label}>Tipo de pedido:</Text>
          <Text style={styles.value}>{orderType ?? '—'}</Text>

          <Text style={styles.label}>Sede seleccionada:</Text>
          <Text style={styles.value}>
            {selectedBranch ? `${selectedBranch.name} (${selectedBranch.address})` : '—'}
          </Text>

          <Text style={styles.label}>Usuario:</Text>
          <Text style={styles.value}>{user ? user.email : 'No logueado'}</Text>

          <Text style={styles.label}>Session ID:</Text>
          <Text style={styles.value}>
            {session?.access_token.slice(0, 12) ?? '—'}
          </Text>

          <Text style={styles.label}>🛒 Carrito ({items.length} productos):</Text>
          {items.length === 0 ? (
            <Text style={styles.value}>—</Text>
          ) : (
            items.map((item) => (
              <Text key={item.product_id} style={styles.value}>
                {item.quantity}x {item.name} = €{item.total_price.toFixed(2)}
              </Text>
            ))
          )}

          <Text style={[styles.value, { fontWeight: 'bold', marginTop: 4 }]}>Total: €{total.toFixed(2)}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 9999
  },
  toggleButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8
  },
  toggleText: {
    color: '#fff',
    textAlign: 'center'
  },
  panel: {
    backgroundColor: '#111',
    marginTop: 8,
    padding: 12,
    borderRadius: 8
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6
  },
  label: {
    color: '#aaa',
    fontSize: 12
  },
  value: {
    color: '#0f0',
    fontSize: 14
  }
})
