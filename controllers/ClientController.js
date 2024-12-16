const WorkerModel = require("../models/WorkerModel");
const ClientModel = require("../models/ClientModel");

class ClientController {
    static async getFindPage(req, res) {
        res.render('pages/FindClient', { title: "Поиск" });
    }

    static async find(req, res) {

        const worker =await  WorkerModel.getWorker(req.body);
        const client = await ClientModel.getClient(req.body);


        // Если клиент найден, перенаправляем на страницу ввода паспортных данных
        if (client.rows[0]) {
            return res.render('pages/details', { client: client.rows[0]});
        }
        else{ return res.render('pages/notFound', { title: "Поиск" });}

        // Если работник найден, можно обработать это как-то иначе или просто вернуть
        return res.render('pages/details', { title: "Работник найден", worker: worker.rows[0] });
    }
}

module.exports = ClientController;