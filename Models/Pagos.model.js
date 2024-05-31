const {DataTypes} = require("sequelize");
const SequelizeDB = require("./connection");
const db = new SequelizeDB();
//const SequelizeDB = require("./connection");
const Pagos = db.conexion.define("Pagos",
  {
    id_pago: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.FLOAT
    },
    pagado: {
      type: DataTypes.BOOLEAN
    },
    atendidopor: {
      type: DataTypes.STRING(200)
    }
  },
  {
    tablename: "Pagos",
    // underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

db.conexion.sync()
  .then(() => {
    console.log('Pagos model synchronized with database.');
  })
  .catch(error => {
    console.error('Error synchronizing Pagos model with database:', error);
  });

module.exports = Pagos;