const asyncHandler = require("express-async-handler");
const usuariostabla = require('../models/User.model');
const consultastabla = require('../models/Consultas.model');
const padecimientostabla = require('../models/Padecimientos.model');

exports.registrarConsultaVista = async (req, res, next) => {
  const  User = await usuariostabla.findByPk("a398e518-8603-4593-bf55-f14e80ec356d");
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
  
  if(user == undefined){
    throw new Error("el usuario no ha sido definido");
  }

  const consultasList = await usuariostabla.findAll({
    where:{
      id_usuario: user
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

  res.json(consultasList);
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
  fechaSesion = new Date(fechaSesion);
  
  const nuevaConsulta = await consultastabla.create({
    fecha_sesion: fechaSesion,
    tipo_cita: req.body.tipoCita,
    tipo_tratamiento: req.body.tipoTratamiento,
    id_consulta_usuario: user,
    id_padecimiento_consulta: nuevoPadecimiento.id_padecimiento
  });

  res.json(nuevaConsulta);

};