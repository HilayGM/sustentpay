"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { router } from "expo-router"

export default function SplashScreen() {
  useEffect(() => {
    // Simular un tiempo de carga
    const timer = setTimeout(() => {
      router.replace("/Login")
    }, 3000) // 3 segundos

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/f2.svg")} style={styles.logo} />
      <Text style={styles.title}>SustentPay</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
})

