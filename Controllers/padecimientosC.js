const asyncHandler = require("express-async-handler");
const padecimientostabla = require('../models/Padecimientos.model');
const bodyParser = require("body-parser");
const { Op } = require('sequelize');

exports.padecimientoById = async (req,res,next) =>{
    const padecimientoSpec = await padecimientostabla.findByPk(req.params.padecimientosId);
  res.render('Padecimientos/PadecimientosbyId',{padecimientoSpec});
}