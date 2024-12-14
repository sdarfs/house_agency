const HouseModel = require("../models/HouseModel");
const CityModel = require("../models/CityModel");
const DistrictModel = require("../models/DistrictModel");
const HouseTypeModel = require("../models/HouseTypeModel");
const HousePurposeModel = require("../models/HousePurposeModel");
const ImageModel = require("../models/ImageModel");

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
						})
					})
				})
			})
		})
	}

	static async postCreateHouse(req, res) {
		HouseModel.postHouse(req.body).then(() => {
			res.redirect(`/`)
		})
	}
}

module.exports = HouseController