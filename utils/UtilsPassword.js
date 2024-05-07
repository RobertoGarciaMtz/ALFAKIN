const bcrypt = require("bcrypt");

const SALT = parseInt(process.env.SALT) || 10; 

async function generarSalt(){
    return bcrypt.genSalt(SALT);
}


const generarContrasena = async (contrasena) => {
    console.log("Se entro al metodo de generar Contrasena");
    return await generarSalt()
    .then(e=> bcrypt.hash(contrasena,e))
    .catch(e=> console.error(`Ha ocurrido un error al momento de generar una contrasena ${e}`));
}

const validarContrasena = async(contrasenaLimpia,contrasenaHash) => {
    console.log("Entro a validar contrasena "+contrasenaHash+"- "+contrasenaLimpia);
    return  bcrypt.compare(contrasenaLimpia, contrasenaHash);
}

module.exports = {
    generarContrasena,
    validarContrasena
}