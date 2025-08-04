// components/AppButton.tsx

import { Pressable, Text, StyleSheet } from 'react-native'
import { theme } from '../constants/theme'

// Props personalizadas del botón
type Props = {
  title: string                        // Texto que se muestra en el botón
  onPress: () => void                 // Función que se ejecuta al pulsar el botón
  backgroundColor?: string           // Color de fondo opcional
  textColor?: string                 // Color de texto opcional
}

// Componente de botón reutilizable
export function AppButton({ title, onPress, backgroundColor, textColor }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: backgroundColor ?? theme.colors.primary }, // Usa color personalizado o el del tema
      ]}
    >
      <Text style={[styles.text, { color: textColor ?? '#fff' }]}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius,
    alignItems: 'center',  // Centra el texto horizontalmente
  },
  text: {
    fontSize: theme.fontSizes.body,
    fontWeight: '600',     // Seminegrita para dar énfasis sin ser tan fuerte como 'bold'
  },
})
