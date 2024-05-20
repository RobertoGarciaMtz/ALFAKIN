const usuariostabla = require('../models/User.model');
const consultastabla = require('../models/Consultas.model');
const {generarContrasena} = require("../utils/UtilsPassword.js");
const { Op } = require('sequelize');
const {calculateAge} = require("../utils/FuncionesUtils.js");

exports.userViewNO = (req,res,next) =>{
  res.render('Users/NewOldUser');
  return;
}

exports.registerusersView =  (req, res, next) => {
    res.render('Users/UserCreate');
    return;
  };

exports.registerusersMethod = async (req,res,next) =>{
  try{
    const contrasena = await generarContrasena("contrasena");
    await usuariostabla.create({
      nombre: req.body.nombre,
      apellido_paterno:  req.body.apellido_paterno,
      apellido_materno:  req.body.apellido_materno,
      antecedentes_congenitos:  req.body.antecedentes_congenitos,
      antecedentes_familiares:  req.body.antecedentes_familiares,
      fecha_nacimiento: req.body.fecha_nacimiento,
      Sexo: req.body.Sexo,
      telefono: req.body.telefono,
      Rol: "Client",
      contrasena
    });

    return res.redirect('usersList');
  } catch(err){
    console.log(err)
    return res.json({Message: "Ha habido un problema en la creacion del usuario"});
  }
};

exports.eliminarUsuario = async (req,res,next) => {
  const idUsuario = req.params.userId;
  console.log(idUsuario);
  const entidadUsuario = await usuariostabla.findOne({
    where:{
      id_usuario: idUsuario
    },
    include:[{
      model: consultastabla
    }]
  });

  if(entidadUsuario === null || entidadUsuario.Consultas.length > 0){
    console.log("No se puede eliminar el registro ya que no existe o tiene consultas");
    res.status(404).json({"msg":"No se puede eliminar el registro ya que no existe o tiene consultas"});
    return;
  }
  await entidadUsuario.destroy();
  res.status(200).json({"msg":"El registro se elimino correctamente"});
}

exports.UserEditView = async (req,res,next) =>{
  const idUsuario = req.params.userId;
  const entidadUsuario = await usuariostabla.findByPk(idUsuario);
  if(entidadUsuario === null){
    return res.status(404).json({"razon":"No se encontro el recurso "+idUsuario});
  }
  return  await res.render('Users/UserEdit',{entidadUsuario});
}

exports.editarUsuario = async (req,res,next) => {
console.log("No entra este pedo");
    const idUsuario = req.params.userId;

    const entidadUsuario = await usuariostabla.findByPk(idUsuario);

    if(entidadUsuario === null){
      return res.status(404).json({"razon":"No se encontro el recurso "+idUsuario});
    }

    const {nombre,apellido_paterno,apellido_materno,antecedentes_congenitos,antecedentes_familiares,fecha_nacimiento,telefono} = req.body;

    entidadUsuario.nombre = nombre;
    entidadUsuario.apellido_materno = apellido_materno;
    entidadUsuario.apellido_paterno = apellido_paterno;
    entidadUsuario.antecedentes_congenitos = antecedentes_congenitos;
    entidadUsuario.antecedentes_familiares = antecedentes_familiares;
    entidadUsuario.telefono = telefono;
    entidadUsuario.fecha_nacimiento = new Date(fecha_nacimiento);

    await entidadUsuario.save({fields:["nombre","apellido_materno","apellido_paterno"
    ,"antecedentes_congenitos","antecedentes_familiares","fecha_nacimiento"]});

    return res.status(200).json({"mensaje":"El registro ha sido actualizado correctamente"});

}

exports.usersListView = async (req, res, next) => {
  const usersList = await usuariostabla.findAll({
    where: {
      [Op.or]: [
        { Rol: "Client" },
        { Rol: "Fisioterapeuta" },
      ]
    },
  }
  );
  const max = usersList.length;
  for (let index = 0; index < max; index++) {
    const Edad = calculateAge(usersList[index].fecha_nacimiento);
    usersList[index].Edad = Edad;
  }
  await res.render('Users/UserList',{user:usersList});
  return;
};
  
exports.findUserbyId = async (req,res,next) => {
  const User = await usuariostabla.findByPk(req.params.userId,
    {attributes: {exclude:['created_at','updated_at','Password','ImgProfile','Rol']}}
  );
  const Edad = calculateAge(User.fecha_nacimiento);
  User.Edad = Edad;
  await res.render('Users/UserbyId',{User});
  return;
};