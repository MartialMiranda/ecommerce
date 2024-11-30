// src/dao/baseDao.js
const db = require('../db'); // Asegúrate de tener la conexión a la base de datos importada

class BaseDao {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async crear(data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *;`;
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async obtenerTodos() {
    const query = `SELECT * FROM ${this.tableName};`;
    const result = await db.query(query);
    return result.rows;
  }

  async obtenerPorId(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async actualizar(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);

    const setClause = columns.map((col, index) => `${col} = $${index + 1}`).join(', ');
    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *;`;
    const result = await db.query(query, [...values, id]);
    return result.rows[0];
  }

  async eliminar(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id;`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = BaseDao;
