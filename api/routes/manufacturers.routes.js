const { Router } = require('express');
const express = require('express');
const router = express.Router();
const manufacturers = require('../services/manufacturers.services');

router.get(['/', '/all'], async function(req, res, next) {
    try {
        res.json(await manufacturers.getManufacturers());
    } catch (err) {
        console.error('Error while getting manufacturers - ', err.message);
        next(err);
    }
});

router.get('/id/:id', async function(req, res, next) {
    try {
        res.json(await manufacturers.getManufacturerByID(req.params.id))
    } catch (err) {
        console.error('Error while getting manufacturer by id - ', err.message);
        next(err);
    }
});

router.get('/name/:manufacturer', async function(req, res, next) {
    try {
        res.json(await manufacturers.getManufacturerByName(req.params.manufacturer));
    } catch (err) {
        console.error('Error while getting manufacturer by name - ', err.message);
        next(err);
    }
});



router.post('/', async function(req, res, next) {
    try {
        res.json(await manufacturers.insertNewManufacturer(req.body));
    } catch (err) {
        console.error('Error while creating new manufacturer - ', err.message);
        next(err);
        
    }
});


router.patch('/', async function(req, res, next) {
    try {
        res.json(await manufacturers.updateManufacturer(req.body));
    } catch (err) {
        console.error('Error while updating manufacturer - ', err.message);
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        res.json(await manufacturers.deleteManufacturer(req.body));
    } catch (err) {
        console.error('Error while deleting manufacturer - ', err.message);
        next(err);
    }
});

module.exports = router;