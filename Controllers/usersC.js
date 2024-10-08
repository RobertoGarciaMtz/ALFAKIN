const usuariostabla = require('../models/User.model');
const consultastabla = require('../models/Consultas.model');
const {generarContrasena} = require("../utils/UtilsPassword.js");
const { Op } = require('sequelize');
const {calculateAge} = require("../utils/FuncionesUtils.js");

exports.userViewNO = (req,res,next) =>{
  let idUsuario = req.query.id;
  res.render('Users/NewOldUser',{"id":idUsuario});
  return;
}

exports.registerusersView =  (req, res, next) => {
    let idUsuario = req.query.id;
    res.render('Users/UserCreate',{"id":idUsuario});
    return;
  };

exports.registerusersMethod = async (req,res,next) =>{
  try{
    let idUsuario = req.query.id;
    const contrasena = await generarContrasena("contrasena");
    const newUser = await usuariostabla.create({
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

    return res.redirect('usersList?id='+idUsuario);
  } catch(err){
    console.log(err)
    return res.json({Message: "Ha habido un problema en la creacion del usuario"});
  }
};

exports.crearUsuarioMedicoV = async(req,res,next) => {
  try{
    let idUsuario = req.query.id;
    res.render('Users/CreateAdmin',{"id":idUsuario});
    return;
  } catch(err){
    console.log(err)
    return res.json({"msg": "Ha habido un problema en la creacion del usuario"});
  }
}

exports.crearUsuarioMedico = async (req,res,next) =>{
  try{
    let rol;
    const checkadmin = await usuariostabla.findOne({
      where: {
        Rol: "Admin"
      }, attributes: ["Rol"]
    });
    checkadmin === null ? rol = "Admin" : rol = "Medico";
    const contrasena = await generarContrasena(req.body.contrasena);
    await usuariostabla.create({
      nombre: req.body.nombre,
      apellido_paterno:  req.body.apellido_paterno,
      apellido_materno:  req.body.apellido_materno,
      antecedentes_congenitos:  req.body.antecedentes_congenitos,
      antecedentes_familiares:  req.body.antecedentes_familiares,
      fecha_nacimiento: req.body.fecha_nacimiento,
      Sexo: req.body.Sexo,
      telefono: req.body.telefono,
      Rol: "Medico",
      contrasena
    });

    return res.json({"msg":"El registro se ha creado correctamente"});
  } catch(err){
    console.log(err)
    return res.json({"msg": "Ha habido un problema en la creacion del usuario"});
  }
};


exports.eliminarUsuario = async (req,res,next) => {
  const idUsuario = req.params.userId;
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
  return  await res.render('Users/UserEdit',{"entidadUsuario":entidadUsuario,"id":req.query.id});
}

exports.editarUsuario = async (req,res,next) => {
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
    
    return await res.render('Users/UserbyId',{"User":User,"id":req.query.id});
    //return res.status(200).json({"mensaje":"El registro ha sido actualizado correctamente"});

}

exports.existinguserView = async (req,res,next) =>{
  let idUsuario = req.query.id;
  await res.render('Users/ExistingUser',{"id":idUsuario});
  return;
}
exports.searchfilters = async (req,res,next) => {
  const { nombre, apellido_paterno, apellido_materno, telefono } = req.query;
  let toFindre4 = [];
  if(nombre != ""){
    toFindre4.push({ nombre: nombre });
  }
  if(apellido_paterno != ""){
    toFindre4.push({ apellido_paterno: apellido_paterno });
  }
  if(apellido_materno != ""){
    toFindre4.push({ apellido_materno: apellido_materno });
  }
  if(telefono != ""){
    toFindre4.push({ telefono: telefono });
  }
  const usersList = await usuariostabla.findAll({
    where: {
      [Op.and]: toFindre4
    }
  });
  return await res.render('Users/UserList',{user:usersList,"id":req.query.id});
}

exports.usersListView = async (req, res, next) => {
  try{
    let idUsuario = req.query.id;
    let usersList = await usuariostabla.findAll({
      where: {
        [Op.or]: [
          { Rol: "Client" },
          { Rol: "Fisioterapeuta" },
        ]
      },
      order: [
        ['created_at', 'DESC'],
      ],
      limit: 10,
    }
    );
    const max = usersList.length;
    for (let index = 0; index < max; index++) {
      const Edad = calculateAge(usersList[index].fecha_nacimiento);
      usersList[index].Edad = Edad;
    }
    const fullbody = {"user":usersList,"total":100,"id":idUsuario};
    //return res.json(fullbody);
    return await res.render('Users/UserList',{"user":usersList,"id":req.query.id});
  } catch(err){
    console.log(err)
    return res.json({"msg": "Ha habido un problema en la creacion del usuario"});
  }
};
  
exports.findUserbyId = async (req,res,next) => {
  const User = await usuariostabla.findByPk(req.params.userId,
    {attributes: {exclude:['created_at','updated_at','Password','ImgProfile','Rol']}}
  );
  const Edad = calculateAge(User.fecha_nacimiento);
  User.Edad = Edad;
  await res.render('Users/UserbyId',{"User":User,"id":req.query.id});
  return;
};