// src/controllers/pedidoController.js
const PedidoDao = require('../dao/pedidoDao');
const CarritoDao = require('../dao/carritoDao');
const Pedido = require('../models/pedido');

class PedidoController {
  // Crear un nuevo pedido
  async crearPedido(req, res) {
    const { usuarioId, direccionEnvioId, metodoEnvio, costoEnvio } = req.body;
    try {
      // Obtener productos del carrito
      const productos = await CarritoDao.obtenerPorUsuario(usuarioId);

      if (productos.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
      }

      // Crear el pedido
      const total = productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0) + costoEnvio;
      const pedidoId = await PedidoDao.crearPedido(usuarioId, direccionEnvioId, total, metodoEnvio, costoEnvio);

      // Crear detalle de pedido
      for (let producto of productos) {
        await PedidoDao.crearDetalle(pedidoId, producto.id, producto.cantidad, producto.precio);
      }

      // Vaciar el carrito
      await CarritoDao.vaciarCarrito(usuarioId);

      res.json({ mensaje: 'Pedido creado con éxito', pedidoId });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el pedido', error });
    }
  }
}

module.exports = new PedidoController();
