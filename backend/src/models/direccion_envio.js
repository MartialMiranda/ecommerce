// src/models/direccion_envio.js
const db = require('../db/index');

const DireccionEnvio = {
    getAll: async (usuarioId) => {
        console.log('Buscando direcciones para usuario:', usuarioId);
        const res = await db.query(
            'SELECT * FROM direccion_envio WHERE usuario_id = $1', 
            [usuarioId]
        );
        console.log('Direcciones encontradas:', res.rows);
        return res.rows;
    },
    
    getById: async (id) => {
        const res = await db.query('SELECT * FROM direccion_envio WHERE id = $1', [id]);
        return res.rows[0];
    },
    
    create: async (direccionEnvio) => {
        const { usuario_id, direccion, ciudad, estado, pais } = direccionEnvio;
        const res = await db.query(
            'INSERT INTO direccion_envio (usuario_id, direccion, ciudad, estado, pais) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [usuario_id, direccion, ciudad, estado, pais]
        );
        return res.rows[0];
    },
    
    update: async (id, direccionEnvio) => {
        const { direccion, ciudad, estado, pais } = direccionEnvio;
        const res = await db.query(
            'UPDATE direccion_envio SET direccion = $1, ciudad = $2, estado = $3, pais = $4 WHERE id = $5 RETURNING *',
            [direccion, ciudad, estado, pais, id]
        );
        return res.rows[0];
    },
    
    delete: async (id) => {
        await db.query('DELETE FROM direccion_envio WHERE id = $1', [id]);
        return { message: 'Direccion de envio eliminada' };
    }
};

module.exports = DireccionEnvio;