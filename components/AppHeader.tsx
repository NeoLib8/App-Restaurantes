// components/AppHeader.tsx

import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { theme } from '../constants/theme'
import { Ionicons } from '@expo/vector-icons'

// Definición de las props que el header puede recibir
type Props = {
  onMenuPress: () => void                // Callback al pulsar el botón del menú
  onSearchPress?: () => void            // Callback opcional para búsqueda
  onCartPress?: () => void              // Callback opcional para el carrito
  cartQuantity?: number                 // Cantidad de productos en el carrito
  cartTotal?: number                    // Precio total en el carrito
  logo?: any                            // Imagen opcional para el logo
}

export function AppHeader({
  onMenuPress,
  onSearchPress,
  onCartPress,
  cartQuantity = 0,
  cartTotal = 0,
  logo,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Icono menú hamburguesa a la izquierda */}
      <Pressable onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="black" />
      </Pressable>

      {/* Contenedor central del logo o texto alternativo */}
      <View style={styles.logoContainer}>
        {logo ? (
          // Si se proporciona imagen, se muestra como logo
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        ) : (
          // Si no, se muestra un texto por defecto
          <Text style={styles.logoText}>Nombre</Text>
        )}
      </View>

      {/* Icono de búsqueda y carrito a la derecha */}
      <View style={styles.rightSection}>
        {/* Icono de búsqueda (opcional) */}
        <Pressable onPress={onSearchPress}>
          <Ionicons name="search" size={22} color="black" style={styles.icon} />
        </Pressable>

        {/* Icono de carrito con cantidad y total formateado con 2 decimales */}
        <Pressable onPress={() => {
          console.log('Carrito presionado')
          onCartPress
        }} style={styles.cartInfo}>
          <Ionicons name="cart-outline" size={22} color="black" />
          <Text style={styles.cartText}>
            {cartQuantity}/{cartTotal.toFixed(2)}€
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',        // Distribuye horizontalmente: menú | logo | iconos
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  logoContainer: {
    flex: 1,                     // Toma el espacio central disponible
    alignItems: 'center',       // Centra el logo horizontalmente
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    height: 30,
    width: 100,                 // Ajustes fijos para mantener proporción
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,            // Espacio entre búsqueda y carrito
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: {
    marginLeft: 4,              // Espacio entre icono de carrito y texto
    fontWeight: '500',
  },
})
