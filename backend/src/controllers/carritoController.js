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
      //console.log('Usuario autenticado:', req.user); // Agrega este log para depurar
      const usuarioId = req.user.id; // Tomar el usuario logueado
  
      const producto = await CarritoDao.agregarProducto(usuarioId, productoId, cantidad);
  
      res.json({
        mensaje: 'Producto agregado al carrito',
        producto: {
          ...producto,
          usuario_id: usuarioId, // Asegúrate de que el ID del usuario esté incluido en la respuesta
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar el producto', error });
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
