const express = require('express');
const router = express.Router();
const RefBook = require('../controller/RefBookController');

router.get('/settlement',RefBook.getSettlement);

module.exports = router;