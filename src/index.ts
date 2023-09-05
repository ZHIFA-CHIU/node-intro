#!/usr/bin/env node

import { Note } from "./types";

const note = process.argv[2];

const newNote: Note = {
    id: new Date(),
    content: note,
};

console.log(newNote);
