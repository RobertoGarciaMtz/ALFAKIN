const express = require('express');
const userController = require("../Controllers/usersC");
const router = express.Router();

router.get('/createuserV',userController.registerusersView);
router.post('/createuserM',userController.registerusersMethod);
router.get('/usersList',userController.usersListView);
router.get('/userbyId/:userId',userController.findUserbyId);
router.get('/userNewOld',userController.userViewNO);
router.get('/userbyEditV/:userId',userController.UserEditView);
router.put('/editarUsuario/:userId',userController.editarUsuario);
router.get('/findUserbySpecV',userController.existinguserView);
router.get('/findUserbySpec',userController.searchfilters);
router.post('/crearUsuarioMedico',userController.crearUsuarioMedico);
router.get('/crearUsuarioMedicoV',userController.crearUsuarioMedicoV);
router.delete('/eliminarUsuario/:userId',userController.eliminarUsuario);
module.exports = router;