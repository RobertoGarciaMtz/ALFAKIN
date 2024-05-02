const express = require('express');
const padecimientostabla = require('./Padecimientos.model');
const consultasTabla = require('./Consultas.model');
const usuariostabla = require('./User.model');
const SequelizeDB = require('./connection');
const bodyParser = require('body-parser');
const {validarToken} = require('../middlewares/middlewares');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsuarios = "/usuarios/";
        this.pathLogin = "/";
        this.pathutilidades = "/utilidades/"
        this.pathConsultas = "/consultas/";

        this.app.set('view engine', 'ejs');
       
        this.app.set('views','./Views');
        
        this.middlewares();
        this.rutas();
    }

    middlewares(){
        this.app.use(express.static('Public'));
        this.app.use( express.json() );
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(validarToken);
    }

    rutas(){
        this.app.use(this.pathUsuarios,require('../Routes/user'));
        this.app.use(this.pathLogin,require('../Routes/login'));
        this.app.use(this.pathConsultas,require('../Routes/consulta'))
        this.app.use(this.pathutilidades,require('../Routes/utilidades'))
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

