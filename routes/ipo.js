const express = require('express');
const router = express.Router();
const ipoController = require('../controllers/ipo.js');

// Route to fetch and store IPO data
router.get('/fetch-ipo', ipoController.fetchAndStoreIpoData);

module.exports = router;
