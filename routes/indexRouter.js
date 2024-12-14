const express = require("express");
const indexRouter = express.Router();
const RequestController = require("../controllers/RequestController");
const isAuth = require("../middlewares/isAuth");

indexRouter.get('/', isAuth, RequestController.getMyRequests)

module.exports = indexRouter;