const DocumentTypeModel = require("../models/DocumentTypeModel");
const DocumentsModel = require("../models/DocumentsModel");
const FieldModel = require("../models/FieldModel");

class DocumentController {
	static async getNewDocument(req, res) {
		DocumentTypeModel.getAll().then((types) => {
			res.render('pages/createDocument', {title: "Создание документа", types: types.rows, request: req.params.requestId});
		})
	}

	static async postNewDocument(req, res) {
		const resp = await DocumentsModel.create({...req.body, request: req.params.requestId})

		const newDocId = resp.rows[0].id;
		await FieldModel.createField(newDocId, 1)
		await FieldModel.createField(newDocId, 1)

		res.redirect(`/requests/${req.params.requestId}/document/${newDocId}`)
	}

	static async getUpdateDocument(req, res) {
		DocumentsModel.getOneById(req.params.docId).then((doc) => {
			FieldModel.getFieldsOfDoc(req.params.docId).then((fields) => {
				res.render('pages/updateDocument', {title: "Документ", doc: doc.rows[0], fields: fields.rows})
			})
		})
	}

	static async postUpdateDocument(req, res) {
		const body = req.body

		for (const key of Object.keys(body)) {
			const [docId, fieldTypeId] = key.split('--')
			const newValue = body[key]

			await FieldModel.updateField(docId, fieldTypeId, newValue)
		}

		res.redirect(`/requests/${req.params.requestId}/document/${req.params.docId}`)
	}
}

module.exports = DocumentController