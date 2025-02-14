import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{
          headerStyle: { backgroundColor: "#2F9E44" },
          headerTintColor: "#fff",
          title: "Contribuyente",
        }}
      />
      <Stack.Screen
        name="details/[id]/debts"
        options={{
          headerStyle: { backgroundColor: "#2F9E44" },
          headerTintColor: "#fff",
          title: "Detalles de adeudo",
        }}
      />
      <Stack.Screen
        name="new-user"
        options={{
          headerStyle: { backgroundColor: "#2F9E44" },
          headerTintColor: "#fff",
          title: "Nuevo Usuario",
        }}
      />
    </Stack>
  )
}

