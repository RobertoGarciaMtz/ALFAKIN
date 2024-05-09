const jwt = require("jsonwebtoken");
const sk = process.env.SECRET_KEY;

const crearToken = (payload) => {
    console.log("Se va a crear el token con el payload: "+payload);
    return jwt.sign({"val":payload},sk,{ expiresIn:"2m"});
}

const validarTokenJWT = (token) => {jwt.verify(token,sk);}

module.exports = {
    crearToken,
    validarTokenJWT
}