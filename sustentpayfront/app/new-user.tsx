"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native"
import { router } from "expo-router"

const API_URL = "http://localhost:3000/api"

export default function NewUser() {
  const [formData, setFormData] = useState({
    nombre: "",
    ap_paterno: "",
    ap_materno: "",
    calle: "",
    no_ext: "",
    letra: "",
    no_int: "",
    nombre_colonia: "",
    referencia: "",
    nombre_comercial: "",
    usuario: "SYSTEM",
  })

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      // Validación básica
      if (!formData.nombre || !formData.ap_paterno || !formData.calle || !formData.no_ext) {
        Alert.alert("Error", "Por favor complete los campos obligatorios")
        return
      }

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al guardar el usuario")
      }

      const result = await response.json()
      console.log("Usuario guardado:", result)

      Alert.alert("Éxito", "Usuario guardado correctamente", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      Alert.alert("Error", "No se pudo guardar el usuario")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Nuevo Usuario</Text>

        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre}
          onChangeText={(value) => handleChange("nombre", value)}
          placeholder="Ingrese el nombre"
        />

        <Text style={styles.label}>Apellido Paterno *</Text>
        <TextInput
          style={styles.input}
          value={formData.ap_paterno}
          onChangeText={(value) => handleChange("ap_paterno", value)}
          placeholder="Ingrese el apellido paterno"
        />

        <Text style={styles.label}>Apellido Materno</Text>
        <TextInput
          style={styles.input}
          value={formData.ap_materno}
          onChangeText={(value) => handleChange("ap_materno", value)}
          placeholder="Ingrese el apellido materno"
        />

        <Text style={styles.label}>Calle *</Text>
        <TextInput
          style={styles.input}
          value={formData.calle}
          onChangeText={(value) => handleChange("calle", value)}
          placeholder="Ingrese la calle"
        />

        <Text style={styles.label}>Número Exterior *</Text>
        <TextInput
          style={styles.input}
          value={formData.no_ext}
          onChangeText={(value) => handleChange("no_ext", value)}
          placeholder="Ingrese el número exterior"
        />

        <Text style={styles.label}>Letra</Text>
        <TextInput
          style={styles.input}
          value={formData.letra}
          onChangeText={(value) => handleChange("letra", value)}
          placeholder="Ingrese la letra"
          maxLength={1}
        />

        <Text style={styles.label}>Número Interior</Text>
        <TextInput
          style={styles.input}
          value={formData.no_int}
          onChangeText={(value) => handleChange("no_int", value)}
          placeholder="Ingrese el número interior"
        />

        <Text style={styles.label}>Colonia *</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre_colonia}
          onChangeText={(value) => handleChange("nombre_colonia", value)}
          placeholder="Ingrese la colonia"
        />

        <Text style={styles.label}>Referencia</Text>
        <TextInput
          style={styles.input}
          value={formData.referencia}
          onChangeText={(value) => handleChange("referencia", value)}
          placeholder="Ingrese una referencia"
        />

        <Text style={styles.label}>Nombre Comercial</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre_comercial}
          onChangeText={(value) => handleChange("nombre_comercial", value)}
          placeholder="Ingrese el nombre comercial"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar Usuario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  form: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4F46E5",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#4B5563",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

