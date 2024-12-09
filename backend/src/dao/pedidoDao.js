const db = require('../db'); // Asegúrate de tener la conexión a la base de datos importada

class PedidoDao {
  constructor() {
    this.tableName = 'pedido';
    this.detalleTableName = 'detalle_pedido';
  }

  // Crear un nuevo pedido
  async crearPedido(usuarioId, direccionEnvioId, total, metodoEnvio, costoEnvio) {
    const query = `
      INSERT INTO ${this.tableName} (usuario_id, direccion_envio_id, total, metodo_envio, costo_envio)
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `;
    const result = await db.query(query, [usuarioId, direccionEnvioId, total, metodoEnvio, costoEnvio]);
    return result.rows[0].id;
  }

  // Crear detalle de pedido
  async crearDetalle(pedidoId, productoId, cantidad, precioUnitario) {
    const query = `
      INSERT INTO ${this.detalleTableName} (pedido_id, producto_id, cantidad, precio_unitario)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const result = await db.query(query, [pedidoId, productoId, cantidad, precioUnitario]);
    return result.rows[0];
  }

  // Obtener el estado de un pedido
  async obtenerEstadoPedido(pedidoId) {
    const query = `SELECT estado FROM ${this.tableName} WHERE id = $1;`;
    const result = await db.query(query, [pedidoId]);
    return result.rows[0];
  }

  // Cambiar el estado de un pedido
  async cambiarEstado(pedidoId, estado) {
    const query = `UPDATE ${this.tableName} SET estado = $2 WHERE id = $1 RETURNING *;`;
    const result = await db.query(query, [pedidoId, estado]);
    return result.rows[0];
  }
}

module.exports = new PedidoDao();
