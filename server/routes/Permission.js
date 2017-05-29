/**
 * Created by Mariana on 27.05.2017.
 */
const express = require('express');
const router = express.Router();
const Permission = require('../controller/Permission');

router.post('/create', Permission.create);
module.exports = router;