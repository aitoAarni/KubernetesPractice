import { Router } from "express"
import { addNote, getNotes } from "../services/noteService.js"

const noteRouter = Router()

noteRouter.get("/", async (req, res, next) => {
    console.log("Fetching all notes")
    const notes = await getNotes()

    res.status(200).json({ data: notes })
})

noteRouter.post("/", async (req, res, next) => {
    const note = req.body.data
    if (!note) {
        console.error("Note content is required")
        return res.status(400).json({ error: "Note content is required" })
    }
    if (note.length > 140) {
        console.error("Note content exceeds 140 characters: ", note)
        return res
            .status(400)
            .json({ error: "Note content exceeds 140 characters" })
    }
    console.log("Adding a new note:", note)
    const addedNote = await addNote(note)
    res.status(201).json({ data: addedNote })
})

export default noteRouter
