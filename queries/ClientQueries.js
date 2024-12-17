class ClientQueries {
	static getClientByEmail(email) {
		return 'select * from "Client"\n' +
			`\t\twhere "email" = '${email}'`
	}

	static create(surname, name, secondName, phoneNumber, email, password) {
		return `insert into "Client" ("surname", "name", "secondName", "phoneNumber", "email", "password")
				values ('${surname}', '${name}', '${secondName}', '${phoneNumber}', '${email}', '${password}')`
	}

	static getClient(surname, name,email) {
		return `select * from "Client" 
				where "surname" = '${surname}' and
					"name" = '${name}' and
						"email" ='${email}'`;
	}

	static updatePassport(clientId,series, number, issuedBy, issuedDate, birthday) {
		return `Insert into "Passport"("series","number","issuedBy", "issuedDate", "birthday", "ClientId" ) values ('${series}', '${number}', '${issuedBy}', '${issuedDate}', '${birthday}', '${clientId}')
			`
			;
	}

	static updateClientById(surname, name, secondName, phoneNumber, email, password, id) {
		return `UPDATE "Client"
		SET
		"surname" = '${surname}',
			"name" ='${name}',
			"secondName" = '${secondName}',
			"phoneNumber" = '${phoneNumber}',
			"email" = '${email}',
			"password" = '${password}'
		WHERE "id" = '${id}'`
		;

	}

	static getClientById(id) {
		return `SELECT * FROM "Client" WHERE id = '${id}'`; // Запрос для получения клиента по ID
	}
}

module.exports = ClientQueries