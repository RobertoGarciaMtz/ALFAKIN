const {DataTypes} = require("sequelize");
const SequelizeDB = require("../models/connection.js");
const Users = require("./User.model.js");
const db = new SequelizeDB();

const Consultas = db.conexion.define("Consultas",
  {
    id_consulta: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_consulta_usuario:{
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'Identifier'
      }
    },
    fecha_sesion: {
      type: DataTypes.DATE
    },
    tipo_cita: {
      type: DataTypes.STRING(254)
    }
  },
  {
    tablename: "Consultas",
    // underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

db.conexion.sync()
  .then(() => {
    console.log('Consultas model synchronized with database.');
  })
  .catch(error => {
    console.error('Error synchronizing Consultas model with database:', error);
  });

module.exports = Consultas;