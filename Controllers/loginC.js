const usuariostabla = require('../Models/User.model');
const {validarContrasena} = require("../utils/UtilsPassword.js");
const {crearToken} = require("../utils/tokenUtils.js");
const consultastabla = require('../models/Consultas.model');
const moment = require('moment');

exports.loginView =  (req, res, next) => {
    const {err = ""} = req.query; 
    console.log("el error es: "+err);
    res.render('Login',{err});
  };
  
/**
 * 
 * @param {*} req 
 * @param {import("express").Response} res 
 * @param {*} next 
 * @returns 
 */
exports.loginAuth = async (req, res,next) =>{
  const {password,Usuario} = req.body;
  console.log(Usuario);
  const usuarioPosible = await usuariostabla.findOne({where: { nombre: Usuario,Rol: "Admin"}});

  if(usuarioPosible === null || usuarioPosible === undefined){
    throw new Error("No se encontro ningun usuario con las credenciales dadas");
  }
  
  const checarLogeo =await validarContrasena(password,usuarioPosible.contrasena);

  if(checarLogeo){
    const token = crearToken(usuarioPosible.id_usuario);
  
  }else{
    res.redirect("/?err=101")
  }
  res.redirect('/utilidades/Dashboard');
  
} 

exports.dashboardview =  async (req,res,next) => {
  let fecha;
  const day = moment().format('MM');
  switch (day) {
    case '01':
      fecha = moment().format('Enero-YYYY');
      break;
    case '02':
      fecha = moment().format('Febrero-YYYY');
      break;
    case '03':
      fecha = moment().format('Marzo-YYYY');
      break;
    case '04':
      fecha = moment().format('Abril-YYYY');
      break;
    case '05':
      fecha = moment().format('Mayo-YYYY');
      break;
    case '06':
      fecha = moment().format('Junio-YYYY');
      break;
    case '07':
      fecha = moment().format('Julio-YYYY');
      break;
    case '08':
      fecha = moment().format('Agosto-YYYY');
      break;
    case '09':
      fecha = moment().format('Septiembre-YYYY');
      break
    case '10':
      fecha = moment().format('Octubre-YYYY');
      break;
    case '11':
      fecha = moment().format('Noviembre-YYYY');
      break;
    case '12':
      fecha = moment().format('Diciembre-YYYY');
      break;
    default:
      dayName = 'Desconocido';
  }
  return res.render('Dashboard',{Fecha:fecha});
}