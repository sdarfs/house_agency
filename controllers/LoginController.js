const WorkerModel = require("../models/WorkerModel");
const bcrypt = require('bcryptjs');
const ClientModel = require("../models/ClientModel");

class LoginController {
	static async getLoginPage(req, res) {
		res.render('pages/login', {title: "Вход"})
	}

	static async login(req, res) {
		const {email, password} = req.body;

		const worker = await WorkerModel.getOneByEmail(email)
		const client = await ClientModel.getOneByEmail(email)

		if (!worker.rows[0] && !client.rows[0]) return res.redirect('/login')

		let isMatch = false

		if (!!client.rows[0]) {
			isMatch = await bcrypt.compare(password, client.rows[0].password)
		}

		if (!!worker.rows[0]) {
			isMatch = await bcrypt.compare(password, worker.rows[0].password)
		}

		if (!isMatch) return res.redirect('/login')

		req.session.isAuth = true;
		if (!!client.rows[0]) {
			req.session.isWorker = false
			req.session.client = client.rows[0]
		}

		if (!!worker.rows[0]) {
			req.session.isWorker = true
			req.session.client = worker.rows[0]
		}
		res.redirect('/')
	}
}

module.exports = LoginController