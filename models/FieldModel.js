const db = require("../config/db");
const FieldQueries = require("../queries/FieldQueries");

class FieldModel {
	static async createField(docId, typeId, value = "") {
		return await db.query(FieldQueries.create(docId, typeId, value))
	}

	static async getFieldsOfDoc(docId) {
		return await db.query(FieldQueries.getFieldsOfDoc(docId))
	}

	static async updateField(docId, typeId, value) {
		return await db.query(FieldQueries.updateField(docId, typeId, value))
	}
}

module.exports = FieldModel