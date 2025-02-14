"use client"

import { useEffect, useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native"
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
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={20} color="#2F9E44" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="scan" size={20} color="#2F9E44" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {users.map((user) => (
          <Card
            key={user.clave}
            clave={user.clave}
            address={`${user.calle} ${user.no_ext}${user.letra ? ` ${user.letra}` : ""}`}
            owner={`${user.nombre} ${user.ap_paterno} ${user.ap_materno}`}
            colony={user.nombre_colonia}
          />
        ))}
      </ScrollView>
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
  searchHeader: {
    backgroundColor: "#2F9E44",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  iconButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2F9E44",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

