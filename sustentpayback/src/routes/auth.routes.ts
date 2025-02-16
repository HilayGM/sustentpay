import { Router, type Request, type Response } from "express"
import { UserModel } from "../models/user"
import type { LoginResponse } from "../types"

const router = Router()

router.post("/login", async (req: Request, res: Response) => {
  console.log("Body recibido:", req.body)

  const { usuario, contraseña } = req.body

  if (!usuario || !contraseña) {
    console.log("Faltan campos requeridos")
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son requeridos",
    } as LoginResponse)
  }

  try {
    const user = await UserModel.findByUsername(usuario)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      } as LoginResponse)
    }

    if (user.contraseña === contraseña && user.estatus === 1) {
      console.log("Login exitoso para:", user.nombre)
      return res.json({
        success: true,
        user: {
          usuario: user.usuario,
          nombre: user.nombre,
        },
      } as LoginResponse)
    } else if (user.estatus !== 1) {
      return res.status(401).json({
        success: false,
        message: "Usuario inactivo",
      } as LoginResponse)
    } else {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      } as LoginResponse)
    }
  } catch (error) {
    console.error("Error en login:", error)
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    } as LoginResponse)
  }
})

export default router

