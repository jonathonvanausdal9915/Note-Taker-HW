const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');


app.use(express.static("public"))

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.post('/api/reviews', (req, res) => {
    // Inform the client that their POST request was received
    res.json(`${req.method} request received to add a review`);

    // Log our request to the terminal
    console.info(`${req.method} request received to add a review`);
});


app.get('/', (req, res) => res.send('/public/index.html'));

app.get('/api', (req, res) => res.json('/api/notes'));








app.listen(PORT, () =>
    console.log(`serving all static files from public on port ${PORT}!`)
);