const db = require("../config/db");
const ImageQueries = require("../queries/ImageQueries");

class ImageModel {
	static async create(name, houseId) {
		return await db.query(ImageQueries.create(name, houseId))
	}
}

module.exports = ImageModel