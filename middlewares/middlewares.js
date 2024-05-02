const {Request,Response} = require("express");

/**
 * 
 * @param {Request} req 
 * @param {*} res 
 * @param {*} next 
 */
const validarToken = function(req,res,next){
    const {authorization} = req.headers;
    if(req.path !== "/"){
        if(authorization == undefined){
            console.error("Aqui debe ejecutarse el error de que no se debe continuar porque no se cuenta con token");
            //throw new Error("La peticion no cuenta con token de autorizacion");
        }
    }
    next();
}

module.exports = {
    validarToken
}