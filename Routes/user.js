const express = require('express');
const userController = require("../Controllers/usersC");
const router = express.Router();

router.get('/createuserV',userController.registerusersView);
router.post('/createuserM',userController.registerusersMethod);
router.get('/usersList',userController.usersListView);

module.exports = router;