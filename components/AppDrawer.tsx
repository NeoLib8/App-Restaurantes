// components/AppDrawer.tsx

import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useRef } from 'react'
import { theme } from '../constants/theme'

// Props que recibe el drawer: si está visible y función para cerrarlo
type Props = {
  visible: boolean
  onClose: () => void
}

// Ítems que se mostrarán en el menú lateral
const menuItems = [
  'Nuestra carta',
  'Buscador',
  'Alérgenos',
  'Cambiar tienda',
]

export function AppDrawer({ visible, onClose }: Props) {
  const screenHeight = Dimensions.get('window').height
  const drawerHeight = Math.max(screenHeight, 500) // Asegura un mínimo de altura
  const drawerWidth = Dimensions.get('window').width * 0.7

  // slideAnim es un valor animado que controla la posición horizontal del drawer
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current

  // Efecto para mostrar/ocultar el drawer con animación
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -drawerWidth, // Se desplaza hacia dentro o fuera
      duration: 250,
      useNativeDriver: true, // Mejora el rendimiento de la animación
    }).start()
  }, [visible])

  return (
    <>
      {/* Capa oscura de fondo que cierra el drawer al pulsarse */}
      {visible && (
        <Pressable style={styles.overlay} onPress={onClose} />
      )}

      {/* Drawer lateral animado */}
      <Animated.View
        style={[
          styles.drawer,
          {
            height: drawerHeight,
            width: drawerWidth,
            transform: [{ translateX: slideAnim }], // Animación de desplazamiento horizontal
          },
        ]}
      >
        {/* Logo o nombre del restaurante */}
        <Text style={styles.logo}>Restaurante Prueba</Text>

        {/* Menú con opciones */}
        {menuItems.map((item, i) => (
          <Text key={i} style={styles.item}>
            &gt; {item}
          </Text>
        ))}

        {/* Zona inferior de login separada visualmente */}
        <View style={styles.loginBox}>
          <Text style={styles.login}> &gt; Iniciar sesión</Text>
        </View>
      </Animated.View>
    </>
  )
}

// Estilos del componente
const drawerWidth = Dimensions.get('window').width * 0.7

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#00000066', // Negro con opacidad (~40%)
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: theme.colors.primary,
    padding: 24,
    zIndex: 20, // Está por encima del overlay
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
  loginBox: {
    marginTop: 40,
    borderTopWidth: 4, // Línea separadora superior
    borderTopColor: 'black',
    paddingTop: 16,
  },
  login: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
})
