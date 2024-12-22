const db = require('../config/db');
const { getRep, getCountUsers, request_status, getAverageCost } = require("../queries/ReportQueries");

class ReportModel {
    static async getRep() {
        const result = await db.query(getRep());
        return result.rows;
    }
    static async getCountUsers(startDate, endDate){
        const result = await db.query(getCountUsers(startDate, endDate));
        return result.rows;
    }

    static async request_status(startDate, endDate){
        const result = await db.query(request_status(startDate, endDate));
        return result.rows;
    }
    static async getAverageCost(){
        const result = await db.query(getAverageCost());
        return result.rows;
    }
}

module.exports = ReportModel;