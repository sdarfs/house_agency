class ReportQueries {
    static getRep() {
        return 'SELECT\n' +
            '    c.surname, c.name, c.email,c."secondName",\n' +
            '    h.address, h.cost, hp.name as purpose,\n' +
            '    r."number" as reqnumber\n' +
            'FROM\n' +
            '    "Client" c\n' +
            '        LEFT JOIN\n' +
            '    "Request" r ON c."id" = r."ClientId"\n' +
            '        LEFT JOIN\n' +
            '    "House" h ON r."HouseId" = h."id"\n' +
            '        LEFT JOIN\n' +
            '    "HousePurpose" hp ON h."HousePurposeId" = hp."id"';
    }
    static getCountUsers(startDate, endDate){
        return `SELECT COUNT(*) AS total_users
                FROM "Client"
                WHERE "registration" BETWEEN '${startDate}' AND '${endDate}'`;
    }

    static request_status(startDate, endDate){
        return `SELECT
                    rs."name",
                    COUNT(r."id") AS total_requests
                    FROM
                    "Request" r
                        JOIN
                    "RequestState" rs ON r."RequestStateId" = rs.id
                WHERE
                    rs."name" IN ('Открыт', 'Закрыт', 'Закончен', 'В обработке') 
                and ((r."createStamp" BETWEEN '${startDate}' and '${endDate}') or (r."closeStamp" BETWEEN '${startDate}' and '${endDate}'))
                GROUP BY
                    rs."name"
                ORDER BY
                    rs."name"; `;
    }

    static getAverageCost(){
        return `SELECT
                    "Client"."id" AS client_id,
                    "Client"."name" AS client_name,
                    "Client"."surname" as client_surname,
                    "Client"."secondName" as client_second_name, 
                    AVG("House"."cost") AS average_cost
                FROM
                    "House"
                        JOIN
                    "Request" ON "House"."id" = "Request"."HouseId"
                        JOIN
                    "Client" ON "Client"."id" = "Request"."ClientId"
                GROUP BY
                    "Client"."id", "Client"."name"
                ORDER BY
                    client_id; `;
    }

}

module.exports = ReportQueries