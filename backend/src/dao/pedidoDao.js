const db = require("../db"); // Asegúrate de tener la conexión a la base de datos importada

class PedidoDao {
  constructor() {
    this.tableName = "pedido";
    this.detalleTableName = "detalle_pedido";
  }

  // Crear un nuevo pedido
  async crearPedido(
    usuarioId,
    direccionEnvioId,
    total,
    metodoEnvio,
    costoEnvio
  ) {
    const query = `
      INSERT INTO ${this.tableName} (usuario_id, direccion_envio_id, total, metodo_envio, costo_envio)
      VALUES ($1, $2, $3, $4, $5) RETURNING id;
    `;
    const result = await db.query(query, [
      usuarioId,
      direccionEnvioId,
      total,
      metodoEnvio,
      costoEnvio,
    ]);
    return result.rows[0].id;
  }

  // Crear detalle de pedido
  async crearDetalle(pedidoId, productoId, cantidad, precioUnitario) {
    const query = `
      INSERT INTO ${this.detalleTableName} (pedido_id, producto_id, cantidad, precio_unitario)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const result = await db.query(query, [
      pedidoId,
      productoId,
      cantidad,
      precioUnitario,
    ]);
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

  // Obtener todos los pedidos de un usuario
  async obtenerPedidosPorUsuario(usuarioId) {
    const query = `SELECT * FROM ${this.tableName} WHERE usuario_id = $1 ORDER BY fecha_pedido DESC;`;
    const result = await db.query(query, [usuarioId]);
    return result.rows;
  }

  // Obtener pedidos relacionados con productos del propietario
  async obtenerDetallesVentasPorPropietario(propietarioId) {
    const query = `
      SELECT 
        p.id AS pedido_id,
        p.usuario_id AS comprador_id,
        p.fecha_pedido,
        p.estado,
        dp.producto_id,
        dp.cantidad,
        dp.precio_unitario,
        prod.titulo AS producto_titulo,
        prod.descripcion AS producto_descripcion,
        prod.imagenes AS producto_imagenes,
        u.nombre AS comprador_nombre,
        u.email AS comprador_email
      FROM ${this.tableName} p
      JOIN ${this.detalleTableName} dp ON p.id = dp.pedido_id
      JOIN producto prod ON dp.producto_id = prod.id
      JOIN usuario u ON p.usuario_id = u.id
      WHERE prod.usuario_id = $1
      ORDER BY p.fecha_pedido DESC;
    `;
  
    const result = await db.query(query, [propietarioId]);
    return result.rows;
  }
  
  

  // Obtener detalles de un pedido
  async obtenerDetallesPedido(pedidoId) {
    const query = `
      SELECT dp.producto_id, dp.cantidad, dp.precio_unitario, p.titulo, p.imagenes
      FROM ${this.detalleTableName} dp
      JOIN producto p ON dp.producto_id = p.id
      WHERE dp.pedido_id = $1;
    `;
    const result = await db.query(query, [pedidoId]);
    return result.rows;
  }

  // Eliminar un pedido (y sus detalles)
  async eliminarPedido(pedidoId) {
    const detalleQuery = `DELETE FROM ${this.detalleTableName} WHERE pedido_id = $1;`;
    const pedidoQuery = `DELETE FROM ${this.tableName} WHERE id = $1;`;

    await db.query(detalleQuery, [pedidoId]);
    await db.query(pedidoQuery, [pedidoId]);
    return { mensaje: "Pedido eliminado con éxito" };
  }
}

module.exports = new PedidoDao();