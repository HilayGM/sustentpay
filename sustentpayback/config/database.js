const mysql = require("mysql2")

const config = {
  host: "localhost",
  user: "root", // Ajusta según tu configuración
  password: "", // Ajusta según tu configuración
  database: "sustentpay",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

console.log("Configuración de base de datos:", {
  ...config,
  password: "****", // Ocultamos la contraseña en los logs
})

const pool = mysql.createPool(config)
const promisePool = pool.promise()

// Probar la conexión
promisePool
  .query("SELECT 1")
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente")
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err)
  })

module.exports = promisePool

