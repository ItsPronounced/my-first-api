const db = require('./db');


//type can be 'distribution' or 'power'
async function getOemTitles(type) {
    const title = await db.query(`SELECT DISTINCT application.name, application.name_spanish FROM product_type LEFT JOIN application ON product_type.application = application.id WHERE market = 1 AND application != 0 AND application.name LIKE '${type}%' AND application.name != 'distribution'`);

    const data = db.emptyOrRows(title);
    return data;
}

async function getUtilityTitles() {
    const title = await db.query(`SELECT DISTINCT application.name, application.name_spanish FROM product_type LEFT JOIN application ON product_type.application = application.id WHERE market = 2 AND application != 0`);

    const data = db.emptyOrRows(title);
    return data;
}

module.exports = {
    getOemTitles,
    getUtilityTitles
}