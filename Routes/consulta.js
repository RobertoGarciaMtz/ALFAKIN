const path = require('path');
const express = require('express');
const consultaController = require("../Controllers/consultaC");
const router = express.Router();

router.get('/crearconsultaV',consultaController.registrarConsultaVista);
router.get('/',consultaController.consultaConUsuario)
/*router.post('/createconsultaM',userController.registerusersMethod);
router.get('/consultaList',userController.usersListView);
router.get('/consultaUser/:userId',userController.findUserbyId);*/

module.exports = router;