// components/AppTextInput.tsx

import { View, TextInput, StyleSheet, TextInputProps } from 'react-native'
import { theme } from '../constants/theme'

// Extendemos las props estándar de TextInput y añadimos dos personalizadas
type Props = TextInputProps & {
  borderColor?: string              // Color opcional del borde
  backgroundColor?: string         // Color opcional del fondo
}

export function AppTextInput({
  style,                           // Estilos externos que se le puedan pasar
  borderColor,
  backgroundColor,
  ...rest                          // Resto de props que se pasan directamente al TextInput
}: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          // Si no se especifica un color de borde o fondo, se usan valores por defecto
          borderColor: borderColor ?? theme.colors.secondary,
          backgroundColor: backgroundColor ?? '#fff',
        },
      ]}
    >
      <TextInput
        style={[styles.input, style]}  // Se permite sobreescribir estilos base
        placeholderTextColor={theme.colors.secondary}
        {...rest}                     // Permite pasar cualquier prop válida de TextInput
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,                          // Define un borde simple
    borderRadius: theme.borderRadius,        // Bordes redondeados consistentes con el tema
    paddingHorizontal: 12,                   // Relleno lateral interno
    paddingVertical: 8,                      // Relleno vertical interno
    marginVertical: 6,                       // Espaciado vertical entre inputs
  },
  input: {
    fontSize: theme.fontSizes.body,          // Tamaño de fuente según el tema
    color: theme.colors.text,                // Color de texto principal
  },
})
