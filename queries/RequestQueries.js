class RequestQueries {
	static getAll() {
		return 'select public."Request".id, "Request".number, public."RequestType"."name" as "requestTypeName", public."RequestState"."name" as "requestStateName" from "Request"\n' +
			'left join "RequestState" ON "RequestState".id = "Request"."RequestStateId"\n' +
			'left join "RequestType" ON "RequestType".id = "Request"."RequestTypeId"'
	}

	static getAllByWorkerId(id) {
		return 'select "Request".id, "Request".number, public."RequestType"."name" as "requestTypeName", public."RequestState"."name" as "requestStateName" from "Request"\n' +
			'left join "RequestState" ON "RequestState".id = "Request"."RequestStateId"\n' +
			'left join "RequestType" ON "RequestType".id = "Request"."RequestTypeId"\n'+
			`where "Request"."WorkerId" = ${id}`
	}

	static getAllByClientId(id) {
		return 'select public."Request".id, public."Request".number, public."RequestType"."name" as "requestTypeName", public."RequestState"."name" as "requestStateName" from "Request"\n' +
			'left join "RequestState" ON "RequestState".id = "Request"."RequestStateId"\n' +
			'left join "RequestType" ON "RequestType".id = "Request"."RequestTypeId"\n'+
			`where "Request"."ClientId" = ${id}`
	}

	static getOneById(id) {
		return 'select\n' +
			'"Request".id,\n' +
			'"Request".number,\n' +
			'"Request".details,\n' +
			'"Request"."createStamp",\n' +
			'"Request"."statusUpdateStamp",\n' +
			'"Request"."closeStamp",\n' +
			'"Department"."id" as "departmentId",\n' +
			'"Department"."name" as "departmentName",\n' +
			'"Worker"."surname" as "workerSurname",\n' +
			'"Worker"."name" as "workerName",\n' +
			'"Client"."surname" as "clientSurname",\n' +
			'"Client"."name" as "clientName",\n' +
			'"House"."address" as "address",\n' +
			'"District"."Name" as "districtName",\n' +
			'"City"."name" as "cityName",\n' +
			'"RequestState"."name" as "status",\n' +
			'"House".id as "houseId"\n' +
			'from "Request"\n' +
			'left join "Client" ON "Client".id = "Request"."ClientId"\n' +
			'left join "Department" ON "Department".id = "Request"."DepartmentId"\n' +
			'left join "Worker" ON "Worker".id = "Request"."WorkerId"\n' +
			'left JOIN "House" ON "House".id = "Request"."HouseId"\n' +
			'left join "District" ON "District".id = "House"."DistrictId"\n' +
			'left join "City" ON "City".id = "District"."CityId"\n' +
			'left join "RequestState" ON "RequestState".id = "Request"."RequestStateId"\n' +
			`where "Request".id = ${id}`
	}

	static getOneByNumber(number) {
		return 'select\n' +
			'"Request".id,\n' +
			'"Request".number,\n' +
			'"Request".details,\n' +
			'"Request"."createStamp",\n' +
			'"Request"."statusUpdateStamp",\n' +
			'"Request"."closeStamp",\n' +
			'"Department"."id" as "departmentId",\n' +
			'"Department"."name" as "departmentName",\n' +
			'"Worker"."surname" as "workerSurname",\n' +
			'"Worker"."name" as "workerName",\n' +
			'"Client"."surname" as "clientSurname",\n' +
			'"Client"."name" as "clientName",\n' +
			'"House"."address" as "address",\n' +
			'"District"."Name" as "districtName",\n' +
			'"City"."name" as "cityName",\n' +
			'"RequestState"."name" as "status",\n' +
			'"House".id as "houseId"\n' +
			'from "Request"\n' +
			'left join "Client" ON "Client".id = "Request"."ClientId"\n' +
			'left join "Department" ON "Department".id = "Request"."DepartmentId"\n' +
			'left join "Worker" ON "Worker".id = "Request"."WorkerId"\n' +
			'left JOIN "House" ON "House".id = "Request"."HouseId"\n' +
			'left join "District" ON "District".id = "House"."DistrictId"\n' +
			'left join "City" ON "City".id = "District"."CityId"\n' +
			'left join "RequestState" ON "RequestState".id = "Request"."RequestStateId"\n' +
			`where "Request".number = '${number}'`
	}

	static deleteById(id) {
		return 'delete from "Request"\n' +
			`where "id" = ${id}`
	}

	static updateFinishById(id) {
		return 'update "Request"\n' +
			'set "RequestStateId" = 2\n' +
			`where "id" = ${id}`
	}

	static updateCloseById(id) {
		return 'update "Request"\n' +
			'set "RequestStateId" = 3\n' +
			`where "id" = ${id}`
	}

	static updateWorkerById(id, workerId) {
		return 'update "Request"\n' +
			`set "WorkerId" = ${workerId}\n` +
			`where "id" = ${id}`
	}

	static postNew(number, details, houseId, clientId, requestTypeId, departmentId) {
		return `CALL public."AddRequest"(
						\t'${number}', 
						\t'${details}', 
						\t${houseId}, 
						\t4, 
						\t${clientId}, 
						\t${requestTypeId}, 
						\t${departmentId}
						)`
	}
}

module.exports = RequestQueries