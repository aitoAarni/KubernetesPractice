import pool from "../db.js"

export const getNotes = async () => {
    const res = await pool.query("SELECT content FROM notes")
    return res.rows.map(row => row.content)
}

export const addNote = async note => {
    const res = await pool.query(
        "INSERT INTO notes (content) VALUES ($1) RETURNING *",
        [note]
    )
    res.rows[0]
    return res.rows[0].content
}
