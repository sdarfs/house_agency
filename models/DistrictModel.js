const db = require('../config/db')
const DistrictQueries = require("../queries/DistrictQueries");

class DistrictModel {
	static async getAllDistricts() {
		return db.query(DistrictQueries.getAll())
	}
}

module.exports = DistrictModel