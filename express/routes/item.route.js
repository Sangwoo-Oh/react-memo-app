const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

router.get('/api/item', itemController.getItems);
router.post('/api/item', itemController.addItem);
router.put('/api/item', itemController.updateItem);
router.delete('/api/item', itemController.deleteItem);

module.exports = router;
