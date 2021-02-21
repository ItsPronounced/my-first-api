const express = require('express');
const router = express.Router();
const markets = require('../services/markets.services');

router.get(['/', '/all'], async function(req, res, next) {
    try {
        res.json(await markets.getMarkets());
    } catch (err) {
        console.error('Error while getting markets - ', err.message);
        next(err);
    }
});

router.get('/id/:id', async function(req, res, next) {
    try {
        res.json(await markets.getMarketByID(req.params.id))
    } catch (err) {
        console.error('Error while getting market by id - ', err.message);
        next(err);
    }
});

router.get('/name/:market', async function(req, res, next) {
    try {
        res.json(await markets.getMarketByName(req.params.market));
    } catch (err) {
        console.error('Error while getting market name - ', err.message);
        next(err);
    }
});




router.post('/', async function(req, res, next) {
    try {
        res.json(await markets.insertNewMarket(req.body))
    } catch (err) {
        console.error('Error while creating market - ', err.message);
        next(err);
    }
});

router.patch('/', async function(req, res, next) {
    try {
        res.json(await markets.updateMarket(req.body));
    } catch (err) {
        console.error('Error updating - ', err.message);
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        res.json(await markets.deleteMarket(req.body));
    } catch (err) {
        console.error('Error deleting - ', err.message);
        next(err);
    }
});

module.exports = router;