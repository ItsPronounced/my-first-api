const express = require('express');
const router = express.Router();
const suppliers = require('../services/suppliers.services');

router.get(['/', '/all'], async function(req, res, next) {
    try {
        res.json(await suppliers.getSuppliers());
    } catch (err) {
        console.error('Error while getting suppliers - ', err.message);
        next(err);
    }
});

router.get('/active', async function(req, res, next) {
    try {
        res.json(await suppliers.getActiveSuppliers());
    } catch (err) {
        console.error('Error while getting all suppliers - ', err.message);
        next(error);
    }
});

router.get('/id/:id', async function(req, res, next) {
    try {
        res.json(await suppliers.getSupplierByID(req.params.id))
    } catch (err) {
        console.error('Error while getting supplier by id - ', err.message);
        next(err);
    }
});

router.get('/name/:supplier', async function(req, res, next) {
    try {
        res.json(await suppliers.getSupplierByName(req.params.supplier));
    } catch (err) {
        console.error('Error while getting supplier by name - ', err.message);
        next(err);
    }
});



router.post('/', async function(req, res, next) {
    try {
        res.json(await suppliers.insertNewSupplier(req.body));
    } catch (err) {
        console.error('Error while creating new supplier - ', err.message);
        next(err);
    }
});


router.patch('/', async function(req, res, next) {
    try {
        res.json(await suppliers.updateSupplier(req.body));
    } catch (err) {
        console.error('Error while updating Supplier - ', err.message);
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        res.json(await suppliers.deleteSupplier(req.body));
    } catch (err) {
        console.error('Error while deleting Supplier - ', err.message);
        next(err);
    }
});

module.exports = router;