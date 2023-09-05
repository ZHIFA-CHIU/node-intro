#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note = process.argv[2];
const newNote = {
    id: new Date(),
    content: note
};
console.log(newNote);
