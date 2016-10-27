var express = require('express');
var controller = require('./search.controller.js')();
var router = express.Router();

router.get('/', controller.list);

module.exports = router;