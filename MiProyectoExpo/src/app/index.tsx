import { Alert, Button, StyleSheet, Text, View, TextInput, Image } from "react-native";
import { useState } from "react";

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateAndSubmit = () => {
    // 1. Validar que ningún campo esté vacío
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error de Validación", "Ninguno de los campos puede estar vacío.");
      return;
    }

    // 2. Validar email con regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      Alert.alert("Error de Validación", "El formato del correo electrónico es inválido.");
      return;
    }

    // 3. Validar contraseña (8 caracteres, mayúsculas, minúsculas, 1 especial)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error de Validación", 
        "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y al menos 1 carácter especial."
      );
      return;
    }

    // Si pasa todas las validaciones
    Alert.alert("Éxito", "Todas las validaciones son correctas. ¡Login exitoso!");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/icon.png')}
      />

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="ejemplo@correo.com"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true} 
        placeholder="********"
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={validateAndSubmit}
          title="Iniciar Sesión"
          color="#841584"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1", 
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 30,
    backgroundColor: "#c0392b", // Fondo rojo similar al mockup para visualizar el bloque
  },
  label: {
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f1c40f", // Borde amarillo similar al mockup
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: '40%',
  }
});