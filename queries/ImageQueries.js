class ImageQueries {
	static create(name, houseId) {
		return `insert into "Image" ("image_path", "HouseId")
		values ('${name}', ${houseId})`
	}
	static getImage(houseId){
		return ` Select * from "Image" where "HouseId" = '${houseId}'`;
	}
}

module.exports = ImageQueries