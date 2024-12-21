const db = require("../config/db");
const ImageQueries = require("../queries/ImageQueries");

class ImageModel {
	static async create(name, houseId) {
		return await db.query(ImageQueries.create(name, houseId))
	}

	static async insertImage(houseId, imagePath) {
		const query = 'INSERT INTO "Image" ("HouseId", "image_path") VALUES ($1, $2)';
		const values = [houseId, imagePath];
		return await db.query(query, values);
	}
	static async getImage(house_id){
		return await db.query(ImageQueries.getImage(house_id))
	}



}

module.exports = ImageModel