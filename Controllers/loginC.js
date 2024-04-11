const asyncHandler = require("express-async-handler");

exports.loginView =  (req, res, next) => {
    res.render('Login');
    return;
  };
  