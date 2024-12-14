const ClientModel = require("../models/ClientModel");
const bcrypt = require('bcryptjs');
const DepartmentModel = require("../models/DepartmentModel");
const WorkerModel = require("../models/WorkerModel");

class RegistrationController {
	static async getRegistrationPage(req, res) {
		res.render('pages/registration', {title: "Регистрация"})
	}

	static async registerClient(req, res) {
		if (req.body.password !== req.body.passwordRepeat) return res.redirect('/registration')

		const clients = await ClientModel.getOneByEmail(req.body.email)
		if (clients.rows.length > 0) return res.redirect('/registration')

		const body = {...req.body, password: bcrypt.hashSync(req.body.password, 8)}

		ClientModel.create(body).then(() => {
			res.redirect('/login')
		})
	}

	static async getRegistrationWorkerPage(req, res) {
		DepartmentModel.getAll().then((departments) => {
			res.render('pages/registerWorker', {title: "Регистрация сотрудника", isWorker: req.session.isWorker, departments: departments.rows})
		})
	}


	static async registerWorker(req, res) {
		const workers = await WorkerModel.getOneByEmail(req.body.email)
		if (workers.rows.length > 0) return res.redirect('/registration/worker')

		const body = {...req.body, password: bcrypt.hashSync(req.body.password, 8)}

		WorkerModel.create(body).then(() => {
			res.redirect('/')
		})
	}

	static async update_settings(req, res){
		ClientModel.update(body.id).then(() => {
			res.redirect('/setiings')
		})
	}

}

module.exports = RegistrationController