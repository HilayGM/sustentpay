import type { RowDataPacket } from "mysql2"
import db from "../config/database"
import type { User } from "../types"

interface UserRow extends User, RowDataPacket {}

export class UserModel {
  static async getAll(): Promise<UserRow[]> {
    try {
      const [rows] = await db.execute<UserRow[]>("SELECT * FROM os_usuario")
      return rows
    } catch (error) {
      console.error("Error en getAll:", error)
      throw error
    }
  }

  static async findByUsername(usuario: string): Promise<UserRow | null> {
    try {
      const [rows] = await db.execute<UserRow[]>("SELECT * FROM os_usuario WHERE usuario = ?", [usuario])
      return rows[0] || null
    } catch (error) {
      console.error("Error en findByUsername:", error)
      throw error
    }
  }

  static async create(userData: Partial<User>): Promise<number> {
    try {
      const { usuario, nombre, contraseña, estatus = 1 } = userData
      const [result] = await db.execute(
        "INSERT INTO os_usuario (usuario, nombre, contraseña, estatus) VALUES (?, ?, ?, ?)",
        [usuario, nombre, contraseña, estatus],
      )
      return (result as any).insertId
    } catch (error) {
      console.error("Error en create:", error)
      throw error
    }
  }
}

