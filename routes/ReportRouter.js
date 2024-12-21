const express = require("express");
const { getReportPage, postReport } = require("../controllers/ReportController");
const isAuth = require("../middlewares/isAuth");
const isWorker = require("../middlewares/isWorker");
const ReportRouter = express.Router();


ReportRouter.get('/',isAuth ,isWorker,  getReportPage);
// Обработчик для генерации и выгрузки отчета
ReportRouter.post('/export-client-report',isAuth ,isWorker,  postReport);

// Запуск сервера
module.exports = ReportRouter