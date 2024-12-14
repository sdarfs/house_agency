class FieldQueries {
	static create(docId, fieldTypeId, value) {
		return `insert into "Document_Field" ("DocumentId", "DocumentFieldId", "Field")
		values(${docId}, ${fieldTypeId}, '${value}')`
	}

	static getFieldsOfDoc(docId) {
		return `select "Document_Field"."Field" as "Field", "DocumentField"."name" as "name", "DocumentField"."label" as "label", "DocumentField"."id" as "id" from "Document_Field"
left JOIN "DocumentField" ON "DocumentField".id = "Document_Field"."DocumentFieldId"
where "Document_Field"."DocumentId" = ${docId}
order by "DocumentField"."id"`
	}

	static updateField(docId, fieldTypeId, value) {
		return `update "Document_Field"
		set "Field" = '${value}'
		where "DocumentId" = ${docId} and "DocumentFieldId" = ${fieldTypeId}`
	}
}

module.exports = FieldQueries