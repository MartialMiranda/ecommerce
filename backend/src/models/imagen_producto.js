// src/models/imagen_producto.js
const BaseDao = require('../dao/baseDao');
const db = require('../db');


class ImagenProducto {
  constructor() {
    this.dao = new BaseDao('imagen_producto');  // Nombre de la tabla
  }

  async create(productoId, url) {
    return await this.dao.crear({ producto_id: productoId, url_imagen: url });
  }

  async deleteByProductoId(productoId) {
    const query = `DELETE FROM imagen_producto WHERE producto_id = $1`;
    await db.query(query, [productoId]);
    return true; // O retorna un valor relevante si es necesario
  }
  

  async findByProductoId(productoId) {
    const query = `SELECT * FROM imagen_producto WHERE producto_id = $1`;
    const result = await db.query(query, [productoId]);
    return result.rows;
  }
}

module.exports = new ImagenProducto();
