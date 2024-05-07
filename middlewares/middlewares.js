const {Request,Response} = require("express");

/**
 * 
 * @param {Request} req 
 * @param {*} res 
 * @param {*} next 
 */
const validarToken = function(req,res,next){
    const {authorization} = req.headers;
    console.log("El path que se visita es: "+req.path);
    if(req.path !== "/"){
        if(authorization == undefined){
            console.error("Aqui debe ejecutarse el error de que no se debe continuar porque no se cuenta con token");
            //throw new Error("La peticion no cuenta con token de autorizacion");
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