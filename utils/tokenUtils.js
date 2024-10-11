const jwt = require("jsonwebtoken");
const sk = process.env.SECRET_KEY; //le falta el secret key

const crearToken = (payload) => {
    console.log("Se va a crear el token con el payload: "+payload);
    return jwt.sign({"val":payload},sk,{ expiresIn:"4h"}); //aqui para mover tiempo del token
}

const validarTokenJWT = (token) => {jwt.verify(token,sk);}

module.exports = {
    crearToken,
    validarTokenJWT
}