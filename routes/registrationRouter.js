const express = require("express");
const registrationRouter = express.Router();
const RegistrationController = require("../controllers/RegistrationController");
const isAuth = require("../middlewares/isAuth");
const isWorker = require("../middlewares/isWorker");
const DocumentController = require("../controllers/DocumentController");


registrationRouter.get('/', RegistrationController.getRegistrationPage)

registrationRouter.post('/', RegistrationController.registerClient)

registrationRouter.post('/', RegistrationController.update_settings)


registrationRouter.get('/worker', isAuth, isWorker, RegistrationController.getRegistrationWorkerPage)
registrationRouter.get('/worker', isAuth, isWorker, RegistrationController.getRegistrationWorkerPage)

registrationRouter.post('/worker', isAuth, isWorker, RegistrationController.registerWorker)
registrationRouter.post('/passport', isAuth, isWorker, RegistrationController.registerWorker)


module.exports = registrationRouter;