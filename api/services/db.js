const mysql = require('mysql2/promise');
const db = require('../config/database');
const pool = mysql.createPool(db.connection);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

function emptyOrRows(rows) {
    if (!rows) {
        return 'No rows found';  //this isn't working
    }

    return rows;
}

module.exports = {
  query,
  emptyOrRows
}