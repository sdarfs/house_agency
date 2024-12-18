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
		return `SELECT
					c.*,
					p.*
				FROM
					"Client" c
						LEFT JOIN
					"Passport" p ON c."id" = p."ClientId"
				WHERE
					(("surname" = '${surname}' and
						"name" = '${name}' and
						"email" ='${email}') AND (p."isArchive" = 'false'))`;
	}
	static getReq(clientId) {
		return `select "id", "number" from "Request"
		where "ClientId" = '${clientId}'`;

	}

	static updatePassport(clientId, series, number, issuedBy, issuedDate, birthday) {
		return `Insert into "Passport"("series", "number", "issuedBy", "issuedDate", "birthday", "ClientId")
				values ('${series}', '${number}', '${issuedBy}', '${issuedDate}', '${birthday}', '${clientId}')
		`
			;
	}

	static updateClientById(surname, name, secondName, phoneNumber, email, id) {
		return `UPDATE "Client"
		SET
		"surname" = '${surname}',
			"name" ='${name}',
			"secondName" = '${secondName}',
			"phoneNumber" = '${phoneNumber}',
			"email" = '${email}'
		WHERE "id" = '${id}'`
		;

	}

	static getClientById(id) {
		return `SELECT * FROM "Client" WHERE id = '${id}'`; // Запрос для получения клиента по ID
	}
	static getClientByIdandPassport(id) {
		return ` Select c.*,p.*
				FROM
					"Client" c
					LEFT JOIN
					"Passport" p ON c."id" = p."ClientId"
					WHERE c."id" = '${id}' and p."isArchive" = 'false'
					`;
	}
}

module.exports = ClientQueries