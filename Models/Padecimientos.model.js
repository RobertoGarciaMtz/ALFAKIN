const {DataTypes} = require("sequelize");
const SequelizeDB = require("../models/connection");
const db = new SequelizeDB();
//const SequelizeDB = require("./connection");
const Padacimientos = db.conexion.define("Padacimientos",
  {
    Razon: {
      type: DataTypes.STRING(100),
    },
    Zona_dolor: {
      type: DataTypes.STRING(100),
    },
    Comentarios: {
        type: DataTypes.TEXT,
    },
    Recomendaciones: {
        type: DataTypes.TEXT,
    },
    Tratamiento: {
        type: DataTypes.TEXT,
    },
    Identifier: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
  },
  {
    tablename: "Padacimientos",
    // underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

db.conexion.sync()
  .then(() => {
    console.log('Padecimientos model synchronized with database.');
  })
  .catch(error => {
    console.error('Error synchronizing Users model with database:', error);
  });

module.exports = Padacimientos;