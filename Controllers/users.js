const asyncHandler = require("express-async-handler");

exports.registerusers = asyncHandler(async (req, res, next) => {
    console.log("A ver si logro entrar");
    await res.render('users');
    return;
  });

  
module.exports = userController;