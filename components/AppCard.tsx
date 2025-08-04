// components/AppCategoryCard.tsx

// Importación de componentes de React Native necesarios para construir la interfaz
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
// Importación del tema de estilos definido en el proyecto (colores, espaciados, etc.)
import { theme } from '@/constants/theme'

// Definición del tipo de las propiedades que el componente recibirá
type Props = {
  title: string         // Título de la categoría a mostrar
  image: any            // Imagen de fondo de la tarjeta (se espera un `require(...)`)
  onPress?: () => void  // Función opcional que se ejecuta al pulsar la tarjeta
}

// Componente funcional que representa una tarjeta de categoría en el menú
export function AppCategoryCard({ title, image, onPress }: Props) {
  return (
    // Pressable hace que la tarjeta sea interactiva (tappable)
    <Pressable style={styles.container} onPress={onPress}>
      {/* Imagen de fondo de la tarjeta */}
      <Image source={image} style={styles.image} resizeMode="cover" />

      {/* Contenedor del texto que se superpone sobre la imagen en la parte inferior */}
      <View style={styles.labelContainer}>
        {/* Texto que muestra el título en mayúsculas, precedido de # (ej: #PIZZAS) */}
        <Text style={styles.labelText}>#{title.toUpperCase()}</Text>
      </View>
    </Pressable>
  )
}

// Se calcula el ancho de la tarjeta restando márgenes laterales al ancho total de pantalla
const cardWidth = Dimensions.get('window').width - theme.spacing.md * 2

// Definición de los estilos usando StyleSheet
const styles = StyleSheet.create({
  container: {
    width: cardWidth,              // Ancho adaptado a la pantalla
    height: 180,                   // Altura fija de la tarjeta
    marginBottom: theme.spacing.md, // Espaciado inferior entre tarjetas
    borderRadius: 16,             // Bordes redondeados
    overflow: 'hidden',           // Oculta cualquier contenido que se desborde
    alignSelf: 'center',          // Centra la tarjeta horizontalmente
  },
  image: {
    width: '100%',                // Imagen ocupa todo el ancho
    height: '100%',               // Imagen ocupa toda la altura
  },
  labelContainer: {
    position: 'absolute',         // Posiciona el contenedor de texto encima de la imagen
    bottom: 0,                    // Lo alinea en la parte inferior de la tarjeta
    width: '100%',                // Ocupa todo el ancho de la tarjeta
    backgroundColor: theme.colors.primary, // Color de fondo del texto
    paddingVertical: 8,          // Espaciado vertical dentro del contenedor
    alignItems: 'center',        // Centra el texto horizontalmente
  },
  labelText: {
    color: theme.colors.secondary, // Color del texto
    fontWeight: 'bold',            // Negrita
    fontSize: 16,                  // Tamaño de letra
  },
})
