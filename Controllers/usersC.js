const asyncHandler = require("express-async-handler");

exports.registerusersView =  (req, res, next) => {
    res.render('Users/UserCreate');
    return;
  };

exports.registerusersMethod = async (req,res,next) =>{
  try{
    let hashedpassword = req.body.password;
  } catch(err){
    return res.json({Message: "Ha habido un problema en la creacion del usuario"});
  }
  return;
};

exports.usersListView = async (req, res, next) => {
  await res.render('Users/UserList');
  return;
};
  