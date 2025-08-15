import { Text, TextProps, StyleSheet } from 'react-native'
import { theme } from '../constants/theme'

// Se extienden las props nativas de <Text> y se añaden props personalizadas
type Props = TextProps & {
  size?: 'title' | 'body' | 'small'           // Tamaño predefinido del texto
  weight?: 'regular' | 'bold'                // Peso tipográfico
  color?: string                             // Color personalizado opcional
}

// Componente tipográfico reutilizable que estandariza estilos según el tema
export function AppText({
  size = 'body',
  weight = 'regular',
  color,
  style,
  ...rest
}: Props) {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: theme.fontSize[size],                     // Asigna tamaño según key del tema
          fontWeight: weight === 'bold' ? 'bold' : 'normal',   // Controla el grosor del texto
          color: color ?? theme.colors.text,                   // Usa color personalizado o por defecto
        },
        style, // Permite sobreescribir estilos desde fuera
      ]}
      {...rest} // Propaga el resto de props al componente Text
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fontFamily.regular, // Fuente base del texto (aunque se puede sobreescribir)
  },
})
