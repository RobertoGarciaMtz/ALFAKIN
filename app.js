require('dotenv').config();
const ConnectionBD = require('./models/connection');
const Server = require('./models/server');
const server = new Server();
server.listen();
const connection = new ConnectionBD();

