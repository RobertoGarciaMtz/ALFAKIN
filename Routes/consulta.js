const path = require('path');
const express = require('express');
const userController = require("../Controllers/consultaC");
const router = express.Router();

router.get('/crearconsultaV',userController.registrarConsultaVista);
/*router.post('/createconsultaM',userController.registerusersMethod);
router.get('/consultaList',userController.usersListView);
router.get('/consultaUser/:userId',userController.findUserbyId);*/

module.exports = router;