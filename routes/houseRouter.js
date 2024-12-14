const express = require("express");
const houseRouter = express.Router();
const HouseController = require("../controllers/HouseController");
const isAuth = require("../middlewares/isAuth");

houseRouter.post('/new', isAuth, HouseController.postCreateHouse)
houseRouter.get('/new', isAuth, HouseController.createHouse)
houseRouter.get('/:id', isAuth, HouseController.getOneHouse)

module.exports = houseRouter;