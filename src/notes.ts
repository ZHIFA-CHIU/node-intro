import { getDB, insertDB, saveDB } from "./db";
import { Note } from "./types";

export const createNote = async (note: string, tags: string[]) => {
    const newNote: Note = {
        id: Date.now(),
        content: note,
        tags,
    };

    await insertDB(newNote);
    return newNote;
};

export const getAllNotes = async () => (await getDB()).notes;

export const findNotes = async (filter: string) => {
    const { notes } = await getDB();
    return notes.filter((n) =>
        n.content.toLowerCase().includes(filter.toLowerCase())
    );
};

export const removeNote = async (id: number) => {
    const notes = await getAllNotes();
    const match = notes.find((n) => n.id === id);
    if (match) await saveDB({ notes: notes.filter((n) => n.id !== id) });
    return match ? id : undefined;
};

export const removeAllNotes = async () => await saveDB({ notes: [] });
