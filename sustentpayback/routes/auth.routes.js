const express = require("express")
const router = express.Router()
const db = require("../config/database")

router.post("/login", async (req, res) => {
  console.log("Body recibido:", req.body)

  const { usuario, contraseña } = req.body

  if (!usuario || !contraseña) {
    console.log("Faltan campos requeridos")
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son requeridos",
    })
  }

  try {
    // Primero verificamos si el usuario existe
    const [users] = await db.execute("SELECT * FROM os_usuario WHERE usuario = ?", [usuario])

    console.log("Usuario encontrado:", users[0])

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      })
    }

    // Verificamos la contraseña y el estatus
    const user = users[0]
    if (user.contraseña === contraseña && user.estatus === 1) {
      console.log("Login exitoso para:", user.nombre)
      return res.json({
        success: true,
        user: {
          usuario: user.usuario,
          nombre: user.nombre,
        },
      })
    } else if (user.estatus !== 1) {
      return res.status(401).json({
        success: false,
        message: "Usuario inactivo",
      })
    } else {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      })
    }
  } catch (error) {
    console.error("Error en login:", error)
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    })
  }
})

module.exports = router

