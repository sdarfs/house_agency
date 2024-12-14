const db = require('../config/db')
const CityQueries = require("../queries/CityQueries");

class CityModel {
	static async getAllCities() {
		return db.query(CityQueries.getAll())
	}
}

module.exports = CityModel