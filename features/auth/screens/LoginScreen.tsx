// features/auth/screens/LoginScreen.tsx

import { useState } from 'react'
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { signIn } from '../services/authService'
import { useSessionStore } from '@/stores/sessionStore'

export default function LoginScreen() {
  const router = useRouter()
  const setSession = useSessionStore((s) => s.setSession)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const { session } = await signIn(email, password)
      setSession(session)
      router.replace('/menu') // Redirige al home o menú
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

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

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/auth/register')}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12,
    borderRadius: 6, marginBottom: 12
  },
  button: {
    backgroundColor: 'black', padding: 14,
    borderRadius: 6, marginTop: 12
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 16, color: 'blue', textAlign: 'center' }
})
