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
}

module.exports = ReportQueries