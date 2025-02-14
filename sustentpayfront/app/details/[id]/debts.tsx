import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

export default function DebtsDetails() {
  const { id } = useLocalSearchParams()
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({
    "2024": true,
    "2025": false,
  })

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }))
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Detalles de adeudo</Text>

      <View style={styles.yearContainer}>
        {Object.entries(expandedYears).map(([year, isExpanded]) => (
          <View key={year}>
            <TouchableOpacity style={styles.yearHeader} onPress={() => toggleYear(year)}>
              <Ionicons name={isExpanded ? "remove" : "add"} size={24} color="#2F9E44" />
              <Text style={styles.yearText}>{year}</Text>
              <Text style={styles.importeText}>Importe</Text>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.monthsContainer}>
                {[
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ].map((month) => (
                  <View key={month} style={styles.monthRow}>
                    <View style={styles.checkboxContainer}>
                      <View style={styles.checkbox} />
                      <Text style={styles.monthText}>{month}</Text>
                    </View>
                    <Text style={styles.amountText}>30</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total de adeudo:</Text>
        <Text style={styles.totalAmount}>$ 360.00</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  yearContainer: {
    backgroundColor: "#DCFCE7",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  yearHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BBF7D0",
  },
  yearText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
  },
  importeText: {
    fontSize: 16,
    color: "#374151",
  },
  monthsContainer: {
    paddingHorizontal: 16,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#BBF7D0",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#2F9E44",
    borderRadius: 4,
    marginRight: 12,
  },
  monthText: {
    fontSize: 16,
    color: "#374151",
  },
  amountText: {
    fontSize: 16,
    color: "#374151",
  },
  totalContainer: {
    backgroundColor: "#DCFCE7",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
  },
})

