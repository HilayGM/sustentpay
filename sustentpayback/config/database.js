const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Asegúrate de que esto coincida con tu configuración de XAMPP
  database: "sistema_pagos",
})

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err)
    return
  }
  console.log("Conexión a la base de datos establecida")
})

module.exports = connection.promise()

