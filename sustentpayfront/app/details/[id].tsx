"use client"

import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { useState, useEffect } from "react"
import { Ionicons } from "@expo/vector-icons"
import type { User } from "../../types/interfaces"

export default function Details() {
  const { id } = useLocalSearchParams()
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    // Aquí irían las llamadas a la API
    setUserData({
      clave: Number(id),
      nombre: "Juan Pérez López",
      ap_paterno: "Pérez",
      ap_materno: "López",
      calle: "Av. Reforma 123 A",
      no_ext: "12",
      nombre_colonia: "Centro",
      tipo_usuario: "Residencial",
      tipo_contrato: "Estándar",
      tipo_cobro: "Mensual",
      estado: "Activo",
    })
  }, [id])

  if (!userData) return null

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/OIP.jpg")} style={styles.image} />
        </View>

        <View style={styles.formContainer}>
          <InfoField
            label="Nombre/Contribuyente"
            value={`${userData.nombre} ${userData.ap_paterno} ${userData.ap_materno}`}
          />
          <InfoField label="Calle" value={userData.calle} />
          <InfoField label="Colonia" value={userData.nombre_colonia} />
          <InfoField label="Tipo de usuario" value={userData.tipo_usuario} />
          <InfoField label="Tipo de contrato" value={userData.tipo_contrato} />
          <InfoField label="Tipo de cobro" value={userData.tipo_cobro} />
          <InfoField label="Estado" value={userData.estado} />

          <View style={styles.totalContainer}>
            <View style={styles.totalContent}>
              <Text style={styles.totalLabel}>Total de adeudo:</Text>
              <Text style={styles.totalAmount}>$ 1500.00</Text>
              <TouchableOpacity style={styles.detailsButton} onPress={() => router.push(`../../details/${id}/debts`)}>
                <Text style={styles.detailsButtonText}>Detalles</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldValueContainer}>
        <Text style={styles.fieldValue}>{value}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#2F9E44" />
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
  content: {
    padding: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#2F9E44",
  },
  formContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#374151",
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fieldValue: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  editButton: {
    padding: 4,
  },
  totalContainer: {
    marginTop: 24,
    backgroundColor: "#DCFCE7",
    borderRadius: 16,
    padding: 16,
  },
  totalContent: {
    alignItems: "center",
    gap: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: "#374151",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
  },
  detailsButton: {
    backgroundColor: "#2F9E44",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})

