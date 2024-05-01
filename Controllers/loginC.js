const asyncHandler = require("express-async-handler");
//const bcrypt  = require("bycrpt");
const usuariostabla = require('../Models/User.model');

exports.loginView =  (req, res, next) => {
    res.render('Login');
    return;
  };
  
exports.loginAuth = (req, res,next) =>{
  const contraseña = req.body.password;
  const usuario = req.body.id_usuario;
  return res.redirect('/utilidades/Dashboard');
}

exports.dashboardview = (req,res,next) => {
  
  return res.render('Dashboard');
}