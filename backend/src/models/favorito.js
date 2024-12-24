const db = require('../db/index');

const Favorito = {
  getAll: async (usuarioId) => {
    const res = await db.query(
      `SELECT f.id AS favorito_id, p.* 
       FROM favorito f
       INNER JOIN producto p ON f.producto_id = p.id
       WHERE f.usuario_id = $1 ORDER BY f.fecha_agregado DESC`,
      [usuarioId]
    );
    return res.rows;
  },

  add: async (usuarioId, productoId) => {
    const res = await db.query(
      `INSERT INTO favorito (usuario_id, producto_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [usuarioId, productoId]
    );
    return res.rows[0];
  },

  remove: async (usuarioId, productoId) => {
    const res = await db.query(
      `DELETE FROM favorito 
       WHERE usuario_id = $1 AND producto_id = $2 
       RETURNING *`,
      [usuarioId, productoId]
    );
    return res.rows[0];
  },

  exists: async (usuarioId, productoId) => {
    const res = await db.query(
      `SELECT * FROM favorito 
       WHERE usuario_id = $1 AND producto_id = $2`,
      [usuarioId, productoId]
    );
    return res.rows.length > 0;
  },
};

module.exports = Favorito;
