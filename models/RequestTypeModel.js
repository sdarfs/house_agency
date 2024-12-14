const db = require('../config/db')
const RequestTypeQueries = require("../queries/RequestTypeQueries");

class RequestTypeModel {
	static async getAll() {
		return await db.query(RequestTypeQueries.getAll())
	}
}

module.exports = RequestTypeModel