class DistrictQueries {
	static getAll() {
		return 'select * from "District", "City" where "District"."CityId" = "City"."id"'
;	}
}

module.exports = DistrictQueries