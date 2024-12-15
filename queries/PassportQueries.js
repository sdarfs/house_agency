class PassportQueries {
    // Запрос для получения паспорта по ID
    static getOneById(id) {
        return 'select * from "Passport"\n' +
            `\t\twhere "id" = '${id}'`
        ;
    }

    // Запрос для добавления нового паспорта
    static postNew(series, number, issuedBy, issuedDate, birthday) {
        return `insert into "Passport" ("series", "number", "issuedBy", "issuedDate", "birthday","isArchive" )
				values ('${series}', '${number}', '${issuedBy}', '${issuedDate}', '${birthday}', false)`
    }
}

module.exports = PassportQueries;
