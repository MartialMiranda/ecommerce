const express = require('express');
const router = express.Router();
const CarritoController = require('../controllers/carrito');
const passport = require('passport');

// Middleware de autenticación
const userAuth = passport.authenticate('jwt', { session: false });

router.get('/', userAuth, CarritoController.getCarrito);
router.post('/', userAuth, CarritoController.add);
router.put('/:id', userAuth, CarritoController.update);
router.delete('/:id', userAuth, CarritoController.delete);

module.exports = router;
