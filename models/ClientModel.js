const db = require('../config/db')
const ClientQueries = require("../queries/ClientQueries");

class ClientModel {
	static async getOneByEmail(email) {
		return await db.query(ClientQueries.getClientByEmail(email))
	}

	static async create(data) {
		return await db.query(ClientQueries.create(data.surname, data.name, data.secondName, data.phoneNumber, data.email, data.password))
	}
	static async update(data) {
		return await db.query(ClientQueries.update(data.surname, data.name, data.secondName, data.phoneNumber, data.email, data.password))
	}
}

module.exports = ClientModel