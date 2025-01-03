const PedidoDao = require('../dao/pedidoDao');
const CarritoDao = require('../dao/carritoDao');

class PedidoController {
  // Crear un nuevo pedido (ya existente)
  async crearPedido(req, res) {
    const { direccionEnvioId, metodoEnvio, costoEnvio } = req.body;
    try {
      const usuarioId = req.user.id;

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
  async obtenerDetallesVentasDePropietario(req, res) {
    try {
      const propietarioId = req.user.id;
  
      // Validar que propietarioId sea un número válido
      if (!propietarioId || isNaN(propietarioId)) {
        return res.status(400).json({
          message: 'El ID del propietario no es válido. Debe ser un número.',
        });
      }
  
      //console.log('Propietario ID:', propietarioId); // Debug
  
      // Llamar al DAO para obtener los detalles
      const detallesVentas = await PedidoDao.obtenerDetallesVentasPorPropietario(propietarioId);
  
      if (!detallesVentas.length) {
        return res.status(404).json({ 
          message: 'No se encontraron ventas relacionadas con los productos del propietario.' 
        });
      }
  
      res.json(detallesVentas);
    } catch (error) {
      console.error('Error al obtener los detalles de las ventas del propietario:', error);
      res.status(500).json({ 
        message: 'Error al obtener los detalles de las ventas.',
        error 
      });
    }
  }  
  
  // Obtener todos los pedidos del usuario autenticado
  async obtenerPedidos(req, res) {
    try {
      const usuarioId = req.user.id;
      const pedidos = await PedidoDao.obtenerPedidosPorUsuario(usuarioId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error });
    }
  }

  // Obtener los detalles de un pedido específico
  async obtenerDetallesPedido(req, res) {
    try {
      const { id: pedidoId } = req.params;
      const detalles = await PedidoDao.obtenerDetallesPedido(pedidoId);
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los detalles del pedido', error });
    }
  }

  // Cambiar el estado de un pedido
  async cambiarEstado(req, res) {
    try {
      const { id: pedidoId } = req.params;
      const { estado } = req.body;
      const pedidoActualizado = await PedidoDao.cambiarEstado(pedidoId, estado);
      res.json(pedidoActualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al cambiar el estado del pedido', error });
    }
  }

  // Eliminar un pedido
  async eliminarPedido(req, res) {
    try {
      const { id: pedidoId } = req.params;
      const resultado = await PedidoDao.eliminarPedido(pedidoId);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
  }
}

module.exports = new PedidoController();