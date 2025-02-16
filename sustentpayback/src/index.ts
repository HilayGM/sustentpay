import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes" // Corregido: cambiado de "../routes/auth.routes"
import userRoutes from "./routes/user.routes" // Corregido: cambiado de "../routes/user.routes"

const app = express()

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(express.json())

// Middleware para logging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Rutas
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

// Manejador de errores
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

