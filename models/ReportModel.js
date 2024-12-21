const db = require('../config/db');
const { getRep } = require("../queries/ReportQueries");

class ReportModel {
    static async getRep() {
        const result = await db.query(getRep());
        return result.rows; // Предполагаем, что результат имеет свойство rows
    }
}

module.exports = ReportModel;