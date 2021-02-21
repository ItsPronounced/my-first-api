const db = require('./db');

async function getManufacturers() {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM manufacturer');

    const data = db.emptyOrRows(rows);
    return data;
}

async function getManufacturerByID(manufacturerID) {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM manufacturer WHERE id=?', [manufacturerID]);

    const data = db.emptyOrRows(rows);
    return data;
}

async function getActiveManufacturers() {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM manufacturer WHERE `show` = 1');

    const data = db.emptyOrRows(rows);
    return data;
}

async function getManufacturerByName(manufacturerName) {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM manufacturer WHERE name=?', [manufacturerName]);

    const data = db.emptyOrRows(rows);
    return data;
}



async function insertNewManufacturer(manufacturer) {
    const results = await db.query(
        'INSERT INTO manufacturer (name, name_spanish, `show`, website) VALUES (?, ?, ?, ?)',
        [manufacturer.name, manufacturer.name_spanish, manufacturer.show, manufacturer.website]
    );

    let message = "Error in creating manufacturer";
    if (results.affectedRows) {
        message = `Manufacturer ${manufacturer.name} created successfully`;
    }

    return { message }
}


async function updateManufacturer(manufacturer) {
    const results = await db.query(
        'UPDATE manufacturer SET name=?, name_spanish=?, `show`=?, website=? WHERE id=?',
        [manufacturer.name, manufacturer.name_spanish, manufacturer.show, manufacturer.website, manufacturer.id]
    );

    let message = "Error updating manufacturer";
    if (results.affectedRows) {
        message = `Manufacturer ${manufacturer.name} updated successfully`;
    }

    return { message }

}

async function deleteManufacturer(manufacturer) {
    const results = await db.query(
        'DELETE FROM manufacturer WHERE id=?', [manufacturer.id]
    );

    let message = "Error deleting manufacturer";
    if (results.affectedRows) {
        message = `Manufacturer ${manufacturer.name} deleted successfully`
    }

    return { message }
}

module.exports = {
    getManufacturers,
    getManufacturerByID,
    getActiveManufacturers,
    getManufacturerByName,
    insertNewManufacturer,
    updateManufacturer,
    deleteManufacturer 
}