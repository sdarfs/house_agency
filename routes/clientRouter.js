const express = require("express");
const { getFindPage, find } = require("../controllers/ClientController");
const isAuth = require("../middlewares/isAuth");
const isWorker = require("../middlewares/isWorker");
const clientRouter = express.Router();

clientRouter.get('/find',isAuth ,isWorker,  getFindPage);
clientRouter.post('/find',isAuth,isWorker ,find);
module.exports = clientRouter;