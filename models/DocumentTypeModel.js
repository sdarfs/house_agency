const db = require('../config/db')
const DocumentTypeQueries = require("../queries/DocumentTypeQueries");
const {updateField} = require("../queries/DocumentQueries");

class DocumentTypeModel {
	static async getAll() {
		return db.query(DocumentTypeQueries.getAll())
	}
	static async updateField(doc_id,body){
		return db.query(updateField(doc_id,body.doc_text))
	}
}

module.exports = DocumentTypeModel