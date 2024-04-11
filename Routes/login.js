const { Router } = require('express');
const loginController = require("../Controllers/loginC");
const router = Router();

router.get('/',loginController.loginView);

module.exports = router;