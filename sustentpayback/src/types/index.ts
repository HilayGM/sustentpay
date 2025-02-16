export interface User {
    usuario: string
    nombre: string
    contraseña: string
    estatus: number
  }
  
  export interface DatabaseConfig {
    host: string
    user: string
    password: string
    database: string
  }
  
  export interface LoginResponse {
    success: boolean
    user?: {
      usuario: string
      nombre: string
    }
    message?: string
  }
  
  