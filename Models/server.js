const express = require('express');
const padecimientostabla = require('./Padecimientos.model');
const consultasTabla = require('./Consultas.model');
const usuariostabla = require('./User.model');
const pagostabla = require('./Pagos.model');
const SequelizeDB = require('./connection');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const {validarToken,addHeaders} = require('../middlewares/middlewares');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUsuarios = "/usuarios/";
        this.pathLogin = "/";
        this.pathutilidades = "/utilidades/"
        this.pathConsultas = "/consultas/";
        this.pathPadecimientos = "/padecimientos/";
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
        this.app.use(addHeaders);
        this.app.use(methodOverride('_method')); 
    }

    rutas(){
        this.app.use(this.pathUsuarios,require('../Routes/user'));
        this.app.use(this.pathLogin,require('../Routes/login'));
        this.app.use(this.pathConsultas,require('../Routes/consulta'))
        this.app.use(this.pathutilidades,require('../Routes/utilidades'))
        this.app.use(this.pathPadecimientos,require('../Routes/padecimientos'))
    }

    crearConexiones(){
        const db = new SequelizeDB();
        db.establecerRelaciones(usuariostabla,consultasTabla, padecimientostabla,pagostabla);
    }

    listen() {
        this.app.listen( this.port, () => console.log('Servidor corriendo en puerto', this.port ));
    }

}

module.exports = Server;

