const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/user.routes.js")

const app = express()

// Configuración más permisiva de CORS para desarrollo
app.use(
  cors({
    origin: "*", // En producción, especifica los orígenes permitidos
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(express.json())

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Rutas
app.use("/api/users", userRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error:", err)
  res.status(500).json({
    message: "Error en el servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

