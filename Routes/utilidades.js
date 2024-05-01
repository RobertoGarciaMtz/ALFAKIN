const loginController = require("../Controllers/loginC");
const express = require("express");
const router = express.Router();

router.post('/authmethod',loginController.loginAuth);
router.get('/dashboard',loginController.dashboardview);

module.exports = router;