import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";


export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPassword = (password: string): boolean =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export default function Index() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onRegister = () => {
    // 3.- Ningún campo vacío
    
    if (!email && !password) {
      Alert.alert("Error", "Los campos están vacíos");
      return;
    }
    if (!email) {
      Alert.alert("Error", "El correo está vacío");
      return;
    }
    if (!password) {
      Alert.alert("Error", "La contraseña está vacía");
      return;
    }
    if (!(password === passwordConfirm)){
        Alert.alert("Error", "Los Campos de contraseña deben coincidir");
      return;
    }

    // 1.- Email validado con regex
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Correo inválido");
      return;
    }

    // 3.- Reglas de la contraseña
    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y 1 carácter especial"
      );
      return;
   
    }

    Alert.alert("Bienvenido", email);
  };

  return (
    <View style={styles.container}>
      <Text>Registrarse</Text>

      <Text>Email:</Text>  
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      {/* 2.- Contraseña oculta */}
      <Text>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="*****"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Text>Confirmar contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="******"
        secureTextEntry
        onChangeText={setPasswordConfirm}
        value={passwordConfirm}
      />
    
      <Button title="Regitrarse" onPress={onRegister} color="#f411f476" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});