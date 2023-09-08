import { Note } from "./types";

export const listNotes = (notes: Note[]) => {
    notes.forEach(({ id, content, tags }) => {
        console.log("id:", id);
        console.log("tags:", tags);
        console.log("content:", content);
        console.log("\n");
    });
};
