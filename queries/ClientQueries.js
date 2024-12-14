class ClientQueries {
	static getClientByEmail(email) {
		return 'select * from "Client"\n' +
			`\t\twhere "email" = '${email}'`
	}

	static create(surname, name, secondName, phoneNumber, email, password) {
		return `insert into "Client" ("surname", "name", "secondName", "phoneNumber", "email", "password")
				values ('${surname}', '${name}', '${secondName}', '${phoneNumber}', '${email}', '${password}')`
	}

	static update(id, surname, name, secondName, phoneNumber, email, password) {
		return `update "Client"
		set "surname" = '${surname}',
			"name" = '${name}',
			"secondName" = '${secondName}',
			"phoneNumber" = '${phoneNumber}',
			"email" = '${email}',
			"password" = '${password}',
		where "id" = ${id} `
	}
}

module.exports = ClientQueries