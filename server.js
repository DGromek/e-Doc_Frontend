const express = require('express');

const app = express();

app.use(express.static('./dist/e-Doc_frontend'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/e-Doc_frontend/'}),
);

app.listen(process.env.PORT || 8080);
