// src/models/Carrito.js
const BaseDao = require('../dao/baseDao');
const db = require('../db');

class Carrito extends BaseDao {
  constructor() {
    super('carrito');  // Usamos el nombre de la tabla 'carrito'
  }

  // Método específico para obtener todos los elementos del carrito de un usuario
  async getAll(usuarioId) {
    const query = `
      SELECT c.id, c.producto_id, c.cantidad, p.titulo, p.precio
      FROM carrito c
      JOIN producto p ON c.producto_id = p.id
      WHERE c.usuario_id = $1;
    `;
    const result = await db.query(query, [usuarioId]);
    return result.rows;
  }

  // Método específico para obtener un elemento del carrito por ID
  async getById(id) {
    return await this.obtenerPorId(id);
  }

  // Método para agregar un nuevo producto al carrito
  async add(carritoItem) {
    const { usuario_id, producto_id, cantidad } = carritoItem;
    return await this.crear({ usuario_id, producto_id, cantidad });
  }

  // Método para actualizar la cantidad de un producto en el carrito
  async update(id, carritoItem) {
    return await this.actualizar(id, carritoItem);
  }

  // Método para eliminar un producto del carrito
  async delete(id) {
    return await this.eliminar(id);
  }
}

module.exports = new Carrito();
