"use client"

import { useEffect, useState, useCallback } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Card } from "../../components/Card"
import { Ionicons } from "@expo/vector-icons"

interface User {
  clave: number
  nombre: string
  ap_paterno: string
  ap_materno: string
  calle: string
  no_ext: string
  letra: string
  nombre_colonia: string
  referencia?: string
  nombre_comercial?: string
}



const API_URL = "http://localhost:3000/api" // Cambiamos localhost por 10.0.2.2 para Android

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Iniciando petición a:", `${API_URL}/users`)
      const response = await fetch(`${API_URL}/users`)

      console.log("Status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Datos recibidos:", data)

      if (!Array.isArray(data)) {
        throw new Error("Los datos recibidos no son un array válido")
      }

      setUsers(data)
    } catch (error) {
      console.error("Error al cargar usuarios:", error)
      setError("Error al cargar los usuarios. Por favor, intente más tarde.")
    } finally {
      setLoading(false)
    }
  }, []) // No dependencies needed as it doesn't use any external state

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers]) // Added fetchUsers to the dependency array

  const handleRetry = () => {
    fetchUsers()
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Cargando usuarios...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {users.length === 0 ? (
            <Text style={styles.noDataText}>No hay usuarios registrados</Text>
          ) : (
            users.map((user) => (
              <Card
                key={user.clave}
                address={`${user.calle} ${user.no_ext}${user.letra ? ` ${user.letra}` : ""}`}
                owner={`${user.nombre} ${user.ap_paterno} ${user.ap_materno}`}
                colony={user.nombre_colonia}
                reference={user.referencia}
                commercial={user.nombre_comercial}
              />
            ))
          )}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/new-user")}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#EF4444",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#4F46E5",
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

