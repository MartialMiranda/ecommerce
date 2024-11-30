// src/routes/direcciones.js
const express = require('express');
const router = express.Router();
const DireccionEnvioController = require('../controllers/direccion_envio');
const passport = require('passport');

// Middleware de autenticación
const userAuth = passport.authenticate('jwt', { session: false });

router.get('/', userAuth, DireccionEnvioController.getAll);
router.post('/', userAuth, DireccionEnvioController.create);
router.get('/:id', userAuth, DireccionEnvioController.getById);
router.put('/:id', userAuth, DireccionEnvioController.update);
router.delete('/:id', userAuth, DireccionEnvioController.delete);

module.exports = router;