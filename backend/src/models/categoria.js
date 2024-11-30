const db = require('../db');

const Categoria = {
    async crear(nombre, descripcion, categoria_padre_id = null) {
        const query = `
          INSERT INTO categoria (nombre, descripcion, categoria_padre_id)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
        console.log('Datos enviados:', { nombre, descripcion, categoria_padre_id }); // Añade este log
        const { rows } = await db.query(query, [nombre, descripcion, categoria_padre_id]);
        return rows[0];
      },

  async obtenerPorId(id) {
    const query = 'SELECT * FROM categoria WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },

  async obtenerTodas() {
    const query = 'SELECT * FROM categoria';
    const { rows } = await db.query(query);
    return rows;
  },

  async actualizar(id, nombre, descripcion, categoria_padre_id) {
    const query = `
      UPDATE categoria
      SET nombre = $1, descripcion = $2, categoria_padre_id = $3
      WHERE id = $4
      RETURNING *;
    `;
    const { rows } = await db.query(query, [nombre, descripcion, categoria_padre_id, id]);
    return rows[0];
  },

  async eliminar(id) {
    const query = 'DELETE FROM categoria WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  },
};

module.exports = Categoria;
