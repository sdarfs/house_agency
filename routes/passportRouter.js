const express = require("express");
const passportRouter = express.Router();
const PassportController = require("../controllers/PassportController");
const isAuth = require("../middlewares/isAuth");

//passportRouter.post('/new', isAuth, PassportController.postCreateHouse)
//passportRouter.get('/new', isAuth, PassportController.createHouse)

module.exports = passportRouter;