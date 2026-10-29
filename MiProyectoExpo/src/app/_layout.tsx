import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
        <Stack.Screen name="logIn" />
        <Stack.Screen name="register" />
    </Stack>)
}