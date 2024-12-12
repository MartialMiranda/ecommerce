const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const passport = require('passport');

const userAuth = passport.authenticate('jwt', { session: false });

// Crear un nuevo pedido
router.post('/', userAuth, pedidoController.crearPedido);

// Obtener todos los pedidos del usuario autenticado
router.get('/', userAuth, pedidoController.obtenerPedidos);

// Obtener detalles de un pedido específico
router.get('/:id', userAuth, pedidoController.obtenerDetallesPedido);

// Cambiar el estado de un pedido
router.put('/:id/estado', userAuth, pedidoController.cambiarEstado);

// Eliminar un pedido
router.delete('/:id', userAuth, pedidoController.eliminarPedido);

module.exports = router;
