require('dotenv').config();
const ConnectionBD = require('./models/connection');
const Server = require('./models/server');
const server = new Server();
server.listen();
server.crearConexiones();
//const connection = new ConnectionBD();

