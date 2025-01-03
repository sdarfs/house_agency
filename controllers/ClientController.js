const ClientModel = require("../models/ClientModel");

class ClientController {
    static async getFindPage(req, res) {
        res.render('pages/FindClient', { title: "Поиск" });
    }

    static async find(req, res) {
        const client = await ClientModel.getClient(req.body);
        // Если клиент найден, перенаправляем на страницу ввода паспортных данных
        if (client.rows[0]) {
            const result = await ClientModel.getReq(client.rows[0].id);
            const show_passport = await ClientModel.getPassport(client.rows[0].id)
            return res.render('pages/details', {client: client.rows[0], result:result, passport:show_passport});
        } else {
            return res.render('pages/notFound', {title: "Поиск"});
        }
    }
}

module.exports = ClientController;