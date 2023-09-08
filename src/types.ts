export type Note = {
    content: string;
    id: number;
    tags: string[]
}

export type DB = {
    notes: Note[];
};
