class DocumentQueries {
	static getAllByRequestId(id) {
		return' select "docNumber", "createStamp", "id" from "Document"\n' +
			`\t\twhere "RequestId" = ${id}`
	}

	static create(docNumber, type, request) {
		return `insert into "Document" ("docNumber", "DocumentTypeId", "RequestId", "createStamp")
		values('${docNumber}', '${type}', '${request}', '${new Date().toISOString()}') RETURNING id`
	}

	static getOneById(id) {
		return `select * from "Document" where "id" = ${id}`
	}
}

module.exports = DocumentQueries