const { Router } = require('express');
const {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
  obtenerCategoriaById,
  obtenerCategoriaPadreEHijo,
} = require('../controllers/categoria');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { crearCategoriaValidation } = require('../validators/categoria');

const router = Router();

router.get('/obtenerCategorias', obtenerCategorias);
router.get('/obtenerCategorias/:id', obtenerCategoriaById);
router.get('/obtenerCategoriasHijo/:id', obtenerCategoriaPadreEHijo);
router.post('/crearCategoria', crearCategoriaValidation, validationMiddleware, crearCategoria);
router.put('/actualizarCategoria/:id', crearCategoriaValidation, validationMiddleware, actualizarCategoria);
router.delete('/eliminarCategoria/:id', eliminarCategoria);

module.exports = router;
