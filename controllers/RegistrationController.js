const ClientModel = require("../models/ClientModel");
const bcrypt = require('bcryptjs');
const DepartmentModel = require("../models/DepartmentModel");
const WorkerModel = require("../models/WorkerModel");
const PositionModel = require("../models/PositionModel");

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

	static async getUserSettings(req, res) {
		const userId = req.session.client.id; // Получаем ID пользователя из сессии
		try {
			const user = await ClientModel.getOneById(userId); // Получаем данные пользователя по ID
			if (user.rows.length > 0) {
				res.render('pages/settings', { title: 'Настройки пользователя'});
			} else {
				res.status(404).send('Пользователь не найден');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Ошибка сервера');
		}
	}

	static async updateUserSettings(req, res) {
		const userId = req.session.client.id; // Получаем ID пользователя из сессии

		try {
			// Получаем текущие данные пользователя
			const currentUser = await ClientModel.getOneById(userId);
			if (currentUser.rows.length === 0) {
				return res.status(404).send('Пользователь не найден');
			}

			const user = currentUser.rows[0];
			const updatedData = {
				surname: req.body.surname || user.surname,
				name: req.body.name || user.name,
				secondName: req.body.secondName || user.secondName,
				phoneNumber: req.body.phoneNumber || user.phoneNumber,
				email: req.body.email || user.email,

				series: req.body.series || user.series,
				number: req.body.number || user.number,
				issuedBy: req.body.issuedBy || user.issuedBy,
				issuedDate: req.body.issuedDate || user.issuedDate,
				birthday: req.body.birthday || user.birthday

			};
			await ClientModel.updateClientById(userId, updatedData);
			if (req.body.series.length > 0 && req.body.number.length > 0 &&
				req.body.issuedBy.length > 0 && req.body.issuedDate.length >  req.body.birthday.length > 0 ){
				await ClientModel.getOneByIdandPassport(userId, updatedData);
			}
			else{
				res.redirect('/');
			} //Перенаправляем на страницу настроек после успешного обновления
		} catch (error) {
			console.error(error);
			res.status(500).send('Ошибка сервера');
		}
	}


	static async getWorkerSettings(req, res) {
		const userId = req.session.client.id; // Получаем ID пользователя из сессии
		try {
			const user = await WorkerModel.getOneById(userId); // Получаем данные пользователя по ID
			if (user.rows.length > 0) {
				const departments = await DepartmentModel.getAll()
				const positions = await PositionModel.getAllPositions()
				res.render('pages/settingsWorker', { title: 'Настройки пользователя', departments: departments.rows, positions:positions.rows});
			} else {
				res.status(404).send('Пользователь не найден');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Ошибка сервера');
		}
	}

	static async updateWorkerSettings(req, res) {
		const userId = req.session.client.id; // Получаем ID пользователя из сессии

		try {
			// Получаем текущие данные пользователя
			const currentUser = await WorkerModel.getOneById(userId);
			if (currentUser.rows.length === 0) {
				return res.status(404).send('Пользователь не найден');
			}

			const user = currentUser.rows[0];

			// Обновляем только те поля, которые были переданы в форме
			const updatedData = {
				surname: req.body.surname || user.surname,
				name: req.body.name || user.name,
				secondName: req.body.secondName || user.secondName,
				email: req.body.email || user.email,
				department: req.body.department || user.DepartmentId,
				position: req.body.position || user.PositionId,

				series: req.body.series || user.series,
				number: req.body.number || user.number,
				issuedBy: req.body.issuedBy || user.issuedBy,
				issuedDate: req.body.issuedDate || user.issuedDate,
				birthday: req.body.birthday || user.birthday

			};
			await WorkerModel.updateWorkerById(userId, updatedData);
			if (req.body.series.length > 0 && req.body.number.length > 0 &&
				req.body.issuedBy.length > 0 && req.body.issuedDate.length >  req.body.birthday.length > 0 ){
				await WorkerModel.getOneByIdandPassport(userId, updatedData);
			}
			else{
				res.redirect('/');
			}

		} catch (error) {
			console.error(error);
			res.status(500).send('Ошибка сервера');
		}

	}

}

module.exports = RegistrationController