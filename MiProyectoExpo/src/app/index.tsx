import { Alert, Button, StyleSheet, Text, View, Switch, TextInput } from "react-native";
import { useState } from "react";





export default function Index() {

  const [switchValue, setSwitchValue] = useState(false);
  const [text, onChangeText] = useState('');
  
  const onPressLearnMore = () => {
    Alert.alert("Angel", "el texto que se escribio " + text);
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
