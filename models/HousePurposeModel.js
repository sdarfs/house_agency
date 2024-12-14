const db = require('../config/db')
const HousePurposeQueries = require("../queries/HousePurposeQueries");

class HousePurposeModel {
	static async getAllHousePurposes() {
		return db.query(HousePurposeQueries.getAll())
	}
}

module.exports = HousePurposeModel