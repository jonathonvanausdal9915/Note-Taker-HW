const notes = require('express').Router();
const fs = require('fs');
const notesDb = require('../db/notes.json');
const uuid = require('../uuid');


notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    return res.json(notesDb);
});


// app.delete(`/api/notes/${note_id}`, (req, res) =>

//     fs.readFile('./db/notes.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             // Convert string into JSON object
//             const parsedNotes = JSON.parse(data);

//             // Add a new notes
//             parsedNotes.pop(note_id);

//             // Write updated notes back to the file
//             fs.writeFile(
//                 './db/notes.json',
//                 JSON.stringify(parsedNotes, null, 3),
//                 (writeErr) =>
//                 writeErr ?
//                 console.error(writeErr) :
//                 console.info('Successfully updated notes!')
//             );
//         }
//     }));


// when /api/notes is called saves object newNote to .db/notes.json
notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;

    // If all the required properties are present
    if (req.body) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: uuid(),

        };
        // Obtain existing notes
        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new notes
                parsedNotes.push(newNote);

                // Write updated notes back to the file
                fs.writeFile(
                    './db/notes.json',
                    JSON.stringify(parsedNotes, null, 3),
                    (writeErr) =>
                    writeErr ?
                    console.error(writeErr) :
                    console.info('Successfully updated notes!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

module.exports = notes;