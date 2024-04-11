const {Sequelize} = require('sequelize');

class ConnectionBD {

    constructor(){
        this.db = process.env.DATABASE;
        this.usr = process.env.USERNAMEBD;
        this.pswd = process.env.PASSWORD;
        this.conexion = this.establecerConexion();

    }

    establecerConexion(){
        return new Sequelize(this.db, this.usr, this.pswd, {
            host: 'localhost',
            dialect: 'mysql'
        });
    }
}

module.exports = ConnectionBD;