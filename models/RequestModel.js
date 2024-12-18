const db = require('../config/db')
const RequestQueries = require("../queries/RequestQueries");

class RequestModel {
	static async getAllRequests() {
		return await db.query(RequestQueries.getAll())
	}
	static async UpdateHoustIdinReq(house_id, req_id){
		return await db.query(RequestQueries.UpdateIdHR(house_id, req_id))
	}

	static async getRequestByWorkerId(id) {
		return await db.query(RequestQueries.getAllByWorkerId(id))
	}

	static async getRequestByClientId(id) {
		return await db.query(RequestQueries.getAllByClientId(id))
	}

	static async getRequestById(id) {
		return await db.query(RequestQueries.getOneById(id))
	}

	static async deleteRequestById(id) {
		return await db.query(RequestQueries.deleteById(id))
	}

	static async updateFinishRequestById(id) {
		return await db.query(RequestQueries.updateFinishById(id))
	}

	static async updateCloseRequestById(id) {
		return await db.query(RequestQueries.updateCloseById(id))
	}

	static async updateWorkerRequestById(id, workerId) {
		return await db.query(RequestQueries.updateWorkerById(id, workerId))
	}

	static async getOneByNumber(number) {
		return await db.query(RequestQueries.getOneByNumber(number))
	}

	static async postNewRequest(data, clientId) {
		const houseId = data.nullHouse ? 'null' : data.house
		return await db.query(RequestQueries.postNew(data.number, data.details, houseId, clientId, data.type, data.department))
	}
}

module.exports = RequestModel