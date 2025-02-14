const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")

const app = express()

// Configuración de CORS más permisiva para desarrollo
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(express.json())

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Rutas
app.use("/api/auth", authRoutes)

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

