import mysql from "mysql2/promise"
import type { DatabaseConfig } from "../types"

const config: DatabaseConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "sistema_pagos",
}

const connection = mysql.createPool(config)

export default connection

