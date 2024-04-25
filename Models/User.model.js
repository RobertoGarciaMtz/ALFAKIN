const {DataTypes} = require("sequelize");
const SequelizeDB = require("../models/connection.js");
//const SequelizeDB = require("./connection");
const db = new SequelizeDB();
const Users = db.conexion.define("Users",
  {
    FirstName: {
      type: DataTypes.STRING(100),
    },
    LastNmame: {
      type: DataTypes.STRING(100),
    },
    Password: {
        type: DataTypes.STRING(250),
    },
    Antecedentes_congenitos: {
      type:DataTypes.STRING(250),
    },
    Antecedentes_familiares: {
      type:DataTypes.STRING(250),
    },
    ImgProfile: {
        type: DataTypes.STRING(250),
    },
    Birthday: {
        type: DataTypes.DATE,
    },
    Identifier: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Role: {
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
    tablename: "Users",
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

module.exports = Users;