import { Alert, Button, StyleSheet, Text, View, Switch, TextInput } from "react-native";
import { useState } from "react";
import {useRouter } from "expo-router"




export default function Index() {

  const [switchValue, setSwitchValue] = useState(false);
  const [text, onChangeText] = useState('');
  
  const onPressLearnMore = () => {
    Alert.alert(text, "el texto que se escribio ");
  };

  const toggleSwitch = (value: boolean) => {
    console.warn("Switch cambio a valor: ", value)
    setSwitchValue(value)

  }

  return (
    <View style={styles.container}>
      <Text>HOLA MUNDO</Text>
      <Switch
        onValueChange={toggleSwitch}
        value={switchValue}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}

        >

      </TextInput>
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text>El switch esta: {switchValue ? "Encendido": "Apagado"} </Text> 
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3895e6",
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,

  }
});
