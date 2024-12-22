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
    // Primero verificamos el stock disponible
    const stockQuery = `SELECT stock FROM producto WHERE id = $1`;
    const stockResult = await db.query(stockQuery, [productoId]);
  
    if (stockResult.rows.length === 0) {
      throw new Error("Producto no encontrado");
    }
  
    const stockDisponible = stockResult.rows[0].stock;
  
    // Verificar si el producto ya está en el carrito
    const carritoActualQuery = `
      SELECT cantidad FROM carrito 
      WHERE usuario_id = $1 AND producto_id = $2;
    `;
    const carritoActual = await db.query(carritoActualQuery, [
      usuarioId,
      productoId,
    ]);
    const cantidadActual = carritoActual.rows[0]?.cantidad || 0;
  
    // Si es una actualización, calculamos la diferencia real
    const diferenciaCantidad = cantidad - cantidadActual;
  
    // Validación modificada: Permitimos decrementos cuando el stock es 0
    if (stockDisponible === 0 && diferenciaCantidad > 0) {
      throw new Error("No hay stock disponible para incrementar la cantidad");
    }
  
    // Validación de cantidad mínima
    if (cantidad < 1) {
      throw new Error("La cantidad debe ser mayor a cero");
    }
  
    await db.query("BEGIN"); // Iniciamos una transacción
  
    try {
      // Agregamos o actualizamos el carrito
      const carritoQuery = `
        INSERT INTO carrito (usuario_id, producto_id, cantidad)
        VALUES ($1, $2, $3)
        ON CONFLICT (usuario_id, producto_id) DO UPDATE
        SET cantidad = $3
        RETURNING *;
      `;
  
      const result = await db.query(carritoQuery, [
        usuarioId,
        productoId,
        cantidad,
      ]);
  
      // Siempre actualizamos el stock al decrementar, incluso si el stock es 0
      // Si estamos incrementando, solo actualizamos si hay stock disponible
      if (diferenciaCantidad < 0 || (diferenciaCantidad > 0 && stockDisponible > 0)) {
        const updateStockQuery = `
          UPDATE producto 
          SET stock = stock - $1 
          WHERE id = $2
          RETURNING stock;
        `;
  
        await db.query(updateStockQuery, [diferenciaCantidad, productoId]);
      }
  
      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  }
  // También necesitamos modificar el método eliminarProducto para devolver el stock
  async eliminarProducto(usuarioId, productoId) {
    await db.query("BEGIN");

    try {
      // Primero obtenemos la cantidad que había en el carrito
      const getCantidadQuery = `
        SELECT cantidad FROM carrito 
        WHERE usuario_id = $1 AND producto_id = $2;
      `;
      const cantidadResult = await db.query(getCantidadQuery, [
        usuarioId,
        productoId,
      ]);

      if (cantidadResult.rows.length > 0) {
        const cantidad = cantidadResult.rows[0].cantidad;

        // Devolvemos el stock al producto
        const updateStockQuery = `
          UPDATE producto 
          SET stock = stock + $1 
          WHERE id = $2;
        `;
        await db.query(updateStockQuery, [cantidad, productoId]);
      }

      // Eliminamos el producto del carrito
      const deleteQuery = `
        DELETE FROM carrito 
        WHERE usuario_id = $1 AND producto_id = $2 
        RETURNING *;
      `;
      const result = await db.query(deleteQuery, [usuarioId, productoId]);

      await db.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  }

  // También necesitamos modificar el método vaciarCarrito
  async vaciarCarrito(usuarioId) {
    await db.query("BEGIN");
  
    try {
      // Al procesar un pedido, no devolvemos el stock porque los productos 
      // efectivamente se están comprando
      const deleteQuery = `DELETE FROM carrito WHERE usuario_id = $1;`;
      await db.query(deleteQuery, [usuarioId]);
  
      await db.query("COMMIT");
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  }
}

module.exports = new CarritoDao();
