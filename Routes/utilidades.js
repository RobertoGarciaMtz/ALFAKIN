const loginController = require("../Controllers/loginC");
const express = require("express");
const router = express.Router();

router.post('/authmethod',loginController.loginAuth);
router.get('/dashboard',loginController.dashboardview);
router.get('/realdashboard',loginController.resumeView);
router.get('/economyView',loginController.economyView);

module.exports = router;