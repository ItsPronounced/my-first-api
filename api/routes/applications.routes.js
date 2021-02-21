const express = require('express');
const router = express.Router();
const applications = require('../services/applications.services');
const { route } = require('./products.routes');


router.get(['/', '/all'], async function(req, res, next) {
    try {
        res.json(await applications.getApplications());
    } catch (err) {
        console.error('Error while getting applications - ', err.message);
        next(err);
    }
});

router.get('/id/:id', async function(req, res, next) {
    try {
        res.json(await applications.getApplicationByID(req.params.id))
    } catch (err) {
        console.error('Error while getting application by id - ', err.message);
        next(err);
    }
});

router.get('/name/:application', async function(req, res, next) {
    try {
        res.json(await applications.getApplicationByName(req.params.application));
    } catch (err) {
        console.error('Error while getting application by name - ', err.message);
        next(err);
    }
});



router.post('/', async function(req, res, next) {
    try {
        res.json(await applications.insertNewApplication(req.body));
    } catch (err) {
        console.error('Error creating new application - ', err.message);
        next(err);
    }
});

router.patch('/', async function(req, res, next) {
    try {
        res.json(await applications.updateApplication(req.body));
    } catch (err) {
        console.error('Error updating - ', err.message);
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        res.json(await applications.deleteApplication(req.body));
    } catch (err) {
        console.error('Error deleting - ', err.message);
        next(err);
    }
});

module.exports = router;