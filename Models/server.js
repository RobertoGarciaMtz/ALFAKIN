const express = require('express');
const padecimientostabla = require('./Padecimientos.model');
const consultasTabla = require('./Consultas.model');
const usuariostabla = require('./User.model');
const SequelizeDB = require('./connection');
const bodyParser = require('body-parser')


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsuarios = "/usuarios/";
        this.pathLogin = "/";
        this.pathConsultas = "/consultas/";

        this.app.set('view engine', 'ejs');
        this.app.use(express.static('Public'));
        this.app.set('views','./Views');
        this.app.use( express.json() );
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.rutas();
    }

    rutas(){
        this.app.use(this.pathUsuarios,require('../Routes/user'));
        this.app.use(this.pathLogin,require('../Routes/login'));
        this.app.use(this.pathConsultas,require('../Routes/consulta'))
    }

    crearConexiones(){
        const db = new SequelizeDB();
        db.establecerRelaciones(usuariostabla,consultasTabla, padecimientostabla);
    }

    listen() {
        this.app.listen( this.port, () => console.log('Servidor corriendo en puerto', this.port ));
    }

}

module.exports = Server;

