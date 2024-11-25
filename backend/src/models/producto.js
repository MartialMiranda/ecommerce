const db = require('../db');

const Producto = {
  create: async (producto) => {
    const query = `
      INSERT INTO producto (titulo, descripcion, precio, stock, categoria_id, usuario_id, imagenes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, titulo, descripcion, precio, stock, categoria_id, usuario_id, imagenes, fecha_creacion, es_activo;
    `;
    const values = [
      producto.titulo,
      producto.descripcion,
      producto.precio,
      producto.stock,
      producto.categoria_id,
      producto.usuario_id,
      producto.imagenes
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getAll: async () => {
    const query = `
      SELECT p.*, json_agg(ip.url_imagen) AS imagenes
      FROM producto p
      LEFT JOIN imagen_producto ip ON p.id = ip.producto_id
      GROUP BY p.id;
    `;
    const result = await db.query(query);
    return result.rows;
  },

  getById: async (id) => {
    const query = `
      SELECT p.*, json_agg(ip.url_imagen) AS imagenes
      FROM producto p
      LEFT JOIN imagen_producto ip ON p.id = ip.producto_id
      WHERE p.id = $1
      GROUP BY p.id;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  },

  update: async (id, producto) => {
    const query = `
      UPDATE producto
      SET titulo = $1, descripcion = $2, precio = $3, stock = $4, categoria_id = $5, es_activo = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      producto.titulo,
      producto.descripcion,
      producto.precio,
      producto.stock,
      producto.categoria_id,
      producto.es_activo,
      id
    ];
    const result = await db.query(query, values);
    console.log('Resultado de la consulta:', result);
    return result.rows[0];
  },

  delete: async (id) => {
    const query = `
      DELETE FROM producto
      WHERE id = $1
      RETURNING id;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = Producto;
