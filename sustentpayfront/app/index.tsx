"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image, Animated } from "react-native"
import { router } from "expo-router"

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0)

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace("/Login")
    })
  }, [fadeAnim]) // Added fadeAnim to dependencies

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={require("../assets/images/f2.svg")} style={styles.logo} />
        <Text style={styles.title}>SustentPay</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F9E44",
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
    textAlign: "center",
  },
})

