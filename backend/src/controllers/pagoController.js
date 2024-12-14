const PagoDao = require('../dao/PagoDao');
const PedidoDao = require('../dao/PedidoDao');

class PagoController {
  // Crear un pago para un pedido
  async crearPago(req, res) {
    const { pedidoId, monto, metodoPago } = req.body;
    try {
      // Verificar si el pedido existe y obtener su estado
      const pedido = await PedidoDao.obtenerEstadoPedido(pedidoId);
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }

      // Crear el pago
      const pago = await PagoDao.crearPago(pedidoId, monto, metodoPago);

      res.json({ mensaje: 'Pago creado con éxito', pago });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el pago', error });
    }
  }

  // Obtener el pago asociado a un pedido
  async obtenerPagoPorPedido(req, res) {
    try {
      const { id: pedidoId } = req.params;
      const pago = await PagoDao.obtenerPagoPorPedido(pedidoId);
      if (!pago) {
        return res.status(404).json({ message: 'Pago no encontrado para este pedido' });
      }
      res.json(pago);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el pago', error });
    }
  }

  // Actualizar el estado del pago
  async actualizarEstadoPago(req, res) {
    const { id: pagoId } = req.params;
    const { estadoPago } = req.body;
    try {
      const pagoActualizado = await PagoDao.actualizarEstadoPago(pagoId, estadoPago);
      res.json(pagoActualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el estado del pago', error });
    }
  }

  // Eliminar un pago
  async eliminarPago(req, res) {
    try {
      const { id: pagoId } = req.params;
      const resultado = await PagoDao.eliminarPago(pagoId);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el pago', error });
    }
  }
}

module.exports = new PagoController();
