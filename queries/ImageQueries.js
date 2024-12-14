class ImageQueries {
	static create(name, houseId) {
		return `insert into "Image" ("name", "HouseId")
		values ('${name}', ${houseId})`
	}
}

module.exports = ImageQueries