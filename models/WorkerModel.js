const db = require('../config/db')
const WorkerQueries = require("../queries/WorkerQueries");

class WorkerModel {
	static async getWorkersByDepartmentId(id) {
		return await db.query(WorkerQueries.getWorkersByDepartmentId(id))
	}

	static getWorker(surname, name, email) {
		return `select * from "Worker" 
				where "surname" = '${surname}' and
						"name" ='${name}' and
						"email" = '${email}'`;
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
		return await db.query(WorkerQueries.updateWorkerById(data.surname, data.name, data.secondName,  data.email, data.password, id))
	}
}

module.exports = WorkerModel