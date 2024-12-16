const DocumentTypeModel = require("../models/DocumentTypeModel");
const DocumentsModel = require("../models/DocumentsModel");

class DocumentController {
	static async getNewDocument(req, res) {
		DocumentTypeModel.getAll().then((types) => {
			res.render('pages/createDocument', {title: "Создание документа", types: types.rows, request: req.params.requestId});
		})
	}

	static async postNewDocument(req, res) {
		const resp = await DocumentsModel.create({...req.body,request: req.params.requestId})

		const newDocId = resp.rows[0].id;
		res.redirect(`/requests/${req.params.requestId}/document/${newDocId}`)
	}

	static async getUpdateDocument(req, res) {
		DocumentsModel.getOneById(req.params.docId).then((doc) => {

				res.render('pages/updateDocument',  {
					title: 'Документ',
					doc: doc,
					doc_text: doc.rows[0].doc_text
				});
		})
	}

	static async postUpdateDocument(req, res) {
		const doc_id = req.params.docId
		const body = req.body // приходит doc_text
		DocumentTypeModel.updateField(doc_id,body).then(() => {
			res.redirect(`/requests/${req.params.requestId}`)})

	}
}

module.exports = DocumentController