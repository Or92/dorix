const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const constants = require('./server/config/consts');
const api = require('./server/routes/api.route');
const db = require('./server/config/db.config');
const cors = require('cors');

const app = module.exports = express();

app.consts = constants;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`)
);

db.connect(server);
