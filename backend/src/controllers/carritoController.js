const CarritoDao = require('../dao/carritoDao');
const Carrito = require('../models/carrito');

class CarritoController {
  // Obtener el carrito de un usuario
  async obtenerCarrito(req, res) {
    try {
      const usuarioId = req.user.id; // Tomar el usuario logueado
      const productos = await CarritoDao.obtenerPorUsuario(usuarioId);
      const carrito = new Carrito(usuarioId, productos);
      res.json(carrito);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
  }

  // Agregar producto al carrito
  async agregarProducto(req, res) {
    const { productoId, cantidad } = req.body;
  
    try {
      const usuarioId = req.user.id;
      
      // Validaciones básicas
      if (!cantidad || cantidad < 1) {
        return res.status(400).json({ 
          message: 'La cantidad debe ser mayor a cero' 
        });
      }

      const producto = await CarritoDao.agregarProducto(usuarioId, productoId, cantidad);
  
      res.json({
        mensaje: 'Producto agregado al carrito',
        producto: {
          ...producto,
          usuario_id: usuarioId,
        },
      });
    } catch (error) {
      // Manejamos específicamente los errores de stock
      if (error.message.includes('Stock insuficiente')) {
        return res.status(400).json({ 
          message: error.message 
        });
      }
      
      res.status(500).json({ 
        message: 'Error al agregar el producto', 
        error: error.message 
      });
    }
  }
  

  // Eliminar producto del carrito
  async eliminarProducto(req, res) {
    const { productoId } = req.body;

    try {
      const usuarioId = req.user.id; // Tomar el usuario logueado
      const producto = await CarritoDao.eliminarProducto(usuarioId, productoId);

      res.json({
        mensaje: 'Producto eliminado del carrito',
        producto,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
}

module.exports = new CarritoController();