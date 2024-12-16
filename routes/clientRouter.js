const express = require("express");
const { getFindPage, find } = require("../controllers/ClientController");
const {updatePassportData} = require("../models/ClientModel");
const isAuth = require("../middlewares/isAuth");
const isWorker = require("../middlewares/isWorker");
const clientRouter = express.Router();

clientRouter.get('/find',isAuth ,isWorker,  getFindPage);
clientRouter.post('/find',isAuth,isWorker ,find); // Изменено на POST для поиска
clientRouter.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { series, number, issuedBy, issuedDate, birthday} = req.body;

    try {
        await updatePassportData(req.params, req.body);
        return res.redirect('/'); // Успешное обновление
    } catch (error) {
        console.error(error);
        return res.status(500).send('Ошибка сервера');
    }
});

module.exports = clientRouter;