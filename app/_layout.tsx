// app/_layout.tsx
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { SplashScreen } from 'expo-router'
import { useCustomFonts } from '@/lib/fonts'
import { View, StyleSheet } from 'react-native'
import DebugInfo from '@/components/DebugInfo'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [fontsLoaded] = useCustomFonts()

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <View style={styles.debugContainer}>
        <DebugInfo />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  debugContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8
  }
})
