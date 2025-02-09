const express = require("express")
const router = express.Router()
const User = require("../models/user.js")

// Middleware para logging
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`)
  next()
})

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    console.log("Iniciando consulta de usuarios...")
    const users = await User.getAll()
    console.log(`Usuarios encontrados: ${users.length}`)

    // Enviar la respuesta inmediatamente
    res.json(users)
  } catch (error) {
    console.error("Error en GET /users:", error)
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    })
  }
})

module.exports = router

//esto es un 5royuv