const asyncHandler = require("express-async-handler");
const usuariostabla = require('../Models/User.model');
const {validarContrasena} = require("../utils/UtilsPassword.js");
const {crearToken} = require("../utils/tokenUtils.js");

exports.loginView =  (req, res, next) => {
    const {err = ""} = req.query; 
    console.log("el error es: "+err);
    res.render('Login',{err});
    return;
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
    return res.redirect("/?err=101")
  }
  return res.redirect('/utilidades/Dashboard');
  
} 

exports.dashboardview = (req,res,next) => {
  
  return res.render('Dashboard');
}