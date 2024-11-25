const db = require('../db');

const ImagenProducto = {
  create: async (productoId, url) => {
    const query = `
      INSERT INTO imagen_producto (producto_id, url_imagen)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [productoId, url];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  deleteByProductoId: async (productoId) => {
    const query = `
      DELETE FROM imagen_producto
      WHERE producto_id = $1;
    `;
    await db.query(query, [productoId]);
  },
  findByProductoId: async (productoId) => {
    const query = `
      SELECT *
      FROM imagen_producto
      WHERE producto_id = $1;
    `;
    const values = [productoId];
    const result = await db.query(query, values);
    return result.rows;
  }
};

module.exports = ImagenProducto;
