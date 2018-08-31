const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3, 4]);
});

app.get('/api/courses/:id', (req, res) => {
  res.send(`course: ${req.params.id}`);
});

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(`posts from: ${req.params.month}/${req.params.year}
<br/> filters: ${JSON.stringify(req.query)}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));