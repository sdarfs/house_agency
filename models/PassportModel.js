const db = require('../config/db')
const PassportQueries = require("../queries/PassportQueries");
const ClientQueries = require("../queries/ClientQueries");
const WorkerQueries = require("../queries/WorkerQueries");
const HouseQueries = require("../queries/HouseQueries");
class PassportModel {
    static async getPassport(id) {
        return await db.query(PassportQueries.getOneById(id))

    }
    static async postPassport(data) {
        return await db.query(HouseQueries.postNew(data.series, data.number, data.issuedBy, data.issuedDate, data.birthday, data., data.purpose, data.district))
    }

}

module.exports = CityModel