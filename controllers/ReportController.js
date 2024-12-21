// ReportController.js
const XLSX = require('xlsx');
const path = require('path');
const { getRep } = require("../models/ReportModel");

class ReportController {
    static async getReportPage(req, res) {
        res.render('pages/reports', { title: "Отчетность", isWorker: req.session.isWorker });
    }

    static async postReport(req, res) {
        const { startDate, endDate } = req.body;

        // Получаем данные из базы данных
        const reports = await getRep();

        // Подготовка данных для XLSX
        const data = reports.map(report => ({
            Фамилия: report.surname,
            Имя: report.name,
            Отчество: report.secondName,
            Почта: report.email,
            Запросы: report.address,
            Стоимость: report.cost,
            Цель_запроса: report.purpose,
            Номер_запроса: report.reqnumber
        }));

        // Создание рабочей книги и листа
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Добавление листа в книгу
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчет');

        // Генерация имени файла
        const filePath = path.join(__dirname, '../reports/report.xlsx');

        // Запись файла
        XLSX.writeFile(workbook, filePath);

        // Отправка файла пользователю
        res.download(filePath, 'report.xlsx', (err) => {
            if (err) {
                console.error("Ошибка при отправке файла:", err);
                res.status(500).send("Ошибка при отправке файла");
            }
        });
    }
}

module.exports = ReportController;
