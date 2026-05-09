const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');

router.get('/', controller.getProductos);
router.get('/:id', controller.getProductoById);

module.exports = router;