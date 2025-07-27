import { Router } from "express"
import { addNote, getNotes } from "../services/noteService.js"

const noteRouter = Router()

noteRouter.get("/", (req, res, next) => {
    const notes = getNotes()

    res.status(200).json({ data: notes })
})

noteRouter.post("/", (req, res, next) => {
    const note = req.body.data
    if (!note) {
        return res.status(400).json({ error: "Note content is required" })
    }
    const addedNote = addNote(note)
    res.status(201).json({ data: addedNote })
})

export default noteRouter
