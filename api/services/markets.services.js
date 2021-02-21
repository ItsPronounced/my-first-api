const db = require('./db');

async function getMarkets() {
    const rows = await db.query('SELECT id, name, name_spanish FROM market');

    const data = db.emptyOrRows(rows);
    return data;
}

async function getMarketByID(marketID) {
    const rows = await db.query('SELECT id, name, name_spanish FROM market WHERE id=?', [marketID]);

    const data = db.emptyOrRows(rows);
    return data;
}

async function getMarketByName(marketName) {
    const rows = await db.query('SELECT id, name, name_spanish FROM market WHERE name=?', [marketName]);

    const data = db.emptyOrRows(rows);
    return data;
}

async function insertNewMarket(market) {
    const results = await db.query(
        'INSERT INTO market (name, name_spanish) VALUES (?, ?)',
        [market.name, market.name_spanish]
    );

    let message = "Error in creating market";
    if (results.affectedRows) {
        message = "Market created successfully"
    }

    return { message }
}


async function updateMarket(market) {
    const results = await db.query(
        'UPDATE market SET name = ?, name_spanish = ? WHERE id = ?',
        [market.name, market.name_spanish, market.id]
    );

    let message = "Error updating market"
    if (results.affectedRows) {
        message = `Market ${market.name} updated successfully`
    }

    return { message }

    // ResultSetHeader {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 0,
    //     info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    //     serverStatus: 2,
    //     warningStatus: 0,
    //     changedRows: 1
    //   }
}

async function deleteMarket(market) {
    const results = await db.query(
        'DELETE FROM market WHERE id=?', [market.id]
    );

    let message = `Error deleting market ${market.name}`
    if (results.affectedRows) {
        message = `Market '${market.name}' deleted successfully`
    }

    return { message };

    // ResultSetHeader {
    //     fieldCount: 0,
    //     affectedRows: 1,
    //     insertId: 0,
    //     info: '',
    //     serverStatus: 2,
    //     warningStatus: 0
    //   }

}

module.exports = { 
    getMarkets,
    getMarketByID,
    getMarketByName,
    insertNewMarket,
    updateMarket,
    deleteMarket
}