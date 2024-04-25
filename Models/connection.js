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

    establecerRelaciones(Usuarios, Consultas){
        Consultas.associations = () => {
            Consultas.belongsTo(Users,{foreignKey:"Identifier", as: "fk_consulta_usuarios"});
          };

          Usuarios.associations = () => {
            Usuarios.hasMany(Consultas,{foreignKey:"id_consulta", as: "fk_usuarios_consulta"});
          };
    }
}

module.exports = ConnectionBD;