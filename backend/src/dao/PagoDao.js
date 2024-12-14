const db = require('../db'); // Asegúrate de tener la conexión a la base de datos importada

class PagoDao {
  constructor() {
    this.tableName = 'pago';
  }

  // Crear un pago
  async crearPago(pedidoId, monto, metodoPago) {
    const query = `
      INSERT INTO ${this.tableName} (pedido_id, monto, metodo_pago)
      VALUES ($1, $2, $3) RETURNING id, pedido_id, monto, metodo_pago, estado_pago, fecha_pago;
    `;
    const result = await db.query(query, [pedidoId, monto, metodoPago]);
    return result.rows[0];
  }

  // Obtener pago por ID de pedido
  async obtenerPagoPorPedido(pedidoId) {
    const query = `
      SELECT * FROM ${this.tableName} WHERE pedido_id = $1;
    `;
    const result = await db.query(query, [pedidoId]);
    return result.rows[0];
  }

  // Actualizar el estado del pago
  async actualizarEstadoPago(pagoId, estadoPago) {
    const query = `
      UPDATE ${this.tableName} SET estado_pago = $2 WHERE id = $1 RETURNING *;
    `;
    const result = await db.query(query, [pagoId, estadoPago]);
    return result.rows[0];
  }

  // Obtener todos los pagos de un pedido
  async obtenerPagosPorPedido(pedidoId) {
    const query = `
      SELECT * FROM ${this.tableName} WHERE pedido_id = $1;
    `;
    const result = await db.query(query, [pedidoId]);
    return result.rows;
  }

  // Eliminar un pago
  async eliminarPago(pagoId) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1;`;
    await db.query(query, [pagoId]);
    return { mensaje: 'Pago eliminado con éxito' };
  }
}

module.exports = new PagoDao();
