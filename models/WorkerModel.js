const db = require('../config/db')
const WorkerQueries = require("../queries/WorkerQueries");
const ClientQueries = require("../queries/ClientQueries");

class WorkerModel {
	static async getWorkersByDepartmentId(id) {
		return await db.query(WorkerQueries.getWorkersByDepartmentId(id))
	}

	static async getOneByEmail(email) {
		return await db.query(WorkerQueries.getWorkerByEmail(email))
	}

	static async create(data) {
		return await db.query(WorkerQueries.create(data.surname, data.name, data.secondName, data.department, data.password, data.email))
	}
	static async getOneById(id) {
		return await db.query(WorkerQueries.getWorkerById(id));
	}

	static async updateWorkerById(id, data) {
		return await db.query(WorkerQueries.updateWorkerById(data.surname, data.name, data.secondName,  data.email, id))
	}
}

module.exports = WorkerModel