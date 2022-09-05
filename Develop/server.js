const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');



app.get('/notes', (req, res) => res.send('/public/noteshtml'));

app.get('/', (req, res) => res.send('/public/index.html'));

app.get('/api', (req, res) => res.json('/api/notes'));








app.listen(PORT, () =>
    console.log(`serving all static files from public on port ${PORT}!`)
);