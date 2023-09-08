import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    createNote,
    findNotes,
    getAllNotes,
    removeAllNotes,
    removeNote,
} from "./notes";
import { listNotes } from "./utils";

yargs(hideBin(process.argv))
    .option("tags", {
        alias: "t",
        type: "string",
        description: "Tags to add to the note",
    })
    .command(
        "new <note>",
        "Create a new note",
        (yargs) =>
            yargs.positional("note", {
                type: "string",
                description: "The content of the note to create",
            }),
        async (argv) => {
            if (argv.note) {
                const note = await createNote(
                    argv.note,
                    argv.tags ? (argv.tags as unknown as string[]) : []
                );
                console.log(note);
            }
        }
    )
    .command(
        "all",
        "get all notes",
        () => {},
        async (argv) => listNotes(await getAllNotes())
    )
    .command(
        "find <filter>",
        "get matching notes",
        (yargs) => {
            return yargs.positional("filter", {
                describe:
                    "The search term to filter notes by, will be applied to note.content",
                type: "string",
            });
        },
        async (argv) => {
            const filter = argv.filter;
            const notes = await getAllNotes();
            if (filter) {
                const note = await findNotes(filter);
                console.log(note);
            }
        }
    )
    .command(
        "remove <id>",
        "remove a note by id",
        (yargs) => {
            return yargs.positional("id", {
                type: "number",
                description: "The id of the note you want to remove",
            });
        },
        async (argv) => {
            const id = await removeNote(argv.id ?? -1);
            console.log(id ?? -1);
        }
    )
    .command(
        "web [port]",
        "launch website to see notes",
        (yargs) => {
            return yargs.positional("port", {
                describe: "port to bind on",
                default: 5000,
                type: "number",
            });
        },
        async (argv) => {}
    )
    .command(
        "clean",
        "remove all notes",
        () => {},
        async (argv) => {
            await removeAllNotes();
            console.log("Cleared all notes");
        }
    )
    .demandCommand(1)
    .parse();
