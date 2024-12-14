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
}

module.exports = WorkerQueries