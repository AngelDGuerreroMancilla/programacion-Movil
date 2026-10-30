import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

// Validación de email
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validación de contraseña
export const isValidPassword = (password: string): boolean =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Navegación atrás
  const onBack = () => {
    if (router.canGoBack?.()) {
      router.back();
    } else {
      router.push({ pathname: "/logIn" });
    }
  };

  // Validaciones y registro
  const onRegister = () => {
    if (!email && !username && !password && !passwordConfirm) {
      Alert.alert("Error", "Los campos están vacíos");
      return;
    }
    if (!email) {
      Alert.alert("Error", "El correo está vacío");
      return;
    }
    if (!username) {
      Alert.alert("Error", "El nombre de usuario está vacío");
      return;
    }
    if (!password) {
      Alert.alert("Error", "La contraseña está vacía");
      return;
    }
    if (!passwordConfirm) {
      Alert.alert("Error", "La confirmación de contraseña está vacía");
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert("Error", "Los campos de contraseña deben coincidir");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Correo inválido");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y 1 carácter especial"
      );
      return;
    }

    // Éxito: redirige al Index
    router.push({
      pathname: "/logIn",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <Text>Nombre de usuario:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
      />

      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Text>Confirmar contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
      />

      <Button title="Registrarse" onPress={onRegister} color="#841584" />
      <Text style={styles.smallText}>¿Ya tienes una cuenta?</Text>
      <Button title="Atrás" onPress={onBack} color="#f411f476" />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "80%",
    margin: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  smallText: {
    fontSize: 12,
    marginTop: 12,
    marginBottom: 4,
  },
});
