import { Router } from "express"
import { addNote, getNotes } from "../services/noteService.js"

const noteRouter = Router()

noteRouter.get("/", async (req, res, next) => {
    const notes = await getNotes()

    res.status(200).json({ data: notes })
})

noteRouter.post("/", async (req, res, next) => {
    const note = req.body.data
    if (!note) {
        return res.status(400).json({ error: "Note content is required" })
    }
    const addedNote = await addNote(note)
    res.status(201).json({ data: addedNote })
})

export default noteRouter
