const asyncHandler = require("express-async-handler");
const usuariostabla = require('../Models/User.model');
const bodyParser = require("body-parser");

exports.registerusersView =  (req, res, next) => {
    res.render('Users/UserCreate');
    return;
  };

exports.registerusersMethod = async (req,res,next) =>{
  try{
    
    const newUser = await usuariostabla.create({
      nombre: req.body.nombre,
      apellido_paterno:  req.body.apellido_paterno,
      apellido_materno:  req.body.apellido_materno,
      antecedentes_congenitos:  req.body.antecedentes_congenitos,
      antecedentes_familiares:  req.body.antecedentes_familiares,
      fecha_nacimiento: req.body.fecha_nacimiento,
      Sexo: req.body.Sexo,
      Rol: "Client",
    });

    return res.redirect('usersList');
  } catch(err){
    console.log(err)
    return res.json({Message: "Ha habido un problema en la creacion del usuario"});
  }
};

exports.usersListView = async (req, res, next) => {
  const usersList = await usuariostabla.findAll();
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
    {attributes: {exclude:['created_at','updated_at','Password','ImgProfile','Identifier','Role']}}
  );
  const Edad = calculateAge(User.fecha_nacimiento);
  User.Edad = Edad;
  await res.render('Users/UserbyId',{User});
  return;
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