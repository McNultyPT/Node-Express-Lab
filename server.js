const express = require('express');

const dbRouter = require('./data/db-router');

const server = express();

server.use(express.json());
server.use('/api/posts', dbRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>Test Message</h1>
    `);
});

module.exports = server;