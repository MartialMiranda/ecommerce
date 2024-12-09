const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Crear un nuevo pedido
router.post('/', pedidoController.crearPedido);

module.exports = router;
