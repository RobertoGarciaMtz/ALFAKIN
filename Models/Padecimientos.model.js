const {DataTypes} = require("sequelize");
const SequelizeDB = require("../models/connection.js");
const db = new SequelizeDB();

const Padacimientos = db.conexion.define("Padecimientos",
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
    id_padecimiento: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
  },
  {
    tablename: "Padecimientos",
    // underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

db.conexion.sync()
  .then(() => {
    console.log('Users model synchronized with database.');
  })
  .catch(error => {
    console.error('Error synchronizing Users model with database:', error);
  });
module.exports = Padacimientos;