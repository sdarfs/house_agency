const RequestModel = require("../models/RequestModel");
const formatDate = require("../utils/formatDate");
const DocumentsModel = require("../models/DocumentsModel");
const WorkerModel = require("../models/WorkerModel");
const RequestTypeModel = require("../models/RequestTypeModel");
const DepartmentModel = require("../models/DepartmentModel");
const HouseModel = require("../models/HouseModel");

class RequestController {
	static async getMyRequests(req, res) {
		if (req.session.isWorker) {
			RequestModel.getRequestByWorkerId(req.session.client.id).then((data) => {
				res.render('pages/index', {title: "Ваши запросы", requests: data.rows, isWorker: req.session.isWorker})
			})
			return
		}

		RequestModel.getRequestByClientId(req.session.client.id).then((data) => {
			res.render('pages/index', {title: "Ваши запросы", requests: data.rows, isWorker: req.session.isWorker})
		})
	}

	static async getAllRequests(req, res) {
		RequestModel.getAllRequests().then((data) => {
			res.render('pages/index', {title: "Все запросы", requests: data.rows, isWorker: req.session.isWorker})
		})
	}

	static async getOneRequest(req, res) {
		DocumentsModel.getAllByRequestId(req.params.id).then((documents) => {
			const formattedDocuments = documents.rows.map((doc) => {
				return {
					...doc,
					createStamp: formatDate(doc.createStamp)
				}
			})
			RequestModel.getRequestById(req.params.id).then((request) => {

				const formatedRequest = {
					...request.rows[0],
					createStamp: formatDate( request.rows[0].createStamp),
					statusUpdateStamp: formatDate( request.rows[0].statusUpdateStamp),
					closeStamp: formatDate( request.rows[0].closeStamp),
				}

				res.render('pages/singleRequest', {title: "Запрос", request: formatedRequest, documents: formattedDocuments, isWorker: req.session.isWorker})
			})
		})
	}

	static async getCreateRequest(req, res) {
		RequestTypeModel.getAll().then((types) => {
			DepartmentModel.getAll().then((departments) => {
				HouseModel.getAll().then((houses) => {
					res.render('pages/createRequest', {title: "Новый запрос", types: types.rows, departments: departments.rows, houses: houses.rows, isWorker: req.session.isWorker})
				})
			})
		})
	}

	static async postCreateRequest(req, res) {
		const request = await RequestModel.getOneByNumber(req.body.number)

		if (request.rows.length > 0) return res.redirect('/requests/new')

		console.log(req.body)

		await RequestModel.postNewRequest(req.body, req.session?.client?.id)

		res.redirect('/')
	}

	static async updateCloseRequest(req, res) {
		RequestModel.updateCloseRequestById(req.params.id).then(() => {
			res.redirect(`/requests/${req.params.id}`)
		})
	}

	static async updateFinishRequest(req, res) {
		RequestModel.updateFinishRequestById(req.params.id).then(() => {
			res.redirect(`/requests/${req.params.id}`)
		})
	}

	static async getUpdateWorkerRequest(req, res) {
		RequestModel.getRequestById(req.params.id).then((request) => {
			WorkerModel.getWorkersByDepartmentId(request.rows[0].departmentId).then((workers) => {
				res.render('pages/updateWorkerRequest', {title: "Смена сотрудника", workers: workers.rows, request: request.rows[0], isWorker: req.session.isWorker})
			})
		})
	}

	static async updateWorkerRequest(req, res) {
		RequestModel.updateWorkerRequestById(req.params.id, req.body.worker).then(() => {
			res.redirect(`/requests/${req.params.id}`)
		})
	}

	static async deleteRequest(req, res) {
		RequestModel.deleteRequestById(req.params.id).then(() => {
			res.redirect('/')
		})
	}
}

module.exports = RequestController