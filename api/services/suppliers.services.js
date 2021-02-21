const db = require('./db');

async function getSuppliers() {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM supplier');

    const data = db.emptyOrRows(rows);
    return data;
}


async function getActiveSuppliers() {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM supplier WHERE `show` = 1');
    
    const data = db.emptyOrRows(rows);
    return data;
}

async function getSupplierByID(supplierID) {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM supplier WHERE id=?', [supplierID]);

    const data = db.emptyOrRows(rows);
    return data;
}

async function getSupplierByName(supplierName) {
    const rows = await db.query('SELECT id, name, name_spanish, `show`, website FROM supplier WHERE name=?', [supplierName]);

    const data = db.emptyOrRows(rows);
    return data;
}


async function insertNewSupplier(supplier) {
    const results = await db.query(
        'INSERT INTO supplier (name, name_spanish, `show`, website) VALUES (?, ?, ?, ?)',
        [supplier.name, supplier.name_spanish, supplier.show, supplier.website]
    );

    let message = "Error in creating supplier";
    if (results.affectedRows) {
        message = `Supplier '${supplier.name}' created successfully`;
    }

    return { message }
}


async function updateSupplier(supplier) {
    const results = await db.query(
        'UPDATE supplier SET name=?, name_spanish=?, `show`=?, website=? WHERE id=?',
        [supplier.name, supplier.name_spanish, supplier.show, supplier.website, supplier.id]
    );

    let message = "Error updating supplier";
    if (results.affectedRows) {
        message = `Supplier '${supplier.name}' updated successfully`
    }

    return { message }

}

async function deleteSupplier(supplier) {
    const results = await db.query(
        'DELETE FROM supplier WHERE id=?', [supplier.id]
    );

    let message = "Error deleting supplier";
    if (results.affectedRows) {
        message = `Supplier '${supplier.name}' deleted successfully`
    }

    return { message }
}

module.exports = {  
    getSuppliers,
    getSupplierByID,
    getActiveSuppliers,
    getSupplierByName,
    insertNewSupplier,
    updateSupplier,
    deleteSupplier
}