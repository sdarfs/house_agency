const db = require('../config/db')
const PositionQueries = require("../queries/PositionQueries");


class PositionModel{
    static async getAllPositions() {
        return db.query(PositionQueries.getAllPositions())
    }
}

module.exports = PositionModel