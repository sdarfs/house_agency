class WorkerQueries {
	static getWorkersByDepartmentId(id) {
		return 'select * from "Worker"\n' +
			`\t\twhere "DepartmentId" = ${id}`
	}

	static getWorkerByEmail(email) {
		return 'select * from "Worker"\n' +
			`\t\twhere "email" = '${email}'`
	}

	static create(surname, name, secondName, departmentId, password, email) {
		return `insert into "Worker" ("surname", "name", "secondName", "DepartmentId", "password", "email")
						values ('${surname}', '${name}', '${secondName}', ${departmentId}, '${password}', '${email}')`
	}
	static updateWorkerById(surname, name, secondName, email,password,departmentid, positionid, id) {
		return `UPDATE "Worker"
		SET
		"surname" = '${surname}',
			"name" ='${name}',
			"secondName" = '${secondName}',
			"email" = '${email}',
			"password" = '${password}',
			"DepartmentId" = '${departmentid}',
			"PositionId" = '${positionid}'
		WHERE "id" = '${id}'`
			;

	}

	static getWorkerById(id) {
		return `SELECT * FROM "Worker" WHERE id = '${id}'`; // Запрос для получения клиента по ID
	}
}

module.exports = WorkerQueries