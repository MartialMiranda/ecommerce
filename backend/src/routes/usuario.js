// src/routes/usuario.js
const { Router } = require('express');
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/usuario');
const { userAuth } = require('../middlewares/auth-middleware')

const router = Router();

router.get('/usuarios/:id',userAuth, obtenerUsuarioPorId);
router.put('/usuarios/:id',userAuth, actualizarUsuario);
router.delete('/usuarios/:id',userAuth, eliminarUsuario);

module.exports = router;
