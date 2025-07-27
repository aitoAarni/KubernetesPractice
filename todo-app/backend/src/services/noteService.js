export const getNotes = () => {
    return Notes.notes;
}

export const addNote = (note) => {
    Notes.notes.push(note);
    return note
}

class Notes {
    static notes = []
}
