class DocumentQueries {
	static getAllByRequestId(id) {
		return' select "docNumber", "createStamp", "id" from "Document"\n' +
			`\t\twhere "RequestId" = ${id}`
	}

	static create(docNumber,doc_text, type, request) {
		return `insert into "Document" ("docNumber", "doc_text","DocumentTypeId", "RequestId", "createStamp")
		values('${docNumber}', '${type}','${doc_text}' ,'${request}', '${new Date().toISOString()}') RETURNING id`
	}

	static getOneById(id) {
		return `select * from "Document" where "id" = ${id}`
	}
	static updateField(doc_id,doc_text){
		return	`UPDATE "Document" 
			SET "doc_text" = '${doc_text}'
			WHERE "id" = '${doc_id}'`;
	}

}

module.exports = DocumentQueries