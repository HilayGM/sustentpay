import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

interface CardProps {
  clave: number
  address: string
  owner: string
  colony: string
  reference?: string
  commercial?: string
}

export function Card({ clave, address, owner, colony, reference, commercial }: CardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`../details/${clave}`)}>
      <View style={styles.headerRow}>
        <Text style={styles.address}>{address}</Text>
        <Ionicons name="chevron-forward" size={24} color="#2F9E44" />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.owner}>{owner}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Colonia:</Text>
        <Text style={styles.text}>{colony}</Text>
      </View>
      {reference && (
        <View style={styles.info}>
          <Text style={styles.label}>Referencia:</Text>
          <Text style={styles.text}>{reference}</Text>
        </View>
      )}
      {commercial && (
        <View style={styles.info}>
          <Text style={styles.label}>Nombre Comercial:</Text>
          <Text style={styles.text}>{commercial}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  address: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    color: "#2F9E44",
  },
  info: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  owner: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
  },
})

