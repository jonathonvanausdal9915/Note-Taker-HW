const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const notes = require('./routes/notes')
const fs = require('fs');
// all required packages and files used for the application.


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', notes);



app.use(express.static('public'));
//Get Route for Homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Get route for Notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.listen(PORT, () =>
    console.log(`serving all static files from public on port ${PORT}!`)
);