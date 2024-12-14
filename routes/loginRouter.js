const express = require("express");
const loginRouter = express.Router();
const LoginController = require("../controllers/LoginController");

loginRouter.get('/', LoginController.getLoginPage)

loginRouter.post('/', LoginController.login)

module.exports = loginRouter;