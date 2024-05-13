const {Request,Response} = require("express");
const {validarTokenJWT} = require("../utils/tokenUtils.js");
const whiteList = ["/","/utilidades/authmethod"];
/**
 * 
 * @param {Request} req 
 * @param {*} res 
 * @param {*} next 
 */
const validarToken = function(req,res,next){
    const {authorization} = req.headers;
    console.log("El path que se visita es: "+req.path);
    const pathActual = whiteList.find(e=> e.localeCompare(req.path));
    if(pathActual === undefined){
        if(authorization === undefined){
            console.error("Aqui debe ejecutarse el error de que no se debe continuar porque no se cuenta con token");
             //throw new Error("La peticion no cuenta con token de autorizacion");
        }else{
            // const tokendata = validarTokenJWT(authorization);   
        }
    }
    next();
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