const {Request,Response} = require("express");
const {validarTokenJWT} = require("../utils/tokenUtils.js");
const usuariostabla = require('../models/User.model');

const whiteList = [
    "/",
    "/utilidades/authmethod",
    "/favicon.ico",
    "/LOGO_ALFAKINE.webp",
    "/usuarios/users.css",
    "/usuarios/LOGO_ALFAKINE.webp",
    "/consultas/LOGO_ALFAKINE.webp",
    "/css/edit-user.css"
];

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
const validarToken = async function(req,res,next) {
    let pass = true;
    let idUsuario = req.query.id;
    if(whiteList.find(e=> e === req.path) != undefined){
        next();
        return;
    }else{
        console.log("ruta a la cual se esta accediendo"+req.path);
        if(idUsuario === undefined){
            res.redirect("/?err=103");
            pass = false;
        }else{
            const entidadUsuario = await usuariostabla.findByPk(idUsuario);
            if(entidadUsuario === undefined || entidadUsuario === null){
                console.error("La entidad que se intento buscar no existe");
                res.redirect("/?err=103");
                pass = false;
            }
            try{
            validarTokenJWT(entidadUsuario.HashedKey);   
            }catch(error){
                pass = false;
                console.error(error);
                res.redirect("/?err=102");
            }
        }        
    }
    if(pass){
        next();
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
const addHeaders = function(req,res,next){
    res.locals.layout = 'header';
    next();
}

module.exports = {
    validarToken,
    addHeaders
}