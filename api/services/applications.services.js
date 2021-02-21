const db = require('./db');

async function getApplications() {
    const rows = await db.query('SELECT id, name, name_spanish FROM application');
    // console.log(fields);
    const data = db.emptyOrRows(rows);
    return data;
}

async function getApplicationByID(applicationID) {
    const rows = await db.query('SELECT id, name, name_spanish FROM application WHERE id=?', [applicationID]);
    console.log(rows);
    const data = db.emptyOrRows(rows);
    return data;
}

async function getApplicationByName(applicationName) {
    const rows = await db.query('SELECT id, name, name_spanish FROM application WHERE name=?', [applicationName]);

    const data = db.emptyOrRows(rows);
    return data;
}

async function insertNewApplication(application) {
    const results = await db.query(
        'INSERT INTO application (name, name_spanish) VALUES (?, ?)',
        [application.name, application.name_spanish]
    );

    let message = "Error in creating application";
    if (results.affectedRows) {
        message = "Application created successfully"
    }

    return { message }

    /*
    ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 16,
        info: '',
        serverStatus: 2,
        warningStatus: 0
    }
    */
}

async function updateApplication(application) {
    const results = await db.query(
        'UPDATE application SET name = ?, name_spanish = ? WHERE id = ?',
        [application.name, application.name_spanish, application.id]
    );

    let message = "Error updating application"
    if (results.affectedRows) {
        message = "Application updated successfully"
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

async function deleteApplication(application) {
    const results = await db.query(
        'DELETE FROM application WHERE id=?', [application.id]
    );

    console.log(results);

    let message = `Error deleting application ${application.name}`
    if (results.affectedRows) {
        message = `Application '${application.name}' deleted successfully`
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
    getApplications, 
    getApplicationByID, 
    getApplicationByName, 
    insertNewApplication, 
    updateApplication, 
    deleteApplication
}