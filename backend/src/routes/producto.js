// src/routes/producto.js
const express = require('express');
const upload = require('../middlewares/file-upload-middleware');
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  obtenerMisProductos,
  obtenerCategorias
} = require('../controllers/producto');
const passport = require('passport');

const userAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get('/',  obtenerProductos);
router.get('/categorias',userAuth, obtenerCategorias);
router.get('/mis-productos', userAuth, obtenerMisProductos);
router.get('/:id',  obtenerProductoPorId);
router.post('/', upload.array('imagenes', 5), userAuth, crearProducto);
router.put('/:id', userAuth, actualizarProducto);
router.delete('/:id', userAuth, eliminarProducto);


module.exports = router;
