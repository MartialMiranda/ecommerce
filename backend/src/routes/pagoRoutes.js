const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const passport = require('passport');

const userAuth = passport.authenticate('jwt', { session: false });

// Crear un pago
router.post('/', userAuth, pagoController.crearPago);

// Obtener pago por ID de pedido
router.get('/pedido/:id', userAuth, pagoController.obtenerPagoPorPedido);

// Actualizar el estado del pago
router.put('/:id/estado', userAuth, pagoController.actualizarEstadoPago);

// Eliminar un pago
router.delete('/:id', userAuth, pagoController.eliminarPago);

module.exports = router;
