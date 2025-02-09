import { View, Text, ScrollView, StyleSheet } from "react-native"

export default function Details() {
  const userData = {
    name: "Luisa Romero Gonzales",
    address: "Calle Allende #12",
    type: "Residencial",
    colony: "Centro",
  }

  const debts = [
    { month: "Enero 2024", amount: 500 },
    { month: "Febrero 2024", amount: 500 },
    { month: "Marzo 2024", amount: 500 },
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>USUARIO</Text>
        <View style={styles.userInfo}>
          <InfoRow label="Nombre/Contribuyente" value={userData.name} />
          <InfoRow label="Domicilio" value={userData.address} />
          <InfoRow label="Tipo de usuario" value={userData.type} />
          <InfoRow label="Colonia" value={userData.colony} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalles De Adeudo</Text>
        {debts.map((debt, index) => (
          <View key={index} style={styles.debtRow}>
            <Text style={styles.month}>{debt.month}</Text>
            <Text style={styles.amount}>${debt.amount}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total de adeudo:</Text>
          <Text style={styles.totalAmount}>${debts.reduce((sum, debt) => sum + debt.amount, 0)}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  section: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#4F46E5",
  },
  userInfo: {
    gap: 12,
  },
  infoRow: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
  },
  value: {
    fontSize: 16,
  },
  debtRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  month: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: "#E5E7EB",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4F46E5",
  },
})

