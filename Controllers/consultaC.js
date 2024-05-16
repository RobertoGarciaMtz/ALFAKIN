const usuariostabla = require('../models/User.model');
const consultastabla = require('../models/Consultas.model');
const padecimientostabla = require('../models/Padecimientos.model');
const {calculateAge} = require("../utils/FuncionesUtils.js");

exports.registrarConsultaVista = async (req, res, next) => {
  const  User = await usuariostabla.findByPk("2a5d9c10-58b5-4c31-8556-7a5bbc21e5e8");
    res.render('Consulta/ConsultaCreate',{User});
  };


exports.eliminarConsultaPorId = async (req,res,next)=> {
  const consultaId = req.params.consultaId;

  const entidadConsulta = await consultastabla.findByPk(consultaId);

  if(entidadConsulta === null){
    res.status(404).json({"razon":"No se encontro el recurso "+consultaId});
    return;
  }

  const entidadPadecimiento = await padecimientostabla.findByPk(entidadConsulta.id_padecimiento_consulta);

  await entidadConsulta.destroy();
  await entidadPadecimiento.destroy();
  
  res.status(200).json({"mensaje":"El registro se ha eliminado correctamente"});

}

exports.editarDatosConsultaPorUsuario = async (req,res,next) => {
  const padecimientoId = req.params.padecimientoId;

  const {razon,zdolor,comentarios,recomendaciones,tratamiento,fechaSesion = new Date(),tipoCita,tipoTratamiento} = req.body;

  //Aqui se tendra que validar cualquier cosa, a discutir aun con Beto

  const entidadPadecimiento = await padecimientostabla.findByPk(padecimientoId);
  const entidadConsulta = await consultastabla.findOne({where:{id_padecimiento_consulta: padecimientoId}});

  if(entidadPadecimiento === null || entidadConsulta === null){
     res.status(404).json({"razon":"No se encontro el recurso "+padecimientoId});
     return;
  }

  entidadPadecimiento.Razon = razon;
  entidadPadecimiento.Zona_dolor = zdolor;
  entidadPadecimiento.Comentarios = comentarios;
  entidadPadecimiento.Recomendaciones = recomendaciones;
  entidadPadecimiento.Tratamiento = tratamiento;
  
  await entidadPadecimiento.save({fields:["Razon","Zona_dolor","Comentarios","Recomendaciones","Tratamiento"]})

  entidadConsulta.tipo_cita = tipoCita;
  entidadConsulta.tipo_tratamiento = tipoTratamiento;
  entidadConsulta.fecha_sesion = fechaSesion;

  await entidadConsulta.save({fields:["tipo_cita","tipo_tratamiento","fecha_sesion"]});

  res.status(200).json({"mensaje":"El registro ha sido actualizado correctamente"});
}

exports.usersListView = async (req, res, next) => {
  const usersList = await usuariostabla.findAll();
  const max = usersList.length;
  for (let index = 0; index < max; index++) {
    const age = calculateAge(usersList[index].Birthday);
    usersList[index].Age = age;
  }
  await res.render('Users/UserList',{user:usersList});
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
exports.consultaConUsuario = async(req,res,next) => {
  let {pagina = 1} = req.query;
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
  consultasList[0].Edad = calculateAge(consultasList[0].fecha_nacimiento);
  res.render("consulta/ConsultaUserList",{consultasList:consultasList[0]});
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

  if(nuevoPadecimiento === undefined){
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