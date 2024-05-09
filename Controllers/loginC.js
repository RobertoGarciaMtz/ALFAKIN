const asyncHandler = require("express-async-handler");
const usuariostabla = require('../Models/User.model');
const {validarContrasena} = require("../utils/UtilsPassword.js");

exports.loginView =  (req, res, next) => {
    const {err = ""} = req.query; 
    console.log("el error es: "+err);
    res.render('Login',{err});
    return;
  };
  
exports.loginAuth = async (req, res,next) =>{
  const {password,Usuario} = req.body;
  console.log(Usuario);
  const usuarioPosible = await usuariostabla.findOne({
    where: { nombre: Usuario,Rol: "Admin"}
  });
  if(usuarioPosible === null || usuarioPosible === undefined){
    throw new Error("No se encontro ningun usuario con las credenciales dadas");
  }
  
  const checarLogeo =await validarContrasena(password,usuarioPosible.contrasena);

  if(checarLogeo){
    return res.redirect('/utilidades/Dashboard');
  }else{
    return res.redirect("/?err=101")
  }

  
} 

exports.dashboardview = (req,res,next) => {
  
  return res.render('Dashboard');
}