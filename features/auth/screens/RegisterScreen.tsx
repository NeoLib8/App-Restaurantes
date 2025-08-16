// features/auth/screens/RegisterScreen.tsx

import { useState } from 'react'
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { signUp } from '../services/authService'

// Componente de registro de usuario final
export default function RegisterScreen() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  // ✅ Cargar el restaurant_id desde variable de entorno
  const restaurantId = process.env.EXPO_PUBLIC_RESTAURANT_ID

  /**
   * Maneja el flujo completo de registro:
   * - Auth (email, password)
   * - Base de datos (`users`)
   */
  const handleRegister = async () => {
    try {
      if (!restaurantId) throw new Error('Falta el restaurant_id en .env')

      await signUp(email, password, name, phone, restaurantId)
      Alert.alert('Cuenta creada', 'Ahora puedes iniciar sesión')
      router.replace('/auth/login')
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/auth/login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 16, color: 'blue', textAlign: 'center' },
})
