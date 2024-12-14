const db = require('../config/db')
const HouseTypeQueries = require("../queries/HouseTypeQueries");

class HouseTypeModel {
	static async getAllHouseTypes() {
		return db.query(HouseTypeQueries.getAll())
	}
}

module.exports = HouseTypeModel