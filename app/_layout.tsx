import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { useCustomFonts } from '@/lib/fonts';

// Evita que el SplashScreen se oculte automáticamente
// hasta que las fuentes estén completamente cargadas
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Hook personalizado que carga tus fuentes desde /lib/fonts.ts
  const [fontsLoaded] = useCustomFonts();

  // Cuando las fuentes se cargan, ocultamos el splash
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Si las fuentes aún no están listas, no renderizamos nada
  // (para evitar flashes de texto sin estilo)
  if (!fontsLoaded) return null;

  // Una vez cargadas las fuentes, renderizamos la navegación principal
  return <Stack />;
}
