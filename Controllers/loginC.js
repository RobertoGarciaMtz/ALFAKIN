const usuariostabla = require('../Models/User.model');
const {validarContrasena} = require("../utils/UtilsPassword.js");
const {crearToken} = require("../utils/tokenUtils.js");
const consultastabla = require('../models/Consultas.model');
const { Sequelize } = require('sequelize');
const gastostabla = require('../models/Pagos.model');
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
  const month = moment().format('MM');
  const meses = {
    '01': moment().format('Enero-YYYY'),
    '02': moment().format('Febrero-YYYY'),
    '03': moment().format('Marzo-YYYY'),
    '04': moment().format('Abril-YYYY'),
    '05': moment().format('Mayo-YYYY'),
    '06': moment().format('Junio-YYYY'),
    '07': moment().format('Julio-YYYY'),
    '08': moment().format('Agosto-YYYY'),
    '09': moment().format('Septiembre-YYYY'),
    '10': moment().format('Octubre-YYYY'),
    '11': moment().format('Noviembre-YYYY'),
    '12': moment().format('Diciembre-YYYY'),
  };
  const fecha = meses[month];
  console.log(fecha);
  return res.render('Dashboard',{fecha});
}

exports.resumeView = async (req,res,next) => {
  
  /*const mostconsultation = await consultastabla.findAll({
    attibutes:['id_usuario',
      [Sequelize.fn('COUNT', Sequelize.col('id_usuario')), 'count']
    ],
    group: 'id_usuario'
    }
  );*/
  //const mostmoney = await gastostabla.findAll({});
  return res.render('/Pagos/Indicadores');
}

exports.economyView = async (req,res,next) =>{

  return res.render();
}