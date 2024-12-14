const express = require("express");
const requestRouter = express.Router();
const RequestController = require("../controllers/RequestController");
const isAuth = require("../middlewares/isAuth");
const isClient = require("../middlewares/isClient");
const isWorker = require("../middlewares/isWorker");
const DocumentController = require("../controllers/DocumentController");

requestRouter.get('/', isAuth, RequestController.getAllRequests)

requestRouter.get('/new', isAuth, isClient, RequestController.getCreateRequest)

requestRouter.post('/new', isAuth, isClient, RequestController.postCreateRequest)

requestRouter.get('/:id', isAuth, RequestController.getOneRequest)

requestRouter.get('/:id/delete', isAuth, isWorker, RequestController.deleteRequest)

requestRouter.get('/:id/finish', isAuth, isWorker, RequestController.updateFinishRequest)

requestRouter.get('/:id/close', isAuth, isWorker, RequestController.updateCloseRequest)

requestRouter.get('/:id/choose-worker', isAuth, isWorker, RequestController.getUpdateWorkerRequest)

requestRouter.post('/:id/choose-worker', isAuth, isWorker, RequestController.updateWorkerRequest)

requestRouter.get('/:requestId/document/new', isAuth, isWorker, DocumentController.getNewDocument)

requestRouter.post('/:requestId/document/new', isAuth, isWorker, DocumentController.postNewDocument)

requestRouter.get('/:requestId/document/:docId', isAuth, isWorker, DocumentController.getUpdateDocument)

requestRouter.post('/:requestId/document/:docId', isAuth, isWorker, DocumentController.postUpdateDocument)

module.exports = requestRouter;