const express = require('express');
const router = express.Router();
const products = require('../services/products.services');



router.get(['/', '/all'], async function(req, res, next) {
    try {
        res.json(await products.getProducts());
    } catch (err) {
        console.error('Error while getting all products - ', err.message);
        next(err);
    }
});

router.get('/active', async function(req, res, next) {
    try {
        res.json(await products.getActiveProducts());
    } catch (err) {
        console.error('Error while getting all products - ', err.message);
        next(err);
    }
});

router.get('/id/:id', async function(req, res, next) {
    try {
        res.json(await products.getProductByID(req.params.id))
    } catch (err) {
        console.error('Error while getting product by id - ', err.message);
        next(err);
    }
});



router.post('/', async function(req, res, next) {
    try {
        res.json(await products.insertNewProduct(req.body));
    } catch (err) {
        console.error('Error creating new product - ', err.message);
        next(err);
    }
});

router.patch('/', async function(req, res, next) {
    try {
        res.json(await products.updateProduct(req.body));
    } catch (err) {
        console.error('Error updating - ', err.message);
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        res.json(await products.deleteProduct(req.body));
    } catch (err) {
        console.error('Error deleting - ', err.message);
        next(err);
    }
});


module.exports = router;