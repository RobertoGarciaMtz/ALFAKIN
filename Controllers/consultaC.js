const usuariostabla = require('../models/User.model');
const consultastabla = require('../models/Consultas.model');
const padecimientostabla = require('../models/Padecimientos.model');
const {calculateAge} = require("../utils/FuncionesUtils.js");
const moment = require('moment');
const { Op } = require('sequelize');

exports.registrarConsultaVista = async (req, res, next) => {
  
  if (req.params.userId == null || req.params.userId == undefined){
    const  User = await usuariostabla.findOne({where:{
      Rol: "Admin"
    }});
    return await res.render('Consulta/ConsultaCreate',{User});
  }
  else {
    try{
      const userId = req.params.userId;
    const  User = await usuariostabla.findByPk(userId);
    return await res.render('Consulta/ConsultaCreate',{User});
    } catch (Error){
      console.log(Error);
    }  
  }
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
  // TERMINAR PARA QUE MUESTRE EL MENSAJE
  res.status(200).json({"mensaje":"El registro se ha eliminado correctamente"});
  return;
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
      order: [
        ['fecha_sesion', 'ASC'],
      ],
      include:{
        model: padecimientostabla,
      }
    }]
  });
  //console.log(consultasList[0].fecha_nacimiento);
  //consultasList[0].Edad = await calculateAge(consultasList[0].fecha_nacimiento);
   await res.render("consulta/ConsultaUserList",{consultasList:consultasList[0]});
   return;
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
  return await res.redirect('/consultas/'+req.body.id_usuario);
  res.json(nuevaConsulta);
};


exports.consultaPorDia = async (req,res,next) => {
  const dia = req.params.diaId;
  const startOfday = moment().format('YYYY-MM-'+dia+' 00:10');
  const endOfday   = moment().format('YYYY-MM-'+dia+' 23:50');
  const listaConsultas = await consultastabla.findAll({
    where: {
      fecha_sesion: { [Op.between]: [startOfday, endOfday] }
    },
    attributes: ['fecha_sesion','tipo_cita'],
    order: [
      ['fecha_sesion', 'DESC'],
  ],
  });  
  return  await res.render('consulta/ConsultaByDay',{listaConsultas});
}