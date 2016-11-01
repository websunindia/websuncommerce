var express = require('express');
var router = express.Router();
var adminPage = import('./page.js');

router.get('/admin', adminPage);


module.exports = router;