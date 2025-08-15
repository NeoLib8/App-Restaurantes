import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/login-hero.jpg')}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          style={styles.gradient}
        />
      </View>

      <View style={styles.form}>
        <Text style={{
            fontFamily: theme.fontFamily.archivoBold,
            fontSize: theme.fontSize.title,
            color: theme.colors.text,
            marginBottom: theme.spacing.md,
            }}>Iniciar sesión</Text>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={theme.iconSize.md}
            color={theme.colors.muted}
            style={styles.icon}
          />
          <TextInput
            placeholder="Correo electrónico"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={theme.iconSize.md}
            color={theme.colors.muted}
            style={styles.icon}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
  <View style={styles.dividerLine} />
  <Text style={styles.dividerText}>O continúa con</Text>
  <View style={styles.dividerLine} />
</View>

<View style={styles.socialButtons}>
  <TouchableOpacity style={styles.socialButton}>
    <Image
      source={require('@/assets/icons/icon-google.png')}
      style={styles.socialIcon}
    />
    <Text style={styles.socialButtonText}>Google</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.socialButton}>
    <Image
      source={require('@/assets/icons/icon-ios.png')}
      style={styles.socialIcon}
    />
    <Text style={styles.socialButtonText}>Apple</Text>
  </TouchableOpacity>
</View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    height: 260,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
  },
  form: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.heading,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 48,
    ...theme.shadow.light,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.body,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    ...theme.shadow.medium,
  },
  buttonText: {
    fontSize: theme.fontSize.body,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  link: {
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    fontSize: theme.fontSize.small,
  },
    dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.muted,
    opacity: 0.2,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.small,
    color: theme.colors.muted,
    fontFamily: theme.fontFamily.archivo,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.white,
    ...theme.shadow.light,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing.sm,
    resizeMode: 'contain',
  },
  socialButtonText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    fontFamily: theme.fontFamily.archivo,
  },

});
