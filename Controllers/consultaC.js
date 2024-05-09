const asyncHandler = require("express-async-handler");
const usuariostabla = require('../models/User.model');
const consultastabla = require('../models/Consultas.model');
const padecimientostabla = require('../models/Padecimientos.model');

exports.registrarConsultaVista = async (req, res, next) => {
  const  User = await usuariostabla.findByPk("2a5d9c10-58b5-4c31-8556-7a5bbc21e5e8");
    res.render('Consulta/ConsultaCreate',{User});
    return;
  };

exports.usersListView = async (req, res, next) => {
  const usersList = await usuariostabla.findAll();
  const max = usersList.length;
  for (let index = 0; index < max; index++) {
    const age = calculateAge(usersList[index].Birthday);
    usersList[index].Age = age;
  }
  await res.render('Users/UserList',{user:usersList});
  return;
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.consultaConUsuario = async(req,res,next) => {
  let {pagina = 1, user} = req.query;
  pagina--;
  
  if(req.params.userId == undefined){
    throw new Error("No ha llegado el dato correcto");
  }

  const consultasList = await usuariostabla.findAll({
    where:{
      id_usuario: req.params.userId,
    },
    limit: 10,
    offset: 10*pagina,
    include: [{
      model: consultastabla,
      include:{
        model: padecimientostabla
      }
    }]
  });
  const Edad = calculateAge(consultasList[0].fecha_nacimiento);
  consultasList[0].Edad = Edad;
  //res.json(consultasList);
  return res.render("consulta/ConsultaUserList",{consultasList:consultasList[0]});
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.crearConsultaPadacimiento = async(req,res,next) => {
  let {user} = req.query;

  const nuevoPadecimiento = await padecimientostabla.create({
    Razon: req.body.razon,
    Zona_dolor: req.body.zdolor,
    Comentarios: req.body.comentarios,
    Recomendaciones: req.body.recomendaciones,
    Tratamiento:req.body.tratamiento
  });

  if(nuevoPadecimiento == undefined){
    throw new Error("No se pudo crear el nuevo padecimiento");
  }

   let {fechaSesion} = req.body;
   fechaSesion = new Date();
  const nuevaConsulta = await consultastabla.create({
    fecha_sesion: fechaSesion,
    tipo_cita: req.body.tipoCita,
    tipo_tratamiento: req.body.tipoTratamiento,
    id_consulta_usuario: req.body.id_usuario,
    id_padecimiento_consulta: nuevoPadecimiento.id_padecimiento
  });

  res.json(nuevaConsulta);

};

function calculateAge(birthDate = new Date() ){
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  if (currentDate.getMonth() < birthDate.getMonth() || 
     (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}