const express = require('express');
const userController = require("../Controllers/usersC");
const router = express.Router();

router.get('/createuserV',userController.registerusersView);
router.post('/createuserM',userController.registerusersMethod);
router.get('/usersList',userController.usersListView);
router.get('/userbyId/:userId',userController.findUserbyId);
router.get('/userNewOld',userController.userViewNO);
router.put('/editarUsuario/:userId',userController.editarUsuario);
router.delete('/eliminarUsuario/:userId',userController.eliminarUsuario);
module.exports = router;