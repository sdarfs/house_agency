const db = require('../config/db')
const DocumentTypeQueries = require("../queries/DocumentTypeQueries");

class DocumentTypeModel {
	static async getAll() {
		return db.query(DocumentTypeQueries.getAll())
	}
}

module.exports = DocumentTypeModel