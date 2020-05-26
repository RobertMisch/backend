const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../router/users/users-router.js');
const itemsRouter = require('../router/items/items-router.js');
const potlucksRouter = require('../router/potlucks/potlucks-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// server.use('/api/accounts', authRouter);
// server.use('/api/users', authenticate, usersRouter);
// server.use('/api/items', authenticate, itemsRouter);
// server.use('/api/potlucks', authenticate, potlucksRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;