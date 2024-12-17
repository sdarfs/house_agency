const db = require('../config/db')
const ClientQueries = require("../queries/ClientQueries");

class ClientModel {
	static async getOneByEmail(email) {
		return await db.query(ClientQueries.getClientByEmail(email))
	}
	static async getClient(data) {
		return await db.query(ClientQueries.getClient(data.surname, data.name, data.email))
	}
	static async getReq(data) {
		const result = await db.query(ClientQueries.getReq(data))
		return result.rows;
	}
	static async updatePassportData(data, body){
		return await db.query(ClientQueries.updatePassport(data.id,body.series, body.number, body.issuedBy, body.issuedDate, body.birthday))
	}


	static async create(data) {
		return await db.query(ClientQueries.create(data.surname, data.name, data.secondName, data.phoneNumber, data.email, data.password))
	}


	static async getOneById(id) {
		return await db.query(ClientQueries.getClientById(id));
	}

	static async updateClientById(id, data) {
		return await db.query(ClientQueries.updateClientById(data.surname, data.name, data.secondName, data.phoneNumber, data.email,data.password, id))
	}



}

module.exports = ClientModel