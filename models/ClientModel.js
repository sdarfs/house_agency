const db = require('../config/db')
const ClientQueries = require("../queries/ClientQueries");

class ClientModel {
	static async getOneByEmail(email) {
		return await db.query(ClientQueries.getClientByEmail(email))
	}

	static async create(data) {
		return await db.query(ClientQueries.create(data.surname, data.name, data.secondName, data.phoneNumber, data.email, data.password))
	}


	static async getOneById(id) {
		return await db.query(ClientQueries.getClientById(id));
	}

	static async updateClientById(id, data) {
		return await db.query(ClientQueries.updateClientById(data.surname, data.name, data.secondName, data.phoneNumber, data.email, id))
	}



}

module.exports = ClientModel