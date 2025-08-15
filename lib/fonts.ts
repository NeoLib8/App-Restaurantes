import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  return useFonts({
    Archivo: require('../assets/fonts/Archivo_Condensed-Bold.ttf'),
    ArchivoThin: require('../assets/fonts/Archivo_ExtraCondensed-Thin.ttf'),
    ArchivoBold: require('../assets/fonts/Archivo_Condensed-Bold.ttf'),

  });
};
