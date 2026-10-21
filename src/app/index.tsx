import { Alert, Button, StyleSheet, Text, View, Switch } from "react-native";
import { useState } from "react";





export default function Index() {

  const [switchValue, setSwitchValue] = useState(false)
  
  const onPressLearnMore = () => {
    Alert.alert("Angel", "el texto que se escribio");
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
      <Button
        onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />;
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
});
