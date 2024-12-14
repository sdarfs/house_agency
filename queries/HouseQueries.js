class HouseQueries {
	static getAll() {
		return 'select "House".address, "House".id, "House"."cost", "House".description, "House"."roomCount", "House".area, public."District"."Name" as "districtName", public."City"."name" as "cityName", public."HousePurpose"."name" as "housePurposeName", public."HouseType"."name" as "houseTypeName" from "House"\n' +
			'left join "District" ON "District".id = "House"."DistrictId"\n' +
			'left join "City" ON "City".id = "District"."CityId"\n' +
			'left join "HousePurpose" ON "HousePurpose".id = "House"."HousePurposeId"\n' +
			'left join "HouseType" ON "HouseType".id = "House"."HouseTypeId"\n'
	}

	static getOneById(id) {
		return 'select "House".address, "House".id, "House"."cost", "House".description, "House"."roomCount", "House".area, public."District"."Name" as "districtName", public."City"."name" as "cityName", public."HousePurpose"."name" as "housePurposeName", public."HouseType"."name" as "houseTypeName" from "House"\n' +
			'left join "District" ON "District".id = "House"."DistrictId"\n' +
			'left join "City" ON "City".id = "District"."CityId"\n' +
			'left join "HousePurpose" ON "HousePurpose".id = "House"."HousePurposeId"\n' +
			'left join "HouseType" ON "HouseType".id = "House"."HouseTypeId"\n' +
			`where "House".id = ${id}`
	}



	static postNew(address, cost, desc, roomCount, area, houseTypeId, housePurposeId, districtId) {
		return 'insert into "House" ("address", "cost", "description", "roomCount", "area", "HouseTypeId", "HousePurposeId", "DistrictId")\n' +
			`values ('${address}', ${cost}, '${desc}', ${roomCount}, ${area}, ${houseTypeId}, ${housePurposeId}, ${districtId}) RETURNING "id"`
	}
}

module.exports = HouseQueries