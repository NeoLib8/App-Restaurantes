const baseColors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  gray: '#888888',
  red: '#FF0000',
}
export const theme = {
  colors: {
    ...baseColors,
    primary: '#FFD600',      // Amarillo
    secondary: '#000000',    // Negro
    background: '#1a1818ff',   // Fondo blanco
    text: '#52902eff',         // Texto principal
    muted: '#888888',        // Texto gris
    danger: '#FF3B30',       // Errores
    success: '#34C759',      // Confirmaciones
    warning: '#FF9500',      // Alertas
    info: '#007AFF',         // Informativos
    lightGray: '#F5F5F5',    // Fondos secundarios
    overlay: '#00000066',    // Fondo semitransparente
  },
  

  fontSize: {
    display: 32,
    heading: 26,
    title: 22,
    body: 16,
    small: 13,
    caption: 11,
  },
  

  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
    full: 999,
  },

  fontFamily: {
      archivo: 'Archivo',
      archivoThin: 'ArchivoThin',
      archivoBold: 'ArchivoBold',
  },


  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
  },

  shadow: {
    light: {
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
  },

  opacity: {
    disabled: 0.4,
    active: 1,
    muted: 0.7,
  },

  zIndex: {
    default: 1,
    header: 10,
    drawer: 20,
    modal: 30,
    toast: 40,
  },

  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
}
