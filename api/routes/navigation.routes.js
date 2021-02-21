const express = require('express');
const router = express.Router();
const navigation = require('../services/navigation.services');

router.get('/oem/:type', async function(req, res, next) {
    try {
        res.json(await navigation.getOemTitles(req.params.type));
    } catch (err) {
        console.error('Error while getting OEM Titles - ', err.message);
        next(err);
    }
});

router.get('/utility', async function(req, res, next) {
    try {
        res.json(await navigation.getUtilityTitles());
    } catch (err) {
        console.error('Error while getting Utility Titles - ', err.message);
        next(err);
    }
});

module.exports = router;