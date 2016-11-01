var express = require('express');
var router = express.Router();
var homepage = import('./homepage.js');

router.get('/', homepage);

module.exports = router;