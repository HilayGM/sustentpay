const db = require("../config/database.js")

class User {
  static async getAll() {
    try {
      console.log("Ejecutando consulta SQL...")
      const [rows] = await db.query(`
        SELECT 
          clave,
          identificador,
          nombre,
          ap_paterno,
          ap_materno,
          calle,
          no_ext,
          letra,
          no_int,
          nombre_colonia,
          referencia,
          nombre_comercial
        FROM os_layout
      `)

      console.log("Resultados obtenidos:", rows.length)
      return rows
    } catch (error) {
      console.error("Error en getAll:", error)
      throw new Error(`Error al obtener usuarios: ${error.message}`)
    }
  }
}

module.exports = User

