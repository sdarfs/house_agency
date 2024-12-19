const db = require('../config/db')
const HouseQueries = require("../queries/HouseQueries");

class HouseModel {
	static async getHouseById(id) {
		return await db.query(HouseQueries.getOneById(id))
	}

	static async getAll() {
		return await db.query(HouseQueries.getAll())
	}

	static async postHouse(data) {
		return await db.query(HouseQueries.postNew(data.address, data.cost, data.details, data.roomCount, data.area, true, data.type, data.purpose, data.district))
	}
	static async changeStatus(data) {
		return await db.query(HouseQueries.changeStatus(data))
	}
}

module.exports = HouseModel