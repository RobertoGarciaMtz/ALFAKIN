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

exports.consultaConUsuario = async(req,res,next) => {
  const staticUsuarios = "e54ac272-07ec-11ef-9586-b00cd1a375ba";
  const vuelta = 0;
  const consultasList = await usuariostabla.findAll({
    where:{
      id_usuario: staticUsuarios
    },
    limit: 10,
    offset: 10*vuelta,
    include: [{
      model: consultastabla,
      include:{
        model: padecimientostabla
      }
    }]
  });

  res.json(consultasList);
};