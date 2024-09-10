const usuariostabla = require('../Models/User.model');
const {validarContrasena} = require("../utils/UtilsPassword.js");
const {crearToken} = require("../utils/tokenUtils.js");
const consultastabla = require('../models/Consultas.model');
const { Sequelize, Op } = require('sequelize');
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
  const usuarioPosible = await usuariostabla.findOne({where: { nombre: Usuario,Rol: {[Op.or]:["Admin","Medico"]} }});

  if(usuarioPosible === null || usuarioPosible === undefined){
    throw new Error("No se encontro ningun usuario con las credenciales dadas");
  }
  
  const checarLogeo =await validarContrasena(password,usuarioPosible.contrasena);

  if(checarLogeo){
    const token = crearToken(usuarioPosible.id_usuario);
    usuarioPosible.HashedKey = token;
    await usuarioPosible.save({fields:["HashedKey"]});
  }else{
    res.redirect("/?err=101")
  }
  await res.redirect('/utilidades/Dashboard?id='+usuarioPosible.id_usuario);
  
} 

exports.dashboardview =  async (req,res,next) => {
  const id = req.query.id;
  console.log(id);
  const month = moment().format('MM');
  const meses = {
    '01': 'Enero -' + moment().format('YYYY'),
    '02': 'Febrero -' + moment().format('YYYY'),
    '03': 'Marzo -' + moment().format('YYYY'),
    '04': 'Abril -' + moment().format('YYYY'),
    '05': 'Mayo -' + moment().format('YYYY'),
    '06': 'Junio -' +moment().format('YYYY'),
    '07': 'Julio -' + moment().format('YYYY'),
    '08': 'Agosto -' + moment().format('YYYY'),
    '09': 'Septiembre -' + moment().format('YYYY'),
    '10': 'Octubre -' + moment().format('YYYY'),
    '11': 'Noviembre -' + moment().format('YYYY'),
    '12': 'Diciembre -' + moment().format('YYYY'),
  };
  const fecha = meses[month];
  return res.render('Dashboard',{fecha,id});
}

exports.resumeView = async (req,res,next) => {
  let idUsuario = req.query.id;
  let fechainicial, fechafinal;
  const mostconsultation = await consultastabla.findAll({
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('id_consulta_usuario')), 'id_consulta_usuario'] // Contar los registros de la tabla Post
    ],
    include: [{
      model: usuariostabla, // Hacemos el JOIN con la tabla Post
      attributes:['nombre','apellido_paterno','apellido_materno']
    }],
    group: ['id_consulta_usuario'], // Agrupar por el ID del usuario
  });
  const totalconsultas = await consultastabla.count();
  const totalmoney = await gastostabla.findAll(
    {
      attributes: 
      [
        [Sequelize.fn('Sum',Sequelize.col('cantidad')),'total']
      ]
    }
  );

  const finalbody = {
    mostusers: mostconsultation,
    totalconsultas: totalconsultas,
    dinerototal: totalmoney[0].dataValues.total
  };
  return await res.render('Pagos/Indicadores',{finalbody,"id":idUsuario});
}

exports.economyView = async (req,res,next) =>{
  
  return res.render();
}