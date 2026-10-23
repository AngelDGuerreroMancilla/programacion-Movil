import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  // Estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Regex de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validaciones
  const handleLogin = () => {
    const errors: string[] = [];

    if (!email.trim() || !password.trim()) {
      errors.push("• Ningún campo debe estar vacío.");
    }

    if (email.trim() && !emailRegex.test(email.trim())) {
      errors.push("• El email debe tener un formato válido.");
    }

    if (password.trim()) {
      if (password.length < 8) {
        errors.push("• La contraseña debe tener al menos 8 caracteres.");
      }
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        errors.push("• La contraseña debe tener mayúsculas y minúsculas.");
      }
      if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push("• La contraseña debe tener al menos 1 caracter especial.");
      }
    }

    if (errors.length > 0) {
      Alert.alert("Resultado de validaciones", errors.join("\n"));
    } else {
      Alert.alert("Resultado de validaciones", "Validación exitosa.");
    }
  };

  // Interfaz
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
