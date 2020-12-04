const express = require('express');
const router = express.Router();

const { authenticated } = require('../middleware/auth/auth');

router.use('/auth', require('./auth/auth'));
// Add middleware guard for roles here.
router.use('/account', authenticated, require('./account/account'));
router.use('/home', authenticated, (req, res, next) => {
  return res.json('OK!');
});

router.use('/videos', require('./videos'))


module.exports = router;
