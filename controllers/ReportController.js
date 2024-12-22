const XLSX = require('xlsx');
const path = require('path');
const { getRep, getCountUsers, request_status, getAverageCost} = require("../models/ReportModel");

class ReportController {
    static async getReportPage(req, res) {
        res.render('pages/reports', { title: "Отчетность", isWorker: req.session.isWorker });
    }

    static async postReport(req, res) {
        const { startDate, endDate } = req.body;

        // Получаем данные из базы данных
        const reports = await getRep();
        const count_user = await getCountUsers(req.body.startDate, req.body.endDate);
        const request = await request_status(req.body.startDate, req.body.endDate);
        const average_cost = await getAverageCost(req.body.startDate, req.body.endDate)

        // Подготовка данных для первого листа
        const data1 = reports.map(report => ({
            Фамилия: report.surname,
            Имя: report.name,
            Отчество: report.secondName,
            Почта: report.email,
            Номер_запроса: report.reqnumber,
            Адреса_объектов_недвижимости: report.address,
            Назначение_объекта: report.purpose,
            Стоимость: report.cost
        }));

        // Подготовка данных для второго листа
        const data2 = count_user.map(count_users => ({
            Количество_пользователей: count_user[0].total_users,
            Начало: startDate,
            Конец: endDate
        }));

        // Подготовка данных для третьего листа
        const data3 = request.map(reqs => ({
            Статус_запроса: reqs.name ,
            Количество: reqs.total_requests,
            Начало: startDate ,
            Конец: endDate
        }));

        // Подготовка данных для четвертого листа
        const data4 = average_cost.map(average_costs => ({
            Идентификатор_клиента: average_costs.client_id,
            Имя_клиента:average_costs.client_name ,
            Фамилия_клиента:average_costs.client_surname ,
            Отчество_клиента:average_costs.client_second_name ,
            Средняя_стоимость: average_costs.average_cost,

        }));

        // Создание рабочей книги
        const workbook = XLSX.utils.book_new();

        // Создание первого листа и добавление его в книгу
        const worksheet1 = XLSX.utils.json_to_sheet(data1);
        XLSX.utils.book_append_sheet(workbook, worksheet1, 'Основная информация');

        // Создание второго листа и добавление его в книгу
        const worksheet2 = XLSX.utils.json_to_sheet(data2);
        XLSX.utils.book_append_sheet(workbook, worksheet2, 'Дополнительная информация по регистрациям');

        // Создание второго листа и добавление его в книгу
        const worksheet3 = XLSX.utils.json_to_sheet(data3);
        XLSX.utils.book_append_sheet(workbook, worksheet3, 'Информация по запросам');

        // Создание второго листа и добавление его в книгу
        const worksheet4 = XLSX.utils.json_to_sheet(data4);
        XLSX.utils.book_append_sheet(workbook, worksheet4, 'Дополнительная информация по средней стоимости сделанных запросов');


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
