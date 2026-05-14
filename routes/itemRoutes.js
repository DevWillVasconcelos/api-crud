// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllPaginated);

router.get('/:id', itemController.getById);

router.post('/', itemController.create);

router.put('/:id', itemController.update);

router.patch('/:id', itemController.patch);

router.delete('/:id', itemController.delete);

module.exports = router;