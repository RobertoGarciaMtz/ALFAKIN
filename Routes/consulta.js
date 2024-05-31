const path = require('path');
const express = require('express');
const consultaController = require("../Controllers/consultaC");
const router = express.Router();

router.get('/crearconsultaV/:userId',consultaController.registrarConsultaVista);
router.get('/:userId',consultaController.consultaConUsuario);
router.post('/',consultaController.crearConsultaPadacimiento);
router.put('/:padecimientoId',consultaController.editarDatosConsultaPorUsuario);
router.delete('/:consultaId',consultaController.eliminarConsultaPorId);
/*router.post('/createconsultaM',userController.registerusersMethod);
router.get('/consultaList',userController.usersListView);
router.get('/consultaUser/:userId',userController.findUserbyId);*/

module.exports = router;