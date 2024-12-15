const express = require("express");
const registrationRouter = express.Router();
const RegistrationController = require("../controllers/RegistrationController");
const isAuth = require("../middlewares/isAuth");
const isWorker = require("../middlewares/isWorker");
const DocumentController = require("../controllers/DocumentController");


registrationRouter.get('/', RegistrationController.getRegistrationPage)

registrationRouter.post('/', RegistrationController.registerClient)


registrationRouter.get('/worker', isAuth, isWorker, RegistrationController.getRegistrationWorkerPage)
registrationRouter.get('/worker', isAuth, isWorker, RegistrationController.getRegistrationWorkerPage)

registrationRouter.post('/worker', isAuth, isWorker, RegistrationController.registerWorker)
registrationRouter.post('/passport', isAuth, isWorker, RegistrationController.registerWorker)

// Маршрут для получения страницы настроек пользователя
registrationRouter.get('/settings', isAuth, RegistrationController.getUserSettings);

// Маршрут для обновления данных пользователя
registrationRouter.post('/settings', isAuth, RegistrationController.updateUserSettings);

// Маршрут для получения страницы настроек работника
registrationRouter.get('/settingsWorker', isAuth, isWorker, RegistrationController.getWorkerSettings);

// Маршрут для обновления данных работника
registrationRouter.post('/settingsWorker', isAuth,isWorker, RegistrationController.updateWorkerSettings);


module.exports = registrationRouter;