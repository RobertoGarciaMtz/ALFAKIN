const asyncHandler = require("express-async-handler");
const padecimientostabla = require('../models/Padecimientos.model');
const pagostabla = require('../models/Pagos.model');
const consultastabla = require('../models/Consultas.model')
const bodyParser = require("body-parser");
const { Op } = require('sequelize');

exports.padecimientoById = async (req,res,next) =>{
  let information = await consultastabla.findByPk(req.params.padecimientosId,
    {
      attributes:['id_consulta','created_at'],
      include:[
      {model: padecimientostabla,
        attributes: ['Razon','Zona_dolor','Comentarios','Recomendaciones','Tratamiento']
      },
      {model: pagostabla,
        attributes: ['cantidad','pagado','tipopago']
      }
    ]}
  );
  if(information.Pago === null) {
      information.dataValues.Pago = {
        cantidad: "0",
        pagado: true,
        tipopago: "Pendiente"
      };
      return await res.render('Padecimientos/PadecimientosbyId',{"information":information,"id":req.query.id});
  }
  return res.render('Padecimientos/PadecimientosbyId',{"information":information,"id":req.query.id});
}