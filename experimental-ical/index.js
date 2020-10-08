const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./src/api');

const port = 3000;
const app = express();

// Serve static (compiled web app) files from the public folder
app.use(express.static('public'));

// Attach req.body on relevant req's
app.use(bodyParser.json());

app.use('/api/v1', apiRouter);

app.listen(port, () => {
  console.log(`Starting app on port ${port} at ${new Date().toISOString().slice(0, 16).split('T')
    .join(' ')}`);
});
