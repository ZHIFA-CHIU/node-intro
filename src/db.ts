import 'dotenv/config'
import { readFile, writeFile } from "fs/promises";
import { DB, Note } from "./types";

const DB_PATH = process.env.DB_URL ?? '' ;

export const getDB = async (): Promise<DB> => {
    const db = await readFile(DB_PATH, "utf-8");
    return JSON.parse(db);
};

export const saveDB = async (db: DB) => {
    await writeFile(DB_PATH, JSON.stringify(db, null, 2));
    return db;
};

export const insertDB = async (note: Note) => {
    const db = await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
};
