const {sequelize, DataTypes} = require("sequelize");
const SequelizeDB = require("../Config/sequelize");
const UsersP = SequelizeDB.define("UsersP",
  {
    FirstName: {
      type: DataTypes.STRING(100),
    },
    LastName: {
      type: DataTypes.STRING(100),
    },
    Password: {
        type: DataTypes.STRING(250),
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
    }
  },
  {
    tablename: "Users",
    // underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Users;