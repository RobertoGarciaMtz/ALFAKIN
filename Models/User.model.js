const {DataTypes} = require("sequelize");
const SequelizeDB = require("../models/connection.js");
//const SequelizeDB = require("./connection");
const db = new SequelizeDB();
const Usuarios = db.conexion.define("Usuarios",
  {
    nombre: {
      type: DataTypes.STRING(100),
    },
    apellido_paterno: {
      type: DataTypes.STRING(100),
    },
    apellido_materno: {
      type: DataTypes.STRING(100),
    },
    contrasena: {
        type: DataTypes.STRING(250),
    },
      telefono: {
        type: DataTypes.STRING(50)
      },
    antecedentes_congenitos: {
      type:DataTypes.STRING(250),
    },
    antecedentes_familiares: {
      type:DataTypes.STRING(250),
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
    },
    id_usuario: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Rol: {
        type:DataTypes.STRING(100)
    },
    HashedKey: {
      type: DataTypes.TEXT,
    },
    Sexo: {
      type: DataTypes.STRING(100),
    }
  },
  {
    tablename: "Usuarios",
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

module.exports = Usuarios;