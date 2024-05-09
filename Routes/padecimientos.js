const path = require('path');
const express = require('express');
const padecimientosController = require("../Controllers/padecimientosC");
const router = express.Router();

router.get('/:padecimientosId',padecimientosController.padecimientoById);


module.exports = router;