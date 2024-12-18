const HouseModel = require("../models/HouseModel");
const CityModel = require("../models/CityModel");
const DistrictModel = require("../models/DistrictModel");
const HouseTypeModel = require("../models/HouseTypeModel");
const HousePurposeModel = require("../models/HousePurposeModel");
const ImageModel = require("../models/ImageModel");
const {UpdateHoustIdinReq} = require("../models/RequestModel");

class HouseController {
	static async getOneHouse(req, res) {
		HouseModel.getHouseById(req.params.id).then((house) => {
			res.render('pages/object', {title: "Дом", house: house.rows[0], isWorker: req.session.isWorker})
		})
	}


	static async createHouse(req, res) {
		CityModel.getAllCities().then((cities) => {
			DistrictModel.getAllDistricts().then((districts) => {
				HouseTypeModel.getAllHouseTypes().then((houseTypes) => {
					HousePurposeModel.getAllHousePurposes().then((housePurposes) => {
						res.render('pages/createHouse', {
							title: "Новый дом",
							cities: cities.rows,
							districts: districts.rows,
							houseTypes: houseTypes.rows,
							housePurposes: housePurposes.rows,
							isWorker: req.session.isWorker,
							request: req.params.id
						})
					})
				})
			})
		})
	}

	static async postCreateHouse(req, res) {
		try {
			// Получаем ID нового дома
			const newHouseId = await HouseModel.postHouse(req.body);

			// Обновляем запрос с новым ID
			await UpdateHoustIdinReq(newHouseId.rows[0].id, req.params.id);

			// Перенаправляем пользователя
			res.redirect('/');
		} catch (error) {
			console.error('Error creating house:', error);
			res.status(500).send('Internal Server Error');
		}
	}

	static async getAllHouses(req, res) {
		try {
			const houses = await HouseModel.getAll();
			res.render('pages/all', {
				title: "Все дома",
				houses: houses.rows,
				isWorker: req.session.isWorker,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Ошибка сервера');
		}
	}
}

module.exports = HouseController