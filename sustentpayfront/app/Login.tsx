"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from "react-native"
import { router } from "expo-router"

export default function Login() {
  const [usuario, setUsuario] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!usuario || !contraseña) {
      Alert.alert("Error", "Por favor ingrese usuario y contraseña")
      return
    }

    setLoading(true)

    try {
      console.log("Intentando login con:", { usuario, contraseña })

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          contraseña,
        }),
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data)

      if (response.ok && data.success) {
        router.replace("/(tabs)")
      } else {
        Alert.alert("Error", data.message || "Usuario o contraseña incorrectos")
      }
    } catch (error) {
      console.error("Error en login:", error)
      Alert.alert("Error", "Error al conectar con el servidor. Por favor verifica que el servidor esté corriendo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/images/f2.svg")} style={styles.logo} />
        <Text style={styles.title}>SustentPay</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Iniciar sesión</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#2F9E44",
    padding: 40,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    padding: 20,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2F9E44",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

