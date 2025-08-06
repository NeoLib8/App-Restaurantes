// app/index.tsx
import { View } from 'react-native'
import { AppButton } from '../components/AppButton'
import { AppTextInput } from '../components/AppTextInput'
import { AppHeader } from '../components/AppHeader'
import { AppDrawer } from '../components/AppDrawer'
import { AppText } from '../components/AppText'
import { useState } from 'react'
import { AppCategoryCard } from '../components/AppCategoryCard'

export default function Home() {
    const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppHeader onMenuPress={() => setDrawerOpen(true)} />
      <AppDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <AppText size="title" weight="bold" color="#000">Probando texto</AppText>
      <AppCategoryCard
        title="Patatas"
        image={require('../assets/papa.jpg')}
        onPress={() => console.log('Ir a patatas')}
      />
      <AppButton 
        title="Probando Botón" 
        onPress={() => console.log('Boton Presionado')}
        ></AppButton>
      <AppTextInput
        placeholder="Escribe algo..."
        ></AppTextInput>
        
    </View>
  )
}
