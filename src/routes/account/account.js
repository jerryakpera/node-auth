const express = require('express');
const router = express.Router();

router.use('/varify', require('./verify'));

module.exports = router;
