const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const notes = require('./db/notes');
const uuid = require('./uuid');
// all required packages and files used for the application.

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
//grabs the public static folder

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    return res.json(notes);
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
app.post('/api/notes', (req, res) => {
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











//app heroku listening on PORT (3001)

app.listen(PORT, () =>
    console.log(`serving all static files from public on port ${PORT}!`)
);