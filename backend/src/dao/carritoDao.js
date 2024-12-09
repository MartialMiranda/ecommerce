const db = require("../db"); // Asegúrate de tener la conexión a la base de datos importada

class CarritoDao {
  constructor() {
    this.tableName = "carrito";
  }

  // Obtener los productos del carrito por el ID del usuario
  async obtenerPorUsuario(usuarioId) {
    const query = `
      SELECT p.*, c.cantidad
      FROM producto p
      INNER JOIN carrito c ON p.id = c.producto_id
      WHERE c.usuario_id = $1;
    `;
    const result = await db.query(query, [usuarioId]);
    return result.rows;
  }

  // Vaciar el carrito después de realizar un pedido
  async vaciarCarrito(usuarioId) {
    const query = `DELETE FROM carrito WHERE usuario_id = $1;`;
    await db.query(query, [usuarioId]);
  }

  // Agregar un producto al carrito
  async agregarProducto(usuarioId, productoId, cantidad) {
    const query = `
      INSERT INTO carrito (usuario_id, producto_id, cantidad)
      VALUES ($1, $2, $3)
      ON CONFLICT (usuario_id, producto_id) DO UPDATE
      SET cantidad = carrito.cantidad + $3
      RETURNING *;
    `;
    const result = await db.query(query, [usuarioId, productoId, cantidad]);
    return result.rows[0];
  }

  // Eliminar un producto del carrito
  async eliminarProducto(usuarioId, productoId) {
    const query = `DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2 RETURNING *;`;
    const result = await db.query(query, [usuarioId, productoId]);
    return result.rows[0];
  }
}

module.exports = new CarritoDao();
