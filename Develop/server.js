const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const fs = require('fs');



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    // Inform the client
    res.json(`${req.method} request received to get notes`);

    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
});

app.post('/api/notes', (req, res) => {
    // Inform the client that their POST request was received
    res.json(`${req.method} request received to add notes`);

    // Log our request to the terminal
    console.info(`${req.method} request received to add a note`);
});


app.get('/', (req, res) => res.send('/public/index.html'));

app.get('/api', (req, res) => res.json('/api/notes'));








app.listen(PORT, () =>
    console.log(`serving all static files from public on port ${PORT}!`)
);