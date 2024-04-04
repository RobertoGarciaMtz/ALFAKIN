const express = require('express');
const app = express();
const usersController = require("../Controllers/users");

app.get('/getusers',usersController.usersController);

module.exports = router;