const { Router } = require('express');
const {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} = require('../controllers/categoria');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { crearCategoriaValidation } = require('../validators/categoria');

const router = Router();

router.get('/obtenerCategorias', obtenerCategorias);
router.post('/crearCategoria', crearCategoriaValidation, validationMiddleware, crearCategoria);
router.put('/actualizarCategoria/:id', crearCategoriaValidation, validationMiddleware, actualizarCategoria);
router.delete('/eliminarCategoria/:id', eliminarCategoria);

module.exports = router;
