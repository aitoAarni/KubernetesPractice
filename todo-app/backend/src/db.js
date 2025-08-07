// db.js
import pkg from "pg"
const { Pool } = pkg

const conf = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

console.log("Database configuration:", conf)

const pool = new Pool(conf)

export const initializeDb = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL
    );
  `)
}

export default pool
