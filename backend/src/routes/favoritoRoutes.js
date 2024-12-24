const express = require('express');
const router = express.Router();
const FavoritoController = require('../controllers/favorito');
const passport = require('passport');

// Middleware de autenticación
const userAuth = passport.authenticate('jwt', { session: false });

router.get('/', userAuth, FavoritoController.getAll); // Obtener todos los favoritos del usuario
router.post('/', userAuth, FavoritoController.add); // Agregar un producto a favoritos
router.delete('/:productoId', userAuth, FavoritoController.remove); // Eliminar un producto de favoritos

module.exports = router;
