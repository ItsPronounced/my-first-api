const db = require('./db');



async function getProducts() {
    const rows = await db.query('SELECT id, name, name_spanish, market, application, manufacturer, supplier, short_description, short_description_spanish, description, description_spanish, details, details_spanish, hero_image, other_image, pdf_files, `status`, link_title, link FROM product_type');

    const data = db.emptyOrRows(rows);
    return data;
}

async function getActiveProducts() {
    const rows = await db.query('SELECT id, name, name_spanish, market, application, manufacturer, supplier, short_description, short_description_spanish, description, description_spanish, details, details_spanish, hero_image, other_image, pdf_files, `status`, link_title, link FROM product_type WHERE status=1');
    
    const data = db.emptyOrRows(rows);
    return data;
}

async function getProductByID(productID) {
    const rows = await db.query('SELECT id, name, name_spanish, market, application, manufacturer, supplier, short_description, short_description_spanish, description, description_spanish, details, details_spanish, hero_image, other_image, pdf_files, `status`, link_title, link FROM product_type WHERE id=?', [productID]);

    const data = db.emptyOrRows(rows);
    return data;
}



async function insertNewProduct(product) {
    const results = await db.query('INSERT INTO product_type (name, name_spanish, market, application, manufacturer, supplier, short_description, short_description_spanish, description, description_spanish, details, details_spanish, hero_image, other_image, pdf_files, `status`, link_title, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [product.name, product.name_spanish, product.market, product.application, product.manufacturer, product.supplier, product.short_description, product.short_description_spanish, product.description, product.description_spanish, product.details, product.details_spanish, product.hero_image, product.other_image, product.pdf_files, product.status, product.link_title, product.link]);

    let message = "Error creating new product"
    if (results.affectedRows) {
        message = `Product '${product.name}' created successfully`
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

async function updateProduct(product) {
    const results = await db.query(
        'UPDATE product_type SET name=?, name_spanish=?, market=?, application=?, manufacturer=?, supplier=?, short_description=?, short_description_spanish=?, description=?, description_spanish=?, details=?, details_spanish=?, hero_image=?, other_image=?, pdf_files=?, status=?, link_title=?, link=? WHERE id=?',
        [product.name, product.name_spanish, product.market, product.application, product.manufacturer, product.supplier, product.short_description, product.short_description_spanish, product.description, product.description_spanish, product.details, product.details_spanish, product.hero_image, product.other_image, product.pdf_files, product.status, product.link_title, product.link, product.id]
    );

    let message = "Error updating product"
    if (results.affectedRows) {
        message = `Product '${product.name}' updated successfully`
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

async function deleteProduct(product) {
    const results = await db.query(
        'DELETE FROM product_type WHERE id=?', [product.id]
    );

    console.log(results);

    let message = `Error deleting product ${product.name}`
    if (results.affectedRows) {
        message = `Product '${product.name}' deleted successfully`
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
    getProducts,
    getActiveProducts,
    getProductByID,
    insertNewProduct,
    updateProduct,
    deleteProduct
}