var express = require('express');
var controller = require('./notebooks.controller.js');
var router = express.Router();

router.get('/', controller.notebookList);
router.post('/', controller.notebookCreate);
router.get('/:id', controller.notebookDetail);
router.put('/:id', controller.notebookUpdate);
router.delete('/:id', controller.notebookRemove);

module.exports = router;
