const db = require('../config/db')
const DepartmentQueries = require("../queries/DepartmentQueries");

class DepartmentModel {
	static async getAll() {
		return await db.query(DepartmentQueries.getAll());
	}
}

module.exports = DepartmentModel