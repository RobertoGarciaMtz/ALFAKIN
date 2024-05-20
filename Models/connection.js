const {Sequelize, Model} = require('sequelize');
//const enviroment = require('dotenv').config();// /*dejae esta linea comentada */
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

    /**
     * 
     * @param {Model} Usuarios 
     * @param {Model} Consultas
     * @param {Model} Padecimientos  
     */
    establecerRelaciones(Usuarios, Consultas, Padecimientos){

        Usuarios.hasMany(Consultas,{
            foreignKey:"id_consulta_usuario",
           sourceKey:"id_usuario" 
        });

        Padecimientos.hasOne(Consultas,{
            foreignKey:"id_padecimiento_consulta",
            sourceKey:"id_padecimiento"
        });
        Consultas.belongsTo(Usuarios,{foreignKey:"id_consulta_usuario",targetId:"id_usuario" });

        Consultas.belongsTo(Padecimientos,{foreignKey:"id_padecimiento_consulta",targetId:"id_padecimiento" });
    

        // Usuarios.hasMany(Consultas, {
        //     foreignKey: "id_consulta_usuario",
        //     sourceKey: "id_usuario"
        // });
    
        // Padecimientos.hasOne(Consultas, {
        //     foreignKey: "id_padecimiento_consulta",
        //     sourceKey: "id_padecimiento"
        // });
    
        // Consultas.belongsTo(Usuarios, {
        //     foreignKey: "id_consulta_usuario",
        //     targetKey: "id_usuario"
        // });
    
        // Consultas.belongsTo(Padecimientos, {
        //     foreignKey: "id_padecimiento_consulta",
        //     targetKey: "id_padecimiento"
        // });
    }
}

module.exports = ConnectionBD;