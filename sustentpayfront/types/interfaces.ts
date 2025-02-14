export interface User {
    clave: number
    nombre: string
    ap_paterno: string
    ap_materno: string
    calle: string
    no_ext: string
    letra?: string
    no_int?: string
    nombre_colonia: string
    tipo_usuario: string
    tipo_contrato: string
    tipo_cobro: string
    estado: string
    referencia?: string
    nombre_comercial?: string
  }
  
  export interface Debt {
    id_adeudo: number
    clave_usuario: number
    anio: number
    mes: string
    monto: number
    pagado: boolean
    fecha_registro: string
  }
  
  