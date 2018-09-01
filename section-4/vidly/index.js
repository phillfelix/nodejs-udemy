const express = require('express');
const genres = require('./genres');
const app = express();

app.use(express.json());

app.use(genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Vidly API listening on port ${port}`));