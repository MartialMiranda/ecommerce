const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const passport = require('passport');

// Middleware de autenticación
const userAuth = passport.authenticate('jwt', { session: false });
// Obtener el carrito de un usuario
router.get('/', userAuth, carritoController.obtenerCarrito);

// Agregar un producto al carrito
router.post('/agregar', userAuth, carritoController.agregarProducto);

// Eliminar un producto del carrito
router.delete('/eliminar', userAuth, carritoController.eliminarProducto);

module.exports = router;
