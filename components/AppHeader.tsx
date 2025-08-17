import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../constants/theme'

type Props = {
  title?: string               
  onLeftPress: () => void
  leftIcon?: keyof typeof Ionicons.glyphMap
  onSearchPress?: () => void
  onCartPress?: () => void
  cartQuantity?: number
  cartTotal?: number
  logo?: any
  showSearch?: boolean   // 🆕 nuevo
  showCart?: boolean     // 🆕 nuevo
}

export function AppHeader({
  onLeftPress,
  leftIcon = 'menu',
  onSearchPress,
  onCartPress,
  cartQuantity = 0,
  cartTotal = 0,
  logo,
  showSearch = true,
  showCart = true,
  title,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Icono izquierdo */}
      <Pressable onPress={onLeftPress}>
        <Ionicons name={leftIcon} size={28} color="black" />
      </Pressable>

      {/* Logo o título centrado */}
      <View style={styles.logoContainer}>
        {logo ? (
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        ) : (
          <Text style={styles.logoText}>{title}</Text>
        )}
      </View>

      {/* Iconos derecho: solo si están habilitados */}
      <View style={styles.rightSection}>
        {showSearch && (
          <Pressable onPress={onSearchPress}>
            <Ionicons name="search" size={22} color="black" style={styles.icon} />
          </Pressable>
        )}

        {showCart && (
          <Pressable onPress={onCartPress} style={styles.cartInfo}>
            <Ionicons name="cart-outline" size={22} color="black" />
            <Text style={styles.cartText}>
              {cartQuantity}/{cartTotal.toFixed(2)}€
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    height: 30,
    width: 100,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: {
    marginLeft: 4,
    fontWeight: '500',
  },
})
